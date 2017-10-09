'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'gulp-csso';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';


var paths = {
    loginWatch: 'assets/src/*.js',
    login: 'assets/src/init.js',
    stylesToWatch: 'assets/sass/*',
    style: 'assets/sass/style.scss'
};

gulp.task('login-js', () => {
    browserify(paths.login)
        .transform(babelify)
        .bundle()
        .pipe(source('login.js'))
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('sass', function() {
    var plugins = [
        autoprefixer({browsers: ['last 1 version']})
    ];
    return gulp.src(paths.style)
        .pipe(sass())
        .pipe(postcss(plugins))
        .pipe(csso({
            restructure: true,
            sourceMap: false,
            debug: true
        }))
        .pipe(gulp.dest('./'));
});


gulp.task('watch', () => {
    gulp.watch(paths.stylesToWatch, ['sass']);
});

gulp.task('watch-js', () => {
    gulp.watch(paths.loginWatch, ['login-js']);
});

gulp.task('sass_to_css', ['sass', 'watch']);
gulp.task('login', ['login-js', 'watch-js']);
