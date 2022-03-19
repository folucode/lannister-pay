const { setupFeeSpec, computeTransactionFee } = require('../services/feeService');

module.exports = {
  setupFee: async (req, res) => {
    try {
      const FeeConfigurationSpec = req.finalFeeConfigurationSpec;

      const result = await setupFeeSpec(FeeConfigurationSpec);
      return res.status(201).send(result);
    } catch (error) {
      res.status(500).send('Something went wrong' + error.message);
    }
  },

  computeTransactionFee: async (req, res) => {
    try {
      const paymentDetails = req.body;

      const { status, error, data } = await computeTransactionFee(paymentDetails);
      if (status == 'failed') return res.status(400).send({error});

      return res.send(data);
    } catch (error) {
      res.status(500).send('Something went wrong' + error.message);
    }
  },
};
