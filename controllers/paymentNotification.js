const xml = require('xml');

const paymentVerification = (req, res) => {
  console.log('Raw XML: ' + req.rawBody);
  console.log('Parsed XML: ' + JSON.stringify(req.body));
  
  res.header('Content-Type', 'text/xml');
  res.send({hi: "gi"});
}

module.exports = paymentVerification;