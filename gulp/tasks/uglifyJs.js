const gulp = require('gulp');
const config = require('../config').production;
const size = require('gulp-filesize');
const uglify = require('gulp-uglify');

gulp.task('uglifyJs', ['browserify'], () =>
    gulp
        .src(config.jsSrc)
        .pipe(uglify())
        .pipe(gulp.dest(`${config.dest}/js`))
        .pipe(size())
);
