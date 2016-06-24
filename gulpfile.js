var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var rename = require("gulp-rename");

gulp.task('js', function(){
   gulp.src('public/js/jquery/dist/jquery.js')
   .pipe(concat('public/js/bootstrap/dist/js/bootstrap.js'))
   .pipe(concat('public/js/angular/angular.js'))
   .pipe(concat('public/js/angular-animate/angular-animate.js'))
   .pipe(concat('public/js/angular-bootstrap/ui-bootstrap.js'))
   .pipe(concat('public/js/angular-bootstrap/ui-bootstrap-tpls.js'))
   .pipe(concat('public/js/moment/min/moment.js'))
   .pipe(concat('public/js/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.js'))
   .pipe(uglify())
   .pipe(rename("build.js"))
   .pipe(gulp.dest('public/build/js'));
});

gulp.task('css', function(){
   gulp.src('public/startbootstrap-freelancer-1.0.5/css/bootstrap.css')
   .pipe(concat('public/js/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'))
   .pipe(concat('public/js/angular-bootstrap/ui-bootstrap-csp.css'))
   .pipe(concat('public/startbootstrap-freelancer-1.0.5/css/freelancer.css'))
   .pipe(concat('public/startbootstrap-freelancer-1.0.5/font-awesome/css/font-awesome.css'))
   .pipe(minify())
   .pipe(rename('build.css'))
   .pipe(gulp.dest('public/build/css'));
});

gulp.task('copyfonts', function() {
   gulp.src('public/js/bootstrap/fonts/*.{ttf,woff,eof,svg}')
   .pipe(gulp.dest('public/build/fonts'));
   gulp.src('public/startbootstrap-freelancer-1.0.5/font-awesome/fonts/*.{ttf,woff,eof,svg}')
   .pipe(gulp.dest('public/build/fonts'));
});

gulp.task('default',['js','css'],function(){
});
