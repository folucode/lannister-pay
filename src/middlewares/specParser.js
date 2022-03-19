const schema = {
  'FEE-ID': (value) => value.startsWith('LNPY') && value.length == 8,
  'FEE-CURRENCY': (value) => value == 'NGN',
  'FEE-LOCALE': (value) => ['LOCL', 'INTL', '*'].includes(value),
  'FEE-ENTITY': (value) =>
    [
      'CREDIT-CARD',
      'DEBIT-CARD',
      'BANK-ACCOUNT',
      'USSD',
      'WALLET-ID',
      '*',
    ].includes(value),
  'FEE-PROPERTY': (value) => /^[A-Z*]+$/.test(value),
  'FEE-TYPE': (value) => ['PERC', 'FLAT', 'FLAT_PERC'].includes(value),
  'FEE-VALUE': (value) =>
    (Number.isInteger(value) && value >= 0) || typeof value === 'string',
};

module.exports.specParser = (req, res, next) => {
  try {
    const { FeeConfigurationSpec } = req.body;

    const fees = FeeConfigurationSpec.split('\n');

    let finalFeeConfigurationSpec = [];

    fees.forEach((spec) => {
      let specObject = {};

      const specConfig = spec.split(':')[0].trim().split(' ');
      const specApply = spec.split(':')[1].trim().split(' ');

      specObject['FEE-ID'] = specConfig[0];
      specObject['FEE-CURRENCY'] = specConfig[1];
      specObject['FEE-LOCALE'] = specConfig[2];
      let specEntityValue = specConfig[3];

      specEntityValue = specEntityValue.replace('(', ' ');
      specEntityValue = specEntityValue.replace(')', '');

      let specEntityValueArray = specEntityValue.split(' ');

      specObject['FEE-ENTITY'] = specEntityValueArray[0];
      specObject['FEE-PROPERTY'] = specEntityValueArray[1];
      specObject['FEE-TYPE'] = specApply[1];
      specObject['FEE-VALUE'] = specApply[2];

      const errors = validate(specObject, schema);

      if (errors.length > 0) {
        for (const { message } of errors) {
          res.status(400).send({
            status: 'failed',
            message,
          });
        }
      }

      finalFeeConfigurationSpec.push(specObject);
    });

    res.locals.finalFeeConfigurationSpec = finalFeeConfigurationSpec;
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
