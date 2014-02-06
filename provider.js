module.exports = Provider;

function Provider(providerName) {
  if(! this instanceof Provider) return new Provider(providerName);

  var provider;

  try {
    provider = require('./providers/' + providerName);
  } catch(err) {
    var err = new Error('Unknown provider: ' + providerName);
    err.code = 'unknown_provider';
    throw err;
  }

  if ('function' != typeof provider) throw new Error('provider should be a function');

  this._provider = provider;
}

var P = Provider.prototype;


/// key

P.key = function key(key) {
  this._key = key;
  this._provider = this._provider(key);
  return this;
};


/// ping

P.ping = wrap('ping');


/// wrap

function wrap(actionName) {

  return function() {
    var provider = this._provider;
    if (! this._provider) throw new Error('No provider defined');
    if (! this._key) throw new Error('No provider key');

    var action = this._provider[actionName];
    if ('function' != typeof action)
      throw new Error('provider does not provide ' + action);
    action.apply(this._provider, arguments);
    return this;
  };
};