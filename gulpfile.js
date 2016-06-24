var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var rename = require("gulp-rename");
var cachebust = require('gulp-cache-bust');

gulp.task('js', function(){
   gulp.src(['./public/js/jquery/dist/jquery.js', './public/js/bootstrap/dist/js/bootstrap.js', './public/js/angular/angular.js',
   './public/js/angular-animate/angular-animate.js','./public/js/angular-bootstrap/ui-bootstrap.js','./public/js/angular-bootstrap/ui-bootstrap-tpls.js',
   './public/js/moment/min/moment.min.js','./public/js/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js'
 ])
  .pipe(concat('build.js', {newLine: ';'}))
  .pipe(uglify())
  .pipe(cachebust({
    type: 'timestamp'
  }))
  .pipe(gulp.dest('./public/build/js'));
});

gulp.task('css', function(){
   gulp.src(['./public/startbootstrap-freelancer-1.0.5/css/bootstrap.css', './public/js/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css',
 './public/js/angular-bootstrap/ui-bootstrap-csp.css', './public/startbootstrap-freelancer-1.0.5/css/freelancer.css', './public/startbootstrap-freelancer-1.0.5/font-awesome/css/font-awesome.css'])
   .pipe(concat('build.css', {newLine: ';'}))
   .pipe(minify())
   .pipe(gulp.dest('./public/build/css'));
});

gulp.task('copyfonts', function() {
   gulp.src('./public/js/bootstrap/fonts/*.{ttf,woff,woff2,eof,svg}')
   .pipe(gulp.dest('./public/build/fonts'));
   gulp.src('./public/startbootstrap-freelancer-1.0.5/font-awesome/fonts/*.{ttf,woff,woff2,eof,svg}')
   .pipe(gulp.dest('./public/build/fonts'));
});

gulp.task('default',['js','css', 'copyfonts'],function(){
});
