// Include gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),

    nunjucksRender = require('gulp-nunjucks-render'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    csso = require('gulp-csso'),
    minifyHTML = require('gulp-minify-html'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),

    input = {
        'html': 'source/*.html',
        'css': 'source/assets/scss/*.scss',
        'js': 'source/assets/js/*.js',
        'vendorjs': 'public/assets/js/vendor/*.js'
    },

    output = {
        'html': 'public',
        'css': 'public/assets/css',
        'js': 'public/assets/js'
    };

gulp.task('build-html', function(){
    var opts = {
        conditionals: true,
        spare: true,
        empty: true
    }
    nunjucksRender.nunjucks.configure(['source/']);
    return gulp.src(input.html)
        .pipe(plumber())
        .pipe(nunjucksRender())
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest(output.html))
        .pipe(livereload());
});

gulp.task('build-css', function() {
    return gulp.src(input.css)
        .pipe(plumber())
        .pipe(sass({ errLogToConsole: true }))
        .pipe(autoprefixer({ cascade: true }))
        .pipe(concat('app.css'))
        .pipe(gulp.dest(output.css))
        .pipe(sourcemaps.init())
        .pipe(csso())
        .pipe(rename('app.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.css))
        .pipe(livereload());
});

gulp.task('jshint', function() {
    return gulp.src(input.js)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('build-js', function() {
    return gulp.src(input.js)
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(output.js))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.js))
        .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(input.html, ['build-html']);
    gulp.watch(input.js, ['jshint', 'build-js']);
    gulp.watch(input.css, ['build-css']);
});

// Default Task
gulp.task('default', ['build-html', 'jshint', 'build-css', 'build-js', 'watch']);
