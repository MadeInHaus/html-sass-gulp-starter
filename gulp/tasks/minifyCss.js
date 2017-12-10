const gulp = require('gulp');
const config = require('../config').production;
const cleanCSS = require('gulp-clean-css');
const size = require('gulp-filesize');

gulp.task('minifyCss', ['sass'], () =>
    gulp
        .src(config.cssSrc)
        .pipe(cleanCSS())
        .pipe(gulp.dest(`${config.dest}/css`))
        .pipe(size())
);
