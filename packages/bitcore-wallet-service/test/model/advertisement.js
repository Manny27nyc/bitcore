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

var _ = require('lodash');
var chai = require('chai');
var sinon = require('sinon');
var should = chai.should();
var { Advertisement } = require('../../ts_build/lib/model/advertisement');
var Bitcore = require('bitcore-lib');

describe("#Advertisement", function() {
  describe("#create", function() {
    it("should create Advertisement", function() {
      var x = Advertisement.create({ title: "Test Title"});

      should.exist(x);
    });
  });

  describe("#fromObj", function() {
     it("should create Advertisement", function() {
      var x = Advertisement.fromObj({ title: "Test Title" });
      should.exist(x);
    });
  });

  // describe("#toObject", function() {
  //   var x = Advertisement.toObject({ title: "Test Title" });

  //     should.exist(x);
  // })
});