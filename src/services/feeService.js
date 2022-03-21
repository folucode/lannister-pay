const redis = require('redis');
require('dotenv').config();
const client = redis.createClient({ url: process.env.REDIS_URL });

client.connect();

client.on('connect', () => {
  console.log('redis connected');
});

module.exports = {
  setupFeeSpec: async (feeSpecs) => {
    client.set('FeeConfigurationSpec', JSON.stringify(feeSpecs));

    return {
      status: 'ok',
      message: 'fee configuration spec created successfully',
    };
  },

  computeTransactionFee: async (details) => {
    const FeeConfigurationData = await client.get('FeeConfigurationSpec');
    const parsedData = JSON.parse(FeeConfigurationData);

    const {
      Amount,
      Customer: { BearsFee },
      CurrencyCountry,
      PaymentEntity: { ID, Number, SixID, Country, Type, Issuer, Brand },
      Currency,
    } = details;

    if (CurrencyCountry === Country) {
      Locale = 'LOCL';
    } else {
      Locale = 'INTL';
    }

    const feeConfigs = parsedData.filter(
      ({ feeCurrency, feeLocale, feeEntity, feeProperty }) =>
        feeCurrency == Currency &&
        [Locale, '*'].includes(feeLocale) &&
        [Type, '*'].includes(feeEntity) &&
        [Issuer, Brand, Number, ID, SixID, '*'].includes(feeProperty)
    );

    if (feeConfigs.length < 1) {
      return {
        status: 'failed',
        message: `No fee configuration for ${Currency} transactions.`,
      };
    }

    if (feeConfigs.length > 1) {
      let specificityData = feeConfigs.filter(
        ({ feeProperty, feeEntity }) => feeProperty != '*' || feeEntity != '*'
      );

      let data = calculateFee(specificityData, Amount, BearsFee);

      return {
        status: 'success',
        message: 'fee computed successfully',
        data,
      };
    }

    data = calculateFee(feeConfigs, Amount, BearsFee);

    return {
      status: 'success',
      message: 'fee computed successfully',
      data,
    };
  },
};

const calculateFee = (spec, amount, bearsFee) => {
  const feeType = spec[0].feeType;
  const feeValue = spec[0].feeValue;
  const AppliedFeeID = spec[0].feeID;

  if (feeType == 'FLAT_PERC') {
    const [flat, perc] = feeValue.split(':');
    const percentValue = Math.round((parseFloat(perc) / 100) * amount);
    const AppliedFeeValue = parseInt(flat) + percentValue;
    const ChargeAmount = bearsFee == true ? AppliedFeeValue + amount : amount;
    const SettlementAmount = ChargeAmount - AppliedFeeValue;

    return {
      AppliedFeeID,
      AppliedFeeValue,
      ChargeAmount,
      SettlementAmount,
    };
  } else if (feeType == 'PERC') {
    const AppliedFeeValue = Math.round((parseFloat(feeValue) / 100) * amount);
    const ChargeAmount = bearsFee == true ? AppliedFeeValue + amount : amount;
    const SettlementAmount = ChargeAmount - AppliedFeeValue;

    return {
      AppliedFeeID,
      AppliedFeeValue,
      ChargeAmount,
      SettlementAmount,
    };
  } else if (feeType == 'FLAT') {
    const AppliedFeeValue = parseInt(feeValue);
    const ChargeAmount = bearsFee == true ? AppliedFeeValue + amount : amount;
    const SettlementAmount = ChargeAmount - AppliedFeeValue;

    return {
      AppliedFeeID,
      AppliedFeeValue,
      ChargeAmount,
      SettlementAmount,
    };
  }
};
