const xml = require('xml');
const Customer = require('../models/customer.model');

const addCustomer = async (req, res) => {
  console.log('Raw XML: ' + req.rawBody);
  var parsedBody = req.body;
  // var parsedBodyTarget = parsedBody
  // console.log('Parsed XML: ' + parsedBody.FirstName);
  try{
    customerDetails = {
      customerReference: parsedBody.CustReference,
      firstName: parsedBody.FirstName,
      otherName: parsedBody.OtherName,
      lastName: parsedBody.LastName,
      email: parsedBody.Email,
      phone: parsedBody.Phone,

    }
    console.log('Parsed Data: ' + customerDetails.customerReference);

    const customer = await new Customer(customerDetails).save()
    .catch(err => {
      console.log("saving error: ", err);
    });
    // res.header('Content-Type', 'text/xml');
    res.send(customer);
  } catch (error) {
    console.log("saving error: ", error);
    res.status(500).send(error);
  }
  // res.header('Content-Type', 'text/xml');
  // res.send(req.body.CustomerInformationRequest);
}

module.exports = addCustomer;