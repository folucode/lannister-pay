const FeeConfigurationSpec = require('../models/FeeConfigurationSpec');

module.exports = {
  setupFeeSpec: async (feeSpecs) => {
    await FeeConfigurationSpec.insertMany(feeSpecs);

    return {
      status: 'ok',
    };
  },
};
