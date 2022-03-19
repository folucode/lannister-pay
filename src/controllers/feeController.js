const { setupFeeSpec } = require('../services/feeService');

module.exports = {
  setupFee: async (req, res) => {
    try {
      const FeeConfigurationSpec = req.finalFeeConfigurationSpec;

      const result = await setupFeeSpec(FeeConfigurationSpec);
      return res.status(201).send(result);
    } catch (error) {
      res.status(500).send('Something went wrong');
    }
  },

  processFee: async (req, res) => {
    
  }
};
