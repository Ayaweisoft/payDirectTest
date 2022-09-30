const xml = require('xml');
const Customers = require('../models/customer.model');
const Item = require('../models/item.model');

const singleUrl = async (req, res) => {
  console.log('Raw XML: ' + req.rawBody);
  console.log('Parsed XML: ' + JSON.stringify(req.body));

  if(req.body.CustomerInformationRequest){
    var merchantReference = (req.body.CustomerInformationRequest.MerchantReference) ? req.body.CustomerInformationRequest.MerchantReference : '';
    var custReference = (req.body.CustomerInformationRequest.CustReference) ? req.body.CustomerInformationRequest.CustReference : '';
    var paymentItemCode = (req.body.CustomerInformationRequest.PaymentItemCode) ? req.body.CustomerInformationRequest.PaymentItemCode : '';
    var thirdPartyCode = (req.body.CustomerInformationRequest.ThirdPartyCode) ? req.body.CustomerInformationRequest.ThirdPartyCode : '';

    try{
      const customer = await Customers.findOne({ customerReference: custReference });
      console.log(merchantReference[0], " ", custReference, " ", paymentItemCode[0], " ", thirdPartyCode);
      // if(merchantReference == ["6405"]){
      //   var responseXml = `<CustomerInformationResponse>
      //     <MerchantReference>${merchantReference}</MerchantReference>
      //     <Customers>
      //         <Customer>
      //             <Status>1</Status>
      //             <StatusMessage>Merchant not found</StatusMessage>
      //             <CustReference>${custReference}</CustReference>
      //             <CustomerReferenceAlternate></CustomerReferenceAlternate>
      //             <FirstName></FirstName>
      //             <LastName></LastName>
      //             <Email></Email>
      //             <Phone></Phone>
      //             <ThirdPartyCode>${thirdPartyCode}</ThirdPartyCode>
      //             <Amount>0.00</Amount>
      //         </Customer>
      //     </Customers>
      //   </CustomerInformationResponse>`;

      //   res.header('Content-Type', 'text/xml');
      //   return res.send(responseXml);
      // }
      if(!customer){
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

        res.header('Content-Type', 'text/xml');
        return res.send(responseXml);
      }
      
      const item = await Item.findOne({ productCode: paymentItemCode });
      if(!item){
        var responseXml = `<CustomerInformationResponse>
          <MerchantReference>${merchantReference}</MerchantReference>
          <Customers>
              <Customer>
                  <Status>0</Status>
                  <StatusMessage>Item not found</StatusMessage>
                  <CustReference>${customer.customerReference}</CustReference>
                  <CustomerReferenceAlternate></CustomerReferenceAlternate>
                  <FirstName>${customer.firstName}</FirstName>
                  <LastName>${customer.lastName}</LastName>
                  <Email>${customer.email}</Email>
                  <Phone>${customer.phone}</Phone>
                  <ThirdPartyCode>${thirdPartyCode}</ThirdPartyCode>
                  <Amount>${item.price}</Amount>
              </Customer>
          </Customers>
        </CustomerInformationResponse>`;

        res.header('Content-Type', 'text/xml');
        return res.send(responseXml);
      }
      if(item.price == 0){
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
                  <Amount>${item.price}</Amount>
              </Customer>
          </Customers>
        </CustomerInformationResponse>`;

      res.header('Content-Type', 'text/xml');
      res.send(responseXml);
      }
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
                <Amount>${item.price}</Amount>
                <PaymentItems>
                  <Item>
                    <ProductName>PayAtBank</ProductName>
                    <ProductCode>${item.productCode}</ProductCode>
                    <Quantity>${item.quantity}</Quantity>
                    <Price>${item.price}</Price>
                    <Subtotal>${item.price}</Subtotal>
                    <Tax>0</Tax>
                    <Total>${item.price}</Total>
                  </Item>
              </PaymentItems>
            </Customer>
        </Customers>
      </CustomerInformationResponse>`;

      res.header('Content-Type', 'text/xml');
      res.send(responseXml);
    } catch(err){
      console.log(err);
    }
  } else if(req.body.PaymentNotificationRequest){
    var isRepeated = (req.body.PaymentNotificationRequest.Payments[0].Payment[0].IsRepeated[0]) ? req.body.PaymentNotificationRequest.Payments[0].Payment[0].IsRepeated[0] : '';
    var paymentLogId = (req.body.PaymentNotificationRequest.Payments[0].Payment[0].PaymentLogId[0]) ? req.body.PaymentNotificationRequest.Payments[0].Payment[0].PaymentLogId[0] : '';
    
    const payment = await Payment.findOne({ paymentLogId: PaymentLogId });
    if(isRepeated == 'True' || isRepeated == 'true'){
      var status = 0;
      var responseXml = `<PaymentNotificationResponse>
        <Payments>
          <Payment>
              <PaymentLogId>${paymentLogId}</PaymentLogId>
              <Status>status</Status>
          </Payment>
        </Payments>
      </PaymentNotificationResponse>`;
      res.header('Content-Type', 'text/xml');
      res.send(responseXml);
    }


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