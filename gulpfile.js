var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	less = require('gulp-less'),
	watch = require('gulp-watch'),
    gutil = require('gulp-util');

var javascripts_dest = './public/javascripts/';
var css_dest = './public/stylesheets/';

gulp.task('coffee', function() {
    return gulp.src('./js/*.coffee')
    .pipe(watch())
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(javascripts_dest))
});

gulp.task('scripts', function() {
    return gulp.src(['./js/*.js', './js/vendor/*.js'])
        .pipe(watch())
        .pipe(coffee())
        .pipe(gulp.dest(javascripts_dest));
});


gulp.task('less', function() {
    return gulp.src(['./public/stylesheets/bootstrap/*.less', './public/stylesheets/less/*'])
        .pipe(watch())
        .pipe(less())
        .pipe(gulp.dest(css_dest));
});
