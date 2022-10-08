const xml = require('xml');
const Customer = require('../models/customer.model');

const addCustomer = async (req, res) => {
  console.log('Raw XML: ' + req.rawBody);
  var parsedBody = req.body.CustomerInformationRequest;
  // var parsedBodyTarget = parsedBody
  // console.log('Parsed XML: ' + parsedBody.FirstName);
  try{
    customerDetails = {
      customerReference: parsedBody.CustReference.toString(),
      firstName: parsedBody.FirstName.toString(),
      otherName: parsedBody.OtherName.toString(),
      lastName: parsedBody.LastName.toString(),
      email: parsedBody.Email.toString(),
      phone: parsedBody.Phone.toString(),

    }
    console.log('Parsed Data: ', customerDetails);

    const customer = await new Customer(customerDetails).save()
    .catch(err => {
      console.log("saving error: ", err);
      return res.send({
        status: "fail",
        message: err,
        data: null
      });
    });
    // res.header('Content-Type', 'text/xml');
    return res.send({
      status: "success",
      message:"Customer added successfully",
      data: customer
    });
  } catch (error) {
    console.log("saving error: ", error);
    return res.status(500).send(error);
  }
}

module.exports = addCustomer;