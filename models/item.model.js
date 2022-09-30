const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    productName: {
      type: String,
      trim: true,
    },
    productCode: {
      type: String,
      trim: true
    },
    price: {
      type: String,
      trim: true,
    },
    quantity: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("items", itemSchema);
