const express = require('express');
const feeController = require('../src/controllers/feeController');
const { specParser } = require('../src/middlewares/specParser');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    status: 'success',
    message: "we're good to go",
  });
});

router.post('/fees', specParser, feeController.setupFee);

module.exports = router;
