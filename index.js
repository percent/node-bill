var Provider = require('./provider');
module.exports = createProvider;

function createProvider(providerName) {
  return new Provider(providerName);
}