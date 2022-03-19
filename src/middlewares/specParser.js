const schema = {
  feeID: (value) => value.startsWith('LNPY') && value.length == 8,
  feeCurrency: (value) => value == 'NGN',
  feeLocale: (value) => ['LOCL', 'INTL', '*'].includes(value),
  feeEntity: (value) =>
    [
      'CREDIT-CARD',
      'DEBIT-CARD',
      'BANK-ACCOUNT',
      'USSD',
      'WALLET-ID',
      '*',
    ].includes(value),
  feeProperty: (value) => /^[A-Z*]+$/.test(value),
  feeType: (value) => ['PERC', 'FLAT', 'FLAT_PERC'].includes(value),
  feeValue: (value) =>
    (Number.isInteger(value) && value >= 0) || typeof value === 'string',
};

const specParser = (req, res, next) => {
  try {
    const { FeeConfigurationSpec } = req.body;

    const fees = FeeConfigurationSpec.split('\n');

    let finalFeeConfigurationSpec = [];

    fees.forEach((spec) => {
      let specObject = {};

      const [specConfig, specApply, flat_perc_val] = spec.split(':');

      [
        specObject.feeID,
        specObject.feeCurrency,
        specObject.feeLocale,
        feeProperty,
      ] = specConfig.trim().split(' ');

      let specEntityValueArray = feeProperty
        .replace('(', ' ')
        .replace(')', '')
        .split(' ');

      [specObject.feeEntity, specObject.feeProperty] = specEntityValueArray;
      [, specObject.feeType, specObject.feeValue] = specApply.trim().split(' ');

      const errors = validate(specObject, schema);

      if (errors.length > 0) {
        for (const { message } of errors) {
          res.status(400).send({
            status: 'failed',
            message,
          });
        }
      }

      if (flat_perc_val != undefined) {
        specObject.feeValue += `:${flat_perc_val}`;
      }

      finalFeeConfigurationSpec.push(specObject);
    });

    req.finalFeeConfigurationSpec = finalFeeConfigurationSpec;
    return next();
  } catch (error) {
    res.status(500).send('Something went wrong' + error.message);
  }
};

const validate = (object, schema) => {
  const err = Object.keys(schema)
    .filter((key) => !schema[key](object[key]))
    .map((key) => `${key} is invalid.`);

  return err;
};

module.exports = specParser;
