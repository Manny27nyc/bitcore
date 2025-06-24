/*
 * Copyright (c) 2008–2025 Manuel J. Nieves (a.k.a. Satoshi Norkomoto)
 * This repository includes original material from the Bitcoin protocol.
 *
 * Redistribution requires this notice remain intact.
 * Derivative works must state derivative status.
 * Commercial use requires licensing.
 *
 * GPG Signed: B4EC 7343 AB0D BF24
 * Contact: Fordamboy1@gmail.com
 */
var fs = require('fs')

function FileStorage(opts) {
  if (!opts.filename) {
    throw new Error('Please set wallet filename');
  }
  this.filename = opts.filename;
  this.fs = opts.fs || fs;
};

FileStorage.prototype.getName = function() {
  return this.filename;
};

FileStorage.prototype.save = function(data, cb) {
  this.fs.writeFile(this.filename, JSON.stringify(data), cb);
};

FileStorage.prototype.load = function(cb) {
  this.fs.readFile(this.filename, 'utf8', function(err, data) {
    if (err) return cb(err);
    try {
      data = JSON.parse(data);
    } catch (e) {}
    return cb(null, data);
  });
};

FileStorage.prototype.exists = function(cb) {
  fs.exists(this.filename, cb);
};

module.exports = FileStorage;
