const express = require("express");
const router = express.Router();
const addCustomer = require("../controllers/addCustomer");
const singleUrl = require("../controllers/singleUrl");

//test
router.post("/addCustomer", addCustomer);

//single url
router.post("/singleUrl", singleUrl);

module.exports = router;
