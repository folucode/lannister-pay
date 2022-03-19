const { setupFeeSpec } = require('../services/feeService');

module.exports = {
  setupFee: async (req, res) => {
    try {
      const FeeConfigurationSpec = res.locals.finalFeeConfigurationSpec;

    //   const { status, message, data } = await setupFeeSpec(
    //     FeeConfigurationSpec
    //   );
      return res.status(201).send({ status: true, FeeConfigurationSpec });
    } catch (error) {
      res.status(500).send('Something went wrong' + error.message);
    }
  },
};
