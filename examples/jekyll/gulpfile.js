'use strict';

const gulp = require('gulp');
// Default config at `node_modules/@theme-tools/plugin-browser-sync/config.default.js`
const browserSyncTasks = require('@theme-tools/plugin-browser-sync')({
  baseDir: 'src/_site',
  watchFiles: ['src/_site']
});
// Default config at `node_modules/@theme-tools/plugin-pattern-lab-php/config.default.js`
const jekyllTasks = require('@theme-tools/plugin-jekyll')({
  cwd: 'src',
  watch: [
    'src/**',
    '!src/_site/**',
    '!src/.sass-cache/**',
  ]
});

gulp.task('jekyll', jekyllTasks.build);
gulp.task('watch:jekyll', jekyllTasks.watch);

gulp.task('default', gulp.series([
  jekyllTasks.build,
  gulp.parallel([
    jekyllTasks.watch,
    browserSyncTasks.serve,
  ]),
]));
