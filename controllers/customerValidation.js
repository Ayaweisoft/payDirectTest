const xml = require('xml');

const customerValidation = (req, res) => {
  console.log('Raw XML: ' + req.rawBody);
  console.log('Parsed XML: ' + JSON.stringify(req.body));

  var serviceUsername = req.body.CustomerInformationRequest.ServiceUsername;
  var servicePassword = req.body.CustomerInformationRequest.ServicePassword;
  var merchantReference = req.body.CustomerInformationRequest.MerchantReference;
  var custReference = req.body.CustomerInformationRequest.CustReference;
  var paymentItemCode = req.body.CustomerInformationRequest.PaymentItemCode;
  var thirdPartyCode = req.body.CustomerInformationRequest.ThirdPartyCode;
  var id = req.body.CustomerInformationRequest.ThirdPartyCode[0].Id[0];
  // console.log(thirdPartyCode[0].Id[0]);
  
  
  var responseXml = `<CustomerInformationResponse>
    <MerchantReference>${merchantReference}</MerchantReference>
    <Customers>
        <Customer>
            <Status>0</Status>
            <CustReference>${custReference}</CustReference>
            <CustomerReferenceAlternate></CustomerReferenceAlternate>
            <FirstName>test test</FirstName>
            <LastName></LastName>
            <Email></Email>
            <Phone></Phone>
            <ThirdPartyCode>${id}</ThirdPartyCode>
            <Amount>0.00</Amount>
        </Customer>
    </Customers>
  </CustomerInformationResponse>`;

  res.header('Content-Type', 'text/xml');
  res.send(responseXml);
}

module.exports = customerValidation;