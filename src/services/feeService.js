const specs = require('../../config/feeConfigurationSpec');

module.exports = {
  setupFeeSpec: async (feeConfig) => {
    const fees = feeConfig.split('\n');

    fees.forEach((spec) => {
      const specConfig = spec.split(':')[0].trim().split(' ');
      const specApply = spec.split(':')[1].trim().split(' ');
      specs[specConfig[0]] = {
        'FEE-CURRENCY': specConfig[1],
        'FEE-LOCALE': specConfig[2],
        'FEE-ENTITY-PROPERTY': specConfig[3],
        APPLY: {
          'FEE-TYPE': specApply[1],
          'FEE-VALUE': specApply[2],
        },
      };
    });

    return {
      status: 'success',
      data: specs,
    };
  },
};
