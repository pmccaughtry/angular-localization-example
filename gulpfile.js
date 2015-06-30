var gulp = require('gulp'),
    karma = require('karma').server,
    protractor = require('gulp-protractor').protractor;

gulp.task('karma', function (done) {
  karma.start({
    configFile: __dirname + '/config/karma.conf.js'
  }, done);
});

gulp.task('protractor', function (done) {
  gulp.src(['tests/e2e/*_spec.js'])
    .pipe(protractor({
      configFile: 'config/protractor.conf.js'
    }))
    .on('error', function (e) {
      throw e;
    });

  done();
});