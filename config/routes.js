const express = require('express');
const feeController = require('../src/controllers/feeController');
const specParser = require('../src/middlewares/specParser');
const transactionValidator = require('../src/middlewares/transactionValidator');
const validatorHandler = require('../src/middlewares/validationHandler');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    status: 'success',
    message: "we're good to go",
  });
});

router.post('/fees', specParser, feeController.setupFee);
router.post('/compute-transaction-fee', transactionValidator.compute, validatorHandler, feeController.computeTransactionFee);

module.exports = router;
