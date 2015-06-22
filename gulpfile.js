var gulp = require('gulp'),
	mocha = require('gulp-mocha'),
 	exit = require('gulp-exit');

gulp.task('test-once', function(){
  gulp.src(['tests/*.js'])
    .pipe(mocha({
      reporter: 'spec',
      timeout: 100000
    }))
    .pipe(exit());
});