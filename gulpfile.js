/**
 * Webpack is used instead of Gulp
*/

var gulp = require('gulp');
var browserSync  = require('browser-sync').create();
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var concatJs = require('gulp-concat');

gulp.task('sass', function() {
    return gulp.src('src/style/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss("style.css"))
        .pipe(rename({suffix: ".min"}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
});

gulp.task('copy-html', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
});

gulp.task('script', function(){
    return gulp.src('build/*.js', { sourcemaps: true })
        .pipe(babel())
        .pipe(uglify())
        .pipe(concatJs('main.min.js'))
        .pipe(gulp.dest('build/'));
});

gulp.task('serve', gulp.series('sass', function() {
    browserSync.init({
        server:'./build/',
        open: true,
        host: 'localhost',
        port: 9000,
        livereload: true
    });
    gulp.watch('src/style/*.scss').on('change', browserSync.reload);
    gulp.watch('*.html').on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('script','copy-html','serve'));
