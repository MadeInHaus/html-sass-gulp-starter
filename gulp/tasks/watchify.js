const gulp = require('gulp');
const browserifyTask = require('./browserify');

gulp.task('watchify', callback => {
    // Start browserify task with devMode === true
    browserifyTask(callback, true);
});
