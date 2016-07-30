'use strict';

var gulp = require('gulp');


var defaultGulp = [
  'main:html',
  'main:static',
  'main:styles',
  'main:scripts',

  'vendor:bootstrap',
  'vendor:jquery'

];

gulp.task('default', defaultGulp);
