'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var istanbul = require('gulp-istanbul');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var debug = require('gulp-debug');

var handleErr = function (err) {
  console.log(err.message);
  process.exit(1);
};

gulp.task('static', function () {
  return gulp.src([
    'lib/**/*.js',
    'test/**/*.js',
    'gulpfile.js'
  ])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(jscs())
    .on('error', handleErr);
});

gulp.task('pre-test', function () {
  //return gulp.src('lib/**/*.js')
  //  .pipe(babel())
  //  .pipe(istanbul({includeUntested: true}))
  //  .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
  var mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec', require: ['babel/register']}))
    .on('error', function (err) {
      mochaErr = err;
    })
    //.pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
});

var path = require('path');

gulp.task('babel', function () {
  return gulp.src('lib/**/*.js')
    .pipe(plumber())
    .pipe(watch('lib/**/*.js', {ignoreInitial: false}))
    .pipe(debug({title: 'babel:'}))
    .pipe(sourcemaps.init())
      .pipe(babel({optional: ["es7.comprehensions"]}))
    .pipe(sourcemaps.write('../maps', {
      includeContent: false,
      sourceRoot: function (file) {
        return path.join(path.relative(path.dirname(file.path), file.base), '..', 'lib');
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['static', 'test']);

