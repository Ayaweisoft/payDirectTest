const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    paymentLogId: {
      type: String,
      trim: true,
    },
    originalPaymentLogId: {
      type: String,
      trim: true,
    },
    originalPaymentReference: {
      type: String,
      trim: true,
    },
    amount: {
      type: String,
      trim: true,
    },
    paymentReference: {
      type: String,
      trim: true,
    },
    receiptNumber: {
      type: String,
      trim: true, 
    },
    customerReference: {
        type: String,
        trim: true
    },
    isReversal: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("payments", paymentSchema);
