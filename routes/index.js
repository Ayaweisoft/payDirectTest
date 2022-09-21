const express = require("express");
const router = express.Router();
const customerValidation = require("../controllers/customerValidation");
const paymentVerification = require("../controllers/paymentNotification");

router.post("/customerValidation", customerValidation);
router.post("/paymentVerification", paymentVerification);


module.exports = router;
