/*
 * Notes:
 * - gulp/tasks/browserify.js handles js recompiling with watchify
 * - gulp/tasks/browserSync.js watches and reloads compiled files
 */

const gulp = require('gulp');
const watch = require('gulp-watch');
const config = require('../config');
const watchify = require('./browserify');

const sassTask = require('./sass');
const imagesTask = require('./images');
const markupTask = require('./markup');

gulp.task('watch', ['watchify', 'browserSync'], () => {
    watch(
        config.sass.src,
        {
            name: 'watch-sass',
            read: false,
        },
        sassTask
    );

    watch(
        config.images.src,
        {
            name: 'watch-images',
            read: false,
        },
        imagesTask
    );

    watch(
        config.markup.src,
        {
            name: 'watch-markup',
            read: false,
        },
        markupTask
    );

    // Watchify will watch and recompile our JS, so no need to gulp.watch it
});
