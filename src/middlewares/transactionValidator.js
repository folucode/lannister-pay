const { check } = require('express-validator');

const transactionValidator = {
  compute: [
    check('Amount')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Amount is required')
      .trim()
      .isNumeric(),
    check('Currency')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Currency is required'),
    check('CurrencyCountry')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('CurrencyCountry is required')
      .trim(),
    check('Customer.EmailAddress')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('EmailAddress is required')
      .isEmail()
      .trim()
      .withMessage('Please use a valid email address'),
    check('Customer.FullName')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('FullName is required')
      .trim(),
    check('Customer.BearsFee')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('BearsFee is required')
      .trim()
      .isBoolean()
      .withMessage('BearsFee has to be a boolean value'),
    check('PaymentEntity.Issuer')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Issuer is required')
      .trim(),
    check('PaymentEntity.Number')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Brand is required')
      .trim(),
    check('PaymentEntity.SixID')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Brand is required')
      .trim()
      .isLength({ min: 6, max: 6 })
      .withMessage('use a valid 6 digit number'),
    check('PaymentEntity.Type')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Brand is required')
      .trim()
      .isIn(['CREDIT-CARD', 'DEBIT-CARD', 'BANK-ACCOUNT', 'USSD', 'WALLET-ID'])
      .withMessage(
        'Type has to be CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD, or WALLET-ID'
      ),
    check('PaymentEntity.Country')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Brand is required')
      .trim(),
  ],
};

module.exports = transactionValidator;
