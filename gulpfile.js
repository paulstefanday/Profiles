var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');
var exec = require('child_process').exec;
var envify = require('envify/custom');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var lessBaseImport = require('gulp-less-base-import');
var uglify = require('gulp-uglify');
var dist = './public';

gulp.task('less', function() {
  return gulp.src([
      './client/styles/index.less',
      './client/directives/**/*.less',
      './client/views/**/*.less',
    ])
    .pipe(lessBaseImport('./client/styles/_variables'))
    .pipe(less())
    .pipe(minifyCss())
    .pipe(concat('index.css'))
    .pipe(gulp.dest(dist));
});

gulp.task('build', function() {
  gulp.src('./client/index.js', { read: false })
    .pipe(browserify({
      transform: ['babelify', 'jadeify', ['envify', { ENV: process.env.ENV }]],
      extensions: ['.jade']
    }))
    .pipe(ngAnnotate())
    .pipe(rename('index.js'))
    .pipe(gulp.dest(dist))
    .pipe(uglify())
    .pipe(rename('index.min.js'))
    .pipe(gulp.dest(dist))
});

gulp.task('default', ['build', 'less', 'watch']);

gulp.task('watch', function () {
  gulp.watch('./client/**/*.*', ['build', 'less']);
});

