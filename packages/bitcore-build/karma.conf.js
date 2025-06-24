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

// karma.conf.js
module.exports = function(config) {
  var fs = require('fs');

  var isDocker;

  function hasDockerEnv() {
    try {
      fs.statSync('/.dockerenv');
      return true;
    } catch (err) {
      return false;
    }
  }

  function hasDockerCGroup() {
    try {
      const file = fs.readFileSync('/proc/self/cgroup', 'utf8');
      return file.indexOf('docker') !== -1;
    } catch (err) {
      return false;
    }
  }

  function check() {
    return hasDockerEnv() || hasDockerCGroup();
  }

  if (isDocker === undefined) {
    isDocker = check();
  }



  config.set({
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: isDocker? [
          '--no-sandbox', // required to run without privileges in docker
          '--user-data-dir=/tmp/chrome-test-profile',
          '--disable-web-security'
        ] : []
      }
    },
    frameworks: ['mocha'],
    singleRun: false,
    reporters: ['progress'],
    logLevel: config.LOG_INFO,
    //    port: 9876,  // karma web server port
    autoWatch: false,
    files: [
      '../../tests.js'
    ],
    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
    ]
  });

};
