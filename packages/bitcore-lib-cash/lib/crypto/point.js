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
'use strict';

var BN = require('./bn');
var BufferUtil = require('../util/buffer');

var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
var ecPoint = ec.curve.point.bind(ec.curve);
var ecPointFromX = ec.curve.pointFromX.bind(ec.curve);

/**
 *
 * Instantiate a valid secp256k1 Point from the X and Y coordinates.
 *
 * @param {BN|String} x - The X coordinate
 * @param {BN|String} y - The Y coordinate
 * @link https://github.com/indutny/elliptic
 * @augments elliptic.curve.point
 * @throws {Error} A validation error if exists
 * @returns {Point} An instance of Point
 * @constructor
 */
var Point = function Point(x, y, isRed) {
  try {
    var point = ecPoint(x, y, isRed);
  } catch (e) {
    throw new Error('Invalid Point');
  }
  point.validate();
  return point;
};

Point.prototype = Object.getPrototypeOf(ec.curve.point());

/**
 *
 * Instantiate a valid secp256k1 Point from only the X coordinate
 *
 * @param {boolean} odd - If the Y coordinate is odd
 * @param {BN|String} x - The X coordinate
 * @throws {Error} A validation error if exists
 * @returns {Point} An instance of Point
 */
Point.fromX = function fromX(odd, x){
  try {
    var point = ecPointFromX(x, odd);
  } catch (e) {
    throw new Error('Invalid X');
  }
  point.validate();
  return point;
};

/**
 *
 * Will return a secp256k1 ECDSA base point.
 *
 * @link https://en.bitcoin.it/wiki/Secp256k1
 * @returns {Point} An instance of the base point.
 */
Point.getG = function getG() {
  return ec.curve.g;
};

/**
 *
 * Will return the max of range of valid private keys as governed by the secp256k1 ECDSA standard.
 *
 * @link https://en.bitcoin.it/wiki/Private_key#Range_of_valid_ECDSA_private_keys
 * @returns {BN} A BN instance of the number of points on the curve
 */
Point.getN = function getN() {
  return new BN(ec.curve.n.toArray());
};

if (!Point.prototype._getX)
  Point.prototype._getX = Point.prototype.getX;

/**
 *
 * Will return the X coordinate of the Point
 *
 * @returns {BN} A BN instance of the X coordinate
 */
Point.prototype.getX = function getX() {
  return new BN(this._getX().toArray());
};

if (!Point.prototype._getY)
  Point.prototype._getY = Point.prototype.getY;

/**
 *
 * Will return the Y coordinate of the Point
 *
 * @returns {BN} A BN instance of the Y coordinate
 */
Point.prototype.getY = function getY() {
  return new BN(this._getY().toArray());
};

/**
 *
 * Will determine if the point is valid
 *
 * @link https://www.iacr.org/archive/pkc2003/25670211/25670211.pdf
 * @param {Point} An instance of Point
 * @throws {Error} A validation error if exists
 * @returns {Point} An instance of the same Point
 */
Point.prototype.validate = function validate() {

  if (this.isInfinity()){
    throw new Error('Point cannot be equal to Infinity');
  }

  var p2;
  try {
    p2 = ecPointFromX(this.getX(), this.getY().isOdd());
  } catch (e) {
    throw new Error('Point does not lie on the curve');
  }

  if (p2.y.cmp(this.y) !== 0) {
    throw new Error('Invalid y value for curve.');
  }


  //todo: needs test case
  if (!(this.mul(Point.getN()).isInfinity())) {
    throw new Error('Point times N must be infinity');
  }

  return this;

};

Point.pointToCompressed = function pointToCompressed(point) {
  var xbuf = point.getX().toBuffer({size: 32});
  var ybuf = point.getY().toBuffer({size: 32});

  var prefix;
  var odd = ybuf[ybuf.length - 1] % 2;
  if (odd) {
    prefix = Buffer.from([0x03]);
  } else {
    prefix = Buffer.from([0x02]);
  }
  return BufferUtil.concat([prefix, xbuf]);
};

// todo: needs test case
Point.prototype.hasSquare = function() {
  return !this.isInfinity() && this.isSquare(this.getY());
}

// todo: needs test cases
Point.prototype.isSquare = function(x) {
  let p = new BN('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F', 'hex');
  let x0 = new BN(x);
  let base = x0.toRed(BN.red(p));
  let res = base.redPow(p.sub(BN.One).div(new BN(2))).fromRed(); //refactor to BN arithmetic operations
  return res.eq(new BN(1));
}

module.exports = Point;
