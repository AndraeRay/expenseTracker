'use strict';

// Karma configuration
module.exports = function(config) {
  var basePath = '.';

  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: basePath,

    // frameworks to use
    frameworks: ['jasmine', 'phantomjs-shim'],

    // list of files to exclude
    exclude: [],

    files: [
      '../bower_components/angular-route/angular-route.js',
      '../bower_components/angular-ui-router/release/angular-ui-router.js',
      '../bower_components/jasmine-jquery/lib/jasmine-jquery',
      'bower_components/jasmine-jquery/lib/jasmine-jquery',
      {pattern: 'tests/mock/*.json', watched: true, served: true, included: false}
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    // reporters: ['progress', 'coverage', 'junit'],
    reporters: ['progress'],

    junitReporter: {
      outputDir: 'tests/results/public/junit/'
    },

    // coverage
    preprocessors: {
      // source files that you want to generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      // 'packages/**/public/controllers/**/*.js': ['coverage'],
      // 'packages/**/public/services/**/*.js': ['coverage'],
      // 'packages/**/public/directives/**/*.js': ['coverage'],

      'packages/**/public/**/*.html': ['ng-html2js']
    },

    coverageReporter: {
      type: 'html',
      dir: 'tests/results/coverage/'
    },

    ngHtml2JsPreprocessor: {
      cacheIdFromPath: function(path){
        var cacheId = path;

        //Strip packages/custom/ and public/ to match the pattern of URL that mean.io uses
        cacheId = cacheId.replace('packages/custom/', '');
        cacheId = cacheId.replace('public/', '');

        return cacheId;
      }
    },

    // web server port
    port: 9876,
    // Look for server on port 3001 (invoked by mocha) - via @brownman
    proxies: {
      '/': 'http://localhost:3001/'
    },

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    // singleRun: true
  });
};
