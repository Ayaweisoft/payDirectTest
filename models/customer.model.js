const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    customerReference: {
      type: String,
      trim: true,
    },
    customerReferenceAlternate: {
      type: String,
      trim: true
    },
    status: {
      type: Number,
      trim: true
    },
    firstName: {
      type: String,
      trim: true,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Last Name is required"],
    },
    otherName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      trim: true,
      required: [true, "Phone Number is required"],
    },
    thirdPartyCode: {
      type: String,
      trim: true
    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("customers", customerSchema);
