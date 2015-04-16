// Include gulp
var gulp = require('gulp'),
    gutil = require('gulp-util')

    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    csso = require('gulp-csso'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),

    input  = {
        'css': 'source/assets/scss/*.scss',
        'js': 'source/assets/js/*.js',
        'vendorjs': 'public/assets/js/vendor/*.js'
    },

    output = {
        'css': 'public/assets/css',
        'js': 'public/assets/js'
    };

gulp.task('jshint', function() {
    return gulp.src(input.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('build-css', function() {
    return gulp.src(input.css)
        .pipe(sourcemaps.init())
        .pipe(sass({ errLogToConsole: true }))
        .pipe(autoprefixer({ cascade: true }))
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.css))
        .pipe(csso())
        .pipe(rename('app.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.css))
        .pipe(livereload());
});

gulp.task('build-js', function() {
    return gulp.src(input.js)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(output.js))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(output.js))
        .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(input.js, ['jshint', 'build-js']);
    gulp.watch(input.css, ['build-css']);
});

// Default Task
gulp.task('default', ['jshint', 'build-css', 'build-js', 'watch']);
