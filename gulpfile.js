var gulp = require('gulp'),
    karma = require('karma').server,
    protractor = require('gulp-protractor').protractor,
	webdriver_standalone = require('gulp-protractor').webdriver_standalone,
	webdriver_update = require('gulp-protractor').webdriver_update;

gulp.task('karma', function (done) {
  karma.start({
    configFile: __dirname + '/config/karma.conf.js'
  }, done);
});

// Downloads the selenium webdriver
// Make sure to update /config/protractor.conf.js with path to selenium.jar
gulp.task('webdriver_update', webdriver_update);

// Start the standalone selenium server
// NOTE: This is not needed if you reference the
// seleniumServerJar in your protractor.conf.js
gulp.task('webdriver_standalone', webdriver_standalone);

gulp.task('protractor', ['webdriver_update'], function (done) {
  gulp.src(['tests/e2e/*_spec.js'])
    .pipe(protractor({
      configFile: 'config/protractor.conf.js'
    }))
    .on('error', function (e) {
      throw e;
    });

  done();
});
