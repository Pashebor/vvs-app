'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'gulp-csso';


var paths = {
    stylesToWatch: 'assets/sass/*',
    style: 'assets/sass/style.scss'
};


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


gulp.task('watch', function() {
    gulp.watch(paths.stylesToWatch, ['sass']);
});

gulp.task('sass_to_css', ['sass', 'watch']);
