var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');

gulp.task('templates', function () {
  gulp.src('src/*.jade')
    .pipe(plumber())
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('dist/'))    
});

gulp.task('bootstrap', function() {
  gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('dist/styles'))
});

gulp.task('img', function() {
  gulp.src('src/img/**.*')
    .pipe(gulp.dest('dist/img'))
});

gulp.task('styles', function () {
  gulp.src('src/styles/main.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefixer({ browsers: ['last 3 version'] }))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({suffix: '.min'}))    
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('start', ['bootstrap', 'img', 'styles', 'templates'], function () {  

  gulp.watch('src/styles/**/*.styl', ['styles']);
  gulp.watch('src/**/*.jade', ['templates']);  
});