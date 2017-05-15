'use strict';
const gulp = require('gulp');
// Default config at `node_modules/theme-core-plugin--sass/config.default.js`
const cssTasks = require('theme-core-plugin--sass')({
  src: [
    'pattern-lab/source/_scss/**/*.scss'
  ],
  dest: 'assets',
  lint: {
    enabled: false
  }
});
// Default config at `node_modules/theme-core-plugin--browser-sync/config.default.js`
const browserSyncTasks = require('theme-core-plugin--browser-sync')({
  startPath: 'pattern-lab/public'
});
// Default config at `node_modules/theme-core-plugin--pattern-lab--php/config.default.js`
const patternLabTasks = require('theme-core-plugin--pattern-lab--php')({
  configFile: 'pattern-lab/config/config.yml'
});

gulp.task('css', cssTasks.compile);
gulp.task('pl', patternLabTasks.compile);

gulp.task('compile', gulp.series([
  cssTasks.clean,
  gulp.parallel([
    'css',
    'pl'
  ])
]));

gulp.task('default', gulp.series([
  'compile',
  gulp.parallel([
    patternLabTasks.watch,
    cssTasks.watch,
    browserSyncTasks.serve
  ])
]));
