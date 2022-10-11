const xml = require('xml');
const Customers = require('../models/customer.model');
const Item = require('../models/item.model');
const Payment = require('../models/payment.model');

const singleUrl = async (req, res) => {
  let data = {apiData: JSON.stringify(req.body)}
  // console.log('Raw XML: ' + data.apiDat);
  // console.log('status: ' + (data.apiData.CustomerInformationRequest.MerchantReference === "6045") ? "true" : "false");

  if(req.body.CustomerInformationRequest){
    var merchantReference = (req.body.CustomerInformationRequest.MerchantReference) ? req.body.CustomerInformationRequest.MerchantReference : '';
    var custReference = (req.body.CustomerInformationRequest.CustReference) ? req.body.CustomerInformationRequest.CustReference : '';
    var paymentItemCode = (req.body.CustomerInformationRequest.PaymentItemCode) ? req.body.CustomerInformationRequest.PaymentItemCode : '';
    var thirdPartyCode = (req.body.CustomerInformationRequest.ThirdPartyCode) ? req.body.CustomerInformationRequest.ThirdPartyCode : '';

    try{
      const customer = await Customers.findOne({ customerReference: custReference });
      console.log(merchantReference[0], " ", custReference, " ", paymentItemCode[0], " ", thirdPartyCode);
      // console.log('status: ', typeof merchantReference., " ", (merchantReference === "6045") ? true : false);
      if(merchantReference.toString() !== "6405" || merchantReference.toString() !== "6033"){
        var responseXml = `<CustomerInformationResponse>
          <MerchantReference>${merchantReference}</MerchantReference>
          <Customers>
              <Customer>
                  <Status>1</Status>
                  <StatusMessage>Merchant not found</StatusMessage>
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
      return res.send(responseXml);
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
    var isReversal = (req.body.PaymentNotificationRequest.Payments[0].Payment[0].IsReversal[0]) ? req.body.PaymentNotificationRequest.Payments[0].Payment[0].IsReversal[0] : '';
    var paymentLogId = (req.body.PaymentNotificationRequest.Payments[0].Payment[0].PaymentLogId[0]) ? req.body.PaymentNotificationRequest.Payments[0].Payment[0].PaymentLogId[0] : '';
    var paymentReference = (req.body.PaymentNotificationRequest.Payments[0].Payment[0].PaymentReference[0]) ? req.body.PaymentNotificationRequest.Payments[0].Payment[0].PaymentReference[0] : '';
    var amount = (req.body.PaymentNotificationRequest.Payments[0].Payment[0].Amount[0]) ? req.body.PaymentNotificationRequest.Payments[0].Payment[0].Amount[0] : '';
    var receiptNumber = (req.body.PaymentNotificationRequest.Payments[0].Payment[0].ReceiptNo[0]) ? req.body.PaymentNotificationRequest.Payments[0].Payment[0].ReceiptNo[0] : '';
    var customerReference = (req.body.PaymentNotificationRequest.Payments[0].Payment[0].CustReference[0]) ? req.body.PaymentNotificationRequest.Payments[0].Payment[0].CustReference[0] : '';
    var originalPaymentLogId = (req.body.PaymentNotificationRequest.Payments[0].Payment[0].OriginalPaymentLogId[0]) ? req.body.PaymentNotificationRequest.Payments[0].Payment[0].OriginalPaymentLogId[0] : '';
    var originalPaymentReference = (req.body.PaymentNotificationRequest.Payments[0].Payment[0].OriginalPaymentReference[0]) ? req.body.PaymentNotificationRequest.Payments[0].Payment[0].OriginalPaymentReference[0] : '';

    const payment = await Payment.findOne({ paymentLogId: paymentLogId });
    if((isRepeated.toString() == 'True' || isRepeated.toString() == 'true') || payment){
      var responseXml = `<PaymentNotificationResponse>
        <Payments>  
          <Payment>
              <PaymentLogId>${paymentLogId}</PaymentLogId>
              <Status>0</Status>
          </Payment>
        </Payments>
      </PaymentNotificationResponse>`;
      res.header('Content-Type', 'text/xml');
      return res.send(responseXml);
    }

    if(isReversal.toString() == 'True' || isReversal.toString() == 'true'){
      if(Number(amount) > 0){
        console.log("wrong ammount")
        var responseXml = `<PaymentNotificationResponse>
          <Payments>  
            <Payment>
                <PaymentLogId>${paymentLogId}</PaymentLogId>
                <Status>1</Status>
            </Payment>
          </Payments>
        </PaymentNotificationResponse>`;
        res.header('Content-Type', 'text/xml');
        return res.send(responseXml);
      }
      
      try{
        var data_object = {
          paymentLogId: paymentLogId.toString(),
          isRepeated: isRepeated.toString(),
          paymentReference: paymentReference.toString(),
          amount: amount.toString(),
          receiptNumber: receiptNumber.toString(), 
          customerReference: customerReference.toString(),
          isReversal: isReversal.toString(),
          originalPaymentLogId: originalPaymentLogId.toString(),
          originalPaymentReference: originalPaymentReference.toString(),
        }
    
        const newPayment = new Payment(data_object);
        await newPayment.save(); 
    
        var responseXml = `<PaymentNotificationResponse>
          <Payments>
            <Payment>
                <PaymentLogId>${paymentLogId}</PaymentLogId>
                <Status>0</Status>
            </Payment>
          </Payments>
        </PaymentNotificationResponse>`;
       
        res.header('Content-Type', 'text/xml');
        return res.send(responseXml);
      } catch(err){
        console.log(err);
      } 
    }

    try{
      var data_object = {
        paymentLogId: paymentLogId.toString(),
        isRepeated: isRepeated.toString(),
        paymentReference: paymentReference.toString(),
        amount: amount.toString(),
        receiptNumber: receiptNumber.toString(), 
        customerReference: customerReference.toString(),
        isReversal: isReversal.toString(),
      }
  
      const newPayment = new Payment(data_object);
      await newPayment.save();
  
      var responseXml = `<PaymentNotificationResponse>
        <Payments>
          <Payment>
              <PaymentLogId>${paymentLogId}</PaymentLogId>
              <Status>0</Status>
          </Payment>
        </Payments>
      </PaymentNotificationResponse>`;
     
      res.header('Content-Type', 'text/xml');
      res.send(responseXml);
    } catch(err){
      console.log(err);
    } 
  } else {
    res.send('Invalid Request');
  }
}

module.exports = singleUrl;