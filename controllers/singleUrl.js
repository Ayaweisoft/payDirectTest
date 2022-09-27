const xml = require('xml');
const Customers = require('../models/customer.model');

const singleUrl = async (req, res) => {
  console.log('Raw XML: ' + req.rawBody);
  console.log('Parsed XML: ' + JSON.stringify(req.body));

  if(req.body.CustomerInformationRequest){
    var merchantReference = (req.body.CustomerInformationRequest.MerchantReference) ? req.body.CustomerInformationRequest.MerchantReference : '';
    var custReference = (req.body.CustomerInformationRequest.CustReference) ? req.body.CustomerInformationRequest.CustReference : '';
    var paymentItemCode = (req.body.CustomerInformationRequest.PaymentItemCode) ? req.body.CustomerInformationRequest.PaymentItemCode : '';
    var thirdPartyCode = (req.body.CustomerInformationRequest.ThirdPartyCode) ? req.body.CustomerInformationRequest.ThirdPartyCode : '';
    // console.log(thirdPartyCode[0].Id[0]);
    
    try{
      const customer = await Customers.findOne({ customerReference: custReference });
      if(customer){
        var responseXml = `<CustomerInformationResponse>
          <MerchantReference>${merchantReference}</MerchantReference>
          <Customers>
              <Customer>
                  <Status>0</Status>
                  <StatusMessage>Success</StatusMessage>
                  <CustReference>${customer.customerReference}</CustReference>
                  <CustomerReferenceAlternate></CustomerReferenceAlternate>
                  <FirstName>${customer.firstName}</FirstName>
                  <LastName>${customer.lastName}</LastName>
                  <Email>${customer.email}</Email>
                  <Phone>${customer.phone}</Phone>
                  <ThirdPartyCode>${thirdPartyCode}</ThirdPartyCode>
                  <Amount>0.00</Amount>
              </Customer>
          </Customers>
        </CustomerInformationResponse>`;
      } else {
        var responseXml = `<CustomerInformationResponse>
          <MerchantReference>${merchantReference}</MerchantReference>
          <Customers>
              <Customer>
                  <Status>1</Status>
                  <StatusMessage>Customer not found</StatusMessage>
                  <CustReference>${custReference}</CustReference>
                  <CustomerReferenceAlternate></CustomerReferenceAlternate>
                  <FirstName></FirstName>
                  <LastName></LastName>
                  <Email></Email>
                  <Phone></Phone>
                  <ThirdPartyCode>${thirdPartyCode}</ThirdPartyCode>
                  <Amount>0.00</Amount>
              </Customer>
          </Customers>
        </CustomerInformationResponse>`;
      }

      res.header('Content-Type', 'text/xml');
      res.send(responseXml);
    } catch(err){
      console.log(err);
    }
    
   
  } else if(req.body.PaymentNotificationRequest){
    var serviceUrl = (req.body.PaymentNotificationRequest.ServiceUrl) ? req.body.PaymentNotificationRequest.ServiceUrl : '';
    var serviceUsername = (req.body.PaymentNotificationRequest.ServiceUsername) ? req.body.PaymentNotificationRequest.ServiceUsername : '';
    var servicePassword = (req.body.PaymentNotificationRequest.ServicePassword) ? req.body.PaymentNotificationRequest.ServicePassword : '';
    var ftpUrl = (req.body.PaymentNotificationRequest.FtpUrl) ? req.body.PaymentNotificationRequest.FtpUrl : '';
    var ftpUsername = (req.body.PaymentNotificationRequest.FtpUsername) ? req.body.PaymentNotificationRequest.FtpUsername : '';
    var ftpPassword = (req.body.PaymentNotificationRequest.FtpPassword) ? req.body.PaymentNotificationRequest.FtpPassword : '';
    var IsRepeated = (req.body.PaymentNotificationRequest.Payments[0].Payment[0].IsRepeated[0]) ? req.body.PaymentNotificationRequest.Payments[0].Payment[0].IsRepeated[0] : '';
    var paymentLogId = (req.body.PaymentNotificationRequest.Payments[0].Payment[0].PaymentLogId[0]) ? req.body.PaymentNotificationRequest.Payments[0].Payment[0].PaymentLogId[0] : '';
    
    var responseXml = `<PaymentNotificationResponse>
        <Payments>
        <Payment>
            <PaymentLogId>${paymentLogId}</PaymentLogId>
            <Status></Status>
        </Payment>
        </Payments>
    </PaymentNotificationResponse>`;

    
    res.header('Content-Type', 'text/xml');
    res.send(responseXml);
  } else {
    res.send('Invalid Request');
  }
}

module.exports = singleUrl;