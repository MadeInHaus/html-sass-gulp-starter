const gulp = require('gulp');
const config = require('../config').assets;
const browserSync = require('browser-sync');

gulp.task('assets', () =>
    gulp
        .src(config.src)
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({ stream: true }))
);
