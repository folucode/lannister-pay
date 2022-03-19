const { validationResult } = require('express-validator');

const validatorHandler = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorInfo = errors.array({ onlyFirstError: true });
      const errorMessage = errorInfo[0].msg;

      return res.status(400).send({errorMessage});
    }

    next();
  } catch (error) {
    return res.status(500).send('Something went wrong');
  }
};

module.exports = validatorHandler;
