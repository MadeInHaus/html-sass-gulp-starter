const gulp = require('gulp');
const config = require('../config').production;
const size = require('gulp-filesize');
const terser = require('gulp-terser');

gulp.task('uglifyJs', ['browserify'], () =>
    gulp
        .src(config.jsSrc)
        .pipe(terser())
        .pipe(gulp.dest(`${config.dest}/js`))
        .pipe(size())
);
