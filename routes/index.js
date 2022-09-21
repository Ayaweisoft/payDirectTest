const express = require("express");
const router = express.Router();
const customerValidation = require("../controllers/customerValidation");
const paymentNotification = require("../controllers/paymentNotification");
const singleUrl = require("../controllers/singleUrl");

//test
router.post("/customerValidation", customerValidation);
router.post("/paymentNotification", paymentNotification);

//single url
router.post("/singleUrl", singleUrl);

module.exports = router;
