const xml = require('xml');

const paymentVerification = (req, res) => {
  console.log('Raw XML: ' + req.rawBody);
  console.log('Parsed XML: ' + JSON.stringify(req.body.PaymentNotificationRequest));

  var serviceUrl = (req.body.PaymentNotificationRequest.ServiceUrl) ? req.body.PaymentNotificationRequest.ServiceUrl : '';
  var serviceUsername = (req.body.PaymentNotificationRequest.ServiceUsername) ? req.body.PaymentNotificationRequest.ServiceUsername : '';
  var servicePassword = (req.body.PaymentNotificationRequest.ServicePassword) ? req.body.PaymentNotificationRequest.ServicePassword : '';
  var ftpUrl = (req.body.PaymentNotificationRequest.FtpUrl) ? req.body.PaymentNotificationRequest.FtpUrl : '';
  var ftpUsername = (req.body.PaymentNotificationRequest.FtpUsername) ? req.body.PaymentNotificationRequest.FtpUsername : '';
  var ftpPassword = (req.body.PaymentNotificationRequest.FtpPassword) ? req.body.PaymentNotificationRequest.FtpPassword : '';
  var IsRepeated = (req.body.PaymentNotificationRequest.Payments[0].Payment[0].IsRepeated[0]) ? req.body.PaymentNotificationRequest.Payments[0].Payment[0].IsRepeated[0] : '';
  // var ProductGroupCode = (req.body.PaymentNotificationRequest.Payments.Payment.ProductGroupCode) ? req.body.PaymentNotificationRequest.Payments.Payment.ProductGroupCode : '';
  // var PaymentLogId = (req.body.PaymentNotificationRequest.Payments.Payment.PaymentLogId) ? req.body.PaymentNotificationRequest.Payments.Payment.PaymentLogId : '';
  // var CustReference = (req.body.PaymentNotificationRequest.Payments.Payment.CustReference) ? req.body.PaymentNotificationRequest.Payments.Payment.CustReference : '';
  // var AlternateCustReference = (req.body.PaymentNotificationRequest.Payments.Payment.AlternateCustReference) ? req.body.PaymentNotificationRequest.Payments.Payment.AlternateCustReference : '';
  // var Amount = (req.body.PaymentNotificationRequest.Payments.Payment.Amount) ? req.body.PaymentNotificationRequest.Payments.Payment.Amount : '';
  // var PaymentStatus = (req.body.PaymentNotificationRequest.Payments.Payment.PaymentStatus) ? req.body.PaymentNotificationRequest.Payments.Payment.PaymentStatus : '';
  // var PaymentMethod = (req.body.PaymentNotificationRequest.Payments.Payment.PaymentMethod) ? req.body.PaymentNotificationRequest.Payments.Payment.PaymentMethod : '';
  // var PaymentReference = (req.body.PaymentNotificationRequest.Payments.Payment.PaymentReference) ? req.body.PaymentNotificationRequest.Payments.Payment.PaymentReference : '';
  // var TerminalId = (req.body.PaymentNotificationRequest.Payments.Payment.TerminalId) ? req.body.PaymentNotificationRequest.Payments.Payment.TerminalId : '';
  // var ChannelName = (req.body.PaymentNotificationRequest.Payments.Payment.ChannelName) ? req.body.PaymentNotificationRequest.Payments.Payment.ChannelName : '';
  // var Location = (req.body.PaymentNotificationRequest.Payments.Payment.Location) ? req.body.PaymentNotificationRequest.Payments.Payment.Location : '';
  // var IsReversal = (req.body.PaymentNotificationRequest.Payments.Payment.IsReversal) ? req.body.PaymentNotificationRequest.Payments.Payment.IsReversal : '';
  // var PaymentDate = (req.body.PaymentNotificationRequest.Payments.Payment.PaymentDate) ? req.body.PaymentNotificationRequest.Payments.Payment.PaymentDate : '';
  // var SettlementDate = (req.body.PaymentNotificationRequest.Payments.Payment.SettlementDate) ? req.body.PaymentNotificationRequest.Payments.Payment.SettlementDate : '';
  // var InstitutionId = (req.body.PaymentNotificationRequest.Payments.Payment.InstitutionId) ? req.body.PaymentNotificationRequest.Payments.Payment.InstitutionId : '';
  // var InstitutionName = (req.body.PaymentNotificationRequest.Payments.Payment.InstitutionName) ? req.body.PaymentNotificationRequest.Payments.Payment.InstitutionName : '';
  // var BranchName = (req.body.PaymentNotificationRequest.Payments.Payment.BranchName) ? req.body.PaymentNotificationRequest.Payments.Payment.BranchName : '';
  // var BankName = (req.body.PaymentNotificationRequest.Payments.Payment.BankName) ? req.body.PaymentNotificationRequest.Payments.Payment.BankName : '';
  // var FeeName = (req.body.PaymentNotificationRequest.Payments.Payment.FeeName) ? req.body.PaymentNotificationRequest.Payments.Payment.FeeName : '';
  // var CustomerName = (req.body.PaymentNotificationRequest.Payments.Payment.CustomerName) ? req.body.PaymentNotificationRequest.Payments.Payment.CustomerName : '';
  // var OtherCustomerInfo = (req.body.PaymentNotificationRequest.Payments.Payment.OtherCustomerInfo) ? req.body.PaymentNotificationRequest.Payments.Payment.OtherCustomerInfo : '';
  // var ReceiptNo = (req.body.PaymentNotificationRequest.Payments.Payment.ReceiptNo) ? req.body.PaymentNotificationRequest.Payments.Payment.ReceiptNo : '';
  // var CollectionsAccount = (req.body.PaymentNotificationRequest.Payments.Payment.CollectionsAccount) ? req.body.PaymentNotificationRequest.Payments.Payment.CollectionsAccount : '';
  // var ThirdPartyCode = (req.body.PaymentNotificationRequest.Payments.Payment.ThirdPartyCode) ? req.body.PaymentNotificationRequest.Payments.Payment.ThirdPartyCode : '';
  // var ItemName = (req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.ItemName) ? req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.ItemName : '';
  // var ItemCode = (req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.ItemCode) ? req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.ItemCode : '';
  // var ItemAmount = (req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.ItemAmount) ? req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.ItemAmount : '';
  // var LeadBankCode = (req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.LeadBankCode) ? req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.LeadBankCode : '';
  // var LeadBankName = (req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.LeadBankName) ? req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.LeadBankName : '';
  // var LeadBankCbnCode = (req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.LeadBankCbnCode) ? req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.LeadBankCbnCode : '';
  // var CategoryCode = (req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.CategoryCode) ? req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.CategoryCode : '';
  // var CategoryName = (req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.CategoryName) ? req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.CategoryName : '';
  // var ItemQuantity = (req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.ItemQuantity) ? req.body.PaymentNotificationRequest.Payments.Payment.PaymentItems.PaymentItem.ItemQuantity : '';
  // var BankCode = (req.body.PaymentNotificationRequest.Payments.Payment.BankCode) ? req.body.PaymentNotificationRequest.Payments.Payment.BankCode : '';
  // var CustomerAddress = (req.body.PaymentNotificationRequest.Payments.Payment.CustomerAddress) ? req.body.PaymentNotificationRequest.Payments.Payment.CustomerAddress : '';
  // var CustomerPhoneNumber = (req.body.PaymentNotificationRequest.Payments.Payment.CustomerPhoneNumber) ? req.body.PaymentNotificationRequest.Payments.Payment.CustomerPhoneNumber : '';
  // var DepositorName = (req.body.PaymentNotificationRequest.Payments.Payment.DepositorName) ? req.body.PaymentNotificationRequest.Payments.Payment.DepositorName : '';
  // var DepositSlipNumber = (req.body.PaymentNotificationRequest.Payments.Payment.DepositSlipNumber) ? req.body.PaymentNotificationRequest.Payments.Payment.DepositSlipNumber : '';
  // var PaymentCurrency = (req.body.PaymentNotificationRequest.Payments.Payment.PaymentCurrency) ? req.body.PaymentNotificationRequest.Payments.Payment.PaymentCurrency : '';
  // var OriginalPaymentLogId = (req.body.PaymentNotificationRequest.Payments.Payment.OriginalPaymentLogId) ? req.body.PaymentNotificationRequest.Payments.Payment.OriginalPaymentLogId : '';
  // var OriginalPaymentReference = (req.body.PaymentNotificationRequest.Payments.Payment.OriginalPaymentReference) ? req.body.PaymentNotificationRequest.Payments.Payment.OriginalPaymentReference : '';
  // var Teller = (req.body.PaymentNotificationRequest.Payments.Payment.Teller) ? req.body.PaymentNotificationRequest.Payments.Payment.Teller : '';

  var responseXml = `<PaymentNotificationResponse>
    <Payments>
      <Payment>
        <PaymentLogId>${IsRepeated}</PaymentLogId>
        <Status></Status>
      </Payment>
    </Payments>
  </PaymentNotificationResponse>`;

  
  res.header('Content-Type', 'text/xml');
  res.send(responseXml);
}

module.exports = paymentVerification;