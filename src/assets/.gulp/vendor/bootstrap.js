'use strict';


var gulp = require('gulp');


var sass = require('gulp-sass');

var sourcemaps = require('gulp-sourcemaps');

var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var rename = require('gulp-rename');

var browserSync = require('browser-sync');

var onError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('vendor:bootstrap:styles', function() {

  return gulp.src('src/assets/styles/vendor/bootstrap/index.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: ['src/assets/vendor/bootstrap-sass/assets/stylesheets']
    }))
    .pipe(rename('bootstrap.css'))
    .pipe(autoprefixer('last 2 version', 'iOS 8'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(minify({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});



gulp.task('vendor:bootstrap:fonts', function() {
  return gulp.src('src/assets/vendor/bootstrap-sass/assets/fonts/bootstrap/**/*')
    .pipe(gulp.dest('dist/assets/fonts'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('vendor:bootstrap:scripts', function() {

  var bootstrapJsModules = [
    'src/assets/vendor/bootstrap-sass/assets/javascripts/bootstrap/affix.js',
    'src/assets/vendor/bootstrap-sass/assets/javascripts/bootstrap/alert.js',
    'src/assets/vendor/bootstrap-sass/assets/javascripts/bootstrap/button.js',
    'src/assets/vendor/bootstrap-sass/assets/javascripts/bootstrap/carousel.js',
    'src/assets/vendor/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
    'src/assets/vendor/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
    'src/assets/vendor/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
    'src/assets/vendor/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
    'src/assets/vendor/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js',
    'src/assets/vendor/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
    'src/assets/vendor/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
    'src/assets/vendor/bootstrap-sass/assets/javascripts/bootstrap/popover.js',
  ];


  return gulp.src(bootstrapJsModules)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('bootstrap.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('vendor:bootstrap', ['vendor:bootstrap:styles',
  'vendor:bootstrap:scripts',
  'vendor:bootstrap:fonts'
]);
