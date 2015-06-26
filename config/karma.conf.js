// Karma configuration
// Generated on Tue Oct 08 2013 15:32:03 GMT-0500 (CDT)

module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '..',

    preprocessors: {
      'app/js/controllers/*.js': 'coverage',
      'app/js/services/*.js': 'coverage',
      'app/js/directives/*.js': 'coverage',
      'app/js/filters/*.js': 'coverage'
    },

    // list of files / patterns to load in the browser
    files: [
      'lib/angular/angular.js',
      'lib/angular-resource/angular-resource.js',
      'lib/angular-route/angular-route.js',
      'lib/angular-mocks/angular-mocks.js',
      'app/js/**/*.js',
      'test/unit/**/*.spec.js'
    ],

    frameworks: ['jasmine'],

    // list of files to exclude
    exclude: [
      'app/js/*.min.js'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'coverage', 'spec'
    reporters: ['junit', 'coverage', 'spec'],

    junitReporter: {
      outputFile: 'junit-results/test-results.xml',
      suite: ''
    },

    coverageReporter: {
      type: 'cobertura', //'text-summary'
      dir: 'coverage/',
      file: 'coverage.xml'
    },


    // web server port
    port: 9876,


    // cli runner port
    runnerPort: 9100,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


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


    background: true,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,


    verbose: true,

    // enable testing across https
    proxyValidateSSL: false
  });
};
