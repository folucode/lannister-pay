const {
  setupFeeSpec,
  computeTransactionFee,
} = require('../services/feeService');

module.exports = {
  setupFee: async (req, res) => {
    try {
      const FeeConfigurationSpec = req.finalFeeConfigurationSpec;

      const { status, message } = await setupFeeSpec(FeeConfigurationSpec);
      return res.status(201).send({ status, message });
    } catch (error) {
      res.status(500).send('Something went wrong');
    }
  },

  computeTransactionFee: async (req, res) => {
    try {
      const paymentDetails = req.body;

      const { status, message, data } = await computeTransactionFee(
        paymentDetails
      );
      if (status == 'failed') return res.status(400).send({ status, message });

      return res.send({ status, message, data });
    } catch (error) {
      res.status(500).send('Something went wrong');
    }
  },
};
