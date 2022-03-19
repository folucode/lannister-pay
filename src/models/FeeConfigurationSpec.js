const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;

const FeeConfigurationSpecSchema = new Schema(
  {
    feeID: {
      type: String,
      required: true,
    },
    feeCurrency: {
      type: String,
      required: true,
    },
    feeLocale: {
      type: String,
      required: true,
    },
    feeEntity: {
      type: String,
      required: true,
    },
    feeProperty: {
      type: String,
      required: true,
    },
    feeType: {
      type: String,
      required: true,
    },
    feeValue: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const FeeConfigurationSpec = mongoose.model(
  'FeeConfigurationSpec',
  FeeConfigurationSpecSchema
);

module.exports = FeeConfigurationSpec;
