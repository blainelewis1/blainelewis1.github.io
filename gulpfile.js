var gulp = require('gulp');
var debug = require('gulp-debug');
var imagemin = require('gulp-imagemin');
var inline = require('gulp-inline');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var jsonMinify = require('gulp-json-minify');
var htmlmin = require('gulp-htmlmin');

//TODO: minify images, minify/inline css and JS, maybe change angular to a require include sourcemaps if at all possilbe
//TODO: minify and move json too.

//npm i gulp-htmlmin --save-dev
//npm install --save-dev gulp-minify-inline
//npm install gulp-inline

// gulp.src('src/favicon/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('/'));

gulp.task('default', function() {
    gulp.start('minify-html', 'minify-images', 'minify-json');
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.json', ['minify-json']);
    gulp.watch('src/**', ['minify-html']);
    gulp.watch('src/images/**', ['minify-images']);
});

gulp.task('minify-html', function() {
    gulp.src('src/*.html')
      .pipe(inline({
        base: '/src',
        js: uglify,
        css: cleanCss,
        disabledTypes: ['svg', 'img'], // Only inline css and js files
        ignore: []
      }))
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('.'));
});

gulp.task('minify-images', function() {
    gulp.src('src/images/**')
        .pipe(imagemin())
        .pipe(gulp.dest('images'));
});

gulp.task('minify-json', function() {
    gulp.src('src/resources/*')
        .pipe(jsonMinify())
        .pipe(gulp.dest('resources'));
});
