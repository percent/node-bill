var Stripe = require('stripe');

module.exports = StripeKey;

function StripeKey(key) {

  var stripe = Stripe(key);

  return {
    ping: ping
  };

  function ping(cb) {
    stripe.charges.list({ count: 1 }, function(err) {
      if (err && err.message.indexOf('Invalid API Key') >= 0) {
        var err = new Error('Invalid API Key');
        err.code = 'invalid_api_key';
        cb(err);
      } else if (err) {
        cb(err);
      } else cb();
    });
  }
}