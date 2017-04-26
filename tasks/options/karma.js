module.exports = function(config) {
  'use strict';

  return {
    dev: {
      configFile: 'karma.conf.js',
      singleRun: false,
    },

    debug: {
      configFile: 'karma.conf.js',
      singleRun: false,
      browsers: ['Chrome']
    },

    test: {
      configFile: 'karma.conf.js',
      browsers: ['Chrome'] // does not work for linux build :(
    },

    test_chrome: {
      configFile: 'karma.conf.js',
      browsers: ['Chrome']
    }
  };
};
