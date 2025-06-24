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

  config.set({
    browsers: ['Firefox'],
    frameworks: ['mocha', 'detectBrowsers'],
    detectBrowsers: {
      enabled: true,
      usePhantomJS: false,
      postDetection: function(availableBrowser) {
        // modify to enable additional browsers if available
        var runBrowsers = ['Firefox', 'Chrome'];
        var browsers = [];
        for(var i = 0; i < runBrowsers.length; i++) {
          if(~availableBrowser.indexOf(runBrowsers[i])) {
            browsers.push(runBrowsers[i]);
          }
        }
        return browsers;
      }
    },
    singleRun: true,
    files: [
      'tests.js'
    ],
    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-detect-browsers'
    ]
  });

};
