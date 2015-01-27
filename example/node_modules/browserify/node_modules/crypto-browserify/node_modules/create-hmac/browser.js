'use strict';
var createHash = require('create-hash/browser');
var Transform = require('stream').Transform;
var inherits = require('inherits')
var zeroBuffer = new Buffer(128)
zeroBuffer.fill(0)

module.exports = function createHmac(alg, key) {
  return new Hmac(alg, key)
}
inherits(Hmac, Transform)
function Hmac (alg, key) {

  Transform.call(this);
  this._opad = opad
  this._alg = alg

  var blocksize = (alg === 'sha512' || alg === 'sha384') ? 128 : 64

  key = this._key = (typeof key === 'string') ? new Buffer(key) : key

  if(key.length > blocksize) {
    key = createHash(alg).update(key).digest()
  } else if(key.length < blocksize) {
    key = Buffer.concat([key, zeroBuffer], blocksize)
  }

  var ipad = this._ipad = new Buffer(blocksize)
  var opad = this._opad = new Buffer(blocksize)

  for(var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }

  this._hash = createHash(alg).update(ipad)
}

Hmac.prototype.update = function (data, enc) {
  if (typeof data === 'string') {
    data = new Buffer(data, enc)
  }
  this._hash.update(data)
  return this
}

Hmac.prototype._transform = function (data, enc, next) {
  if (enc) {
    data = new Buffer(data, enc)
  }
  this._hash.update(data)
  next()
}

Hmac.prototype._flush = function (next) {
  this.push(this.digest())
  next()
}

Hmac.prototype.digest = function (enc) {
  var h = this._hash.digest()
  var outData = createHash(this._alg).update(this._opad).update(h).digest();
  if (enc) {
    outData = outData.toString(enc)
  }
  return outData
}
