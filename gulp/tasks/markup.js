const gulp = require('gulp');
const config = require('../config').markup;
const browserSync = require('browser-sync');

const taskDef = function() {
    return gulp
        .src(config.src)
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({ stream: true }));
};

module.exports = taskDef;

gulp.task('markup', taskDef);
