const express = require('express');
const router = express.Router();
const braintree = require('braintree');

router.post('/', function(req, res, next) {
  const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: '38m8vd9hxk9xts8p',
    publicKey: 'dp3r47bspwc5pkc4',
    privateKey: 'a037b2ead466d9483834de8dcbf6707f'
  });

  // Use the payment method nonce here
  const nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for any amount
  const newTransaction = gateway.transaction.sale({
    amount: '65.00',
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, function(error, result) {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});

module.exports = router;
