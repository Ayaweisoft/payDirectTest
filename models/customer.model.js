const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { BCRYPT_SALT } = require("../config");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    serviceUsername: {
      type: String,
      trim: true,
      required: [true, "First Name is required"],
    },
    servicePassword: {
      type: String,
      trim: true,
      required: [true, "Last Name is required"],
    },
    merchantReference: {
      type: String,
      trim: true,
      required: [true, "Maiden Name is required"],
    },
    customerReference: {
      type: String,
      trim: true,
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
      required: [true, "Email is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Gender is required"],
    },
    dob: {
      type: String,
      required: [true, "Date of birth is required"],
    },
    license: {
      type: String,
      trim: true,
      required: [true, "License is required"],
    },
    blood_group: {
      type: String,
      enum: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],
      required: [true, "Blood Group is required"],
    },
    facial_mark: {
      type: Boolean,
      default: false,
    },
    glasses: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      trim: true,
      required: [true, "Height is required"],
    },
    disabilities: {
      type: String,
      required: [true, "Disablities is required"],
    },
    nin: {
      type: String,
      trim: true,
      required: [true, "National Identification Number is required"],
    },
    tin: {
      type: String,
      trim: true,
      required: [true, "TIN is required"],
    },
    next_of_kin_number: {
      type: String,
      trim: true,
      required: [true, "Next of Kin is required"],
    },
    country: {
      type: String,
      trim: true,
      required: [true, "Country is required"],
    },
    state: {
      type: String,
      trim: true,
      required: [true, "State is required"],
    },
    state_of_origin: {
      type: String,
      trim: true,
      required: [true, "State of Origin is required"],
    },
    city: {
      type: String,
      trim: true,
      required: [true, "city is required"],
    },
    lga: {
      type: String,
      trim: true,
      required: [true, "LGA is required"],
    },
    address: {
      type: String,
      trim: true,
      required: [true, "address is required"],
    },
    course_type: {
      type: String,
      default: 'refresher',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    paymentID: {
      type: String,
      trim: true,
      required: [true, "paymentID is required"],
    },
    merchant_code: {
      type: String,
      required: [true, "merchant code is required"],
    },
    amount: {
      type: String,
      required: [true, "amount is required"],
    },
    role: {
      type: String,
      trim: true,
      enum: ["user", "admin"],
      default: "user",
    },
    certificate: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   const hash = await bcrypt.hash(this.password, BCRYPT_SALT);
//   this.password = hash;

//   next();
// });

module.exports = mongoose.model("users", userSchema);
