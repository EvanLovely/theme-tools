'use strict';
const gulp = require('gulp');
// Default config at `node_modules/@theme-tools/plugin-sass/config.default.js`
const cssTasks = require('@theme-tools/plugin-sass')({
  src: [
    'pattern-lab/source/_scss/**/*.scss'
  ],
  dest: 'assets',
  lint: {
    enabled: false
  }
});
// Default config at `node_modules/@theme-tools/plugin-browser-sync/config.default.js`
const browserSyncTasks = require('@theme-tools/plugin-browser-sync')({
  startPath: 'pattern-lab/public'
});
// Default config at `node_modules/@theme-tools/plugin-pattern-lab-php/config.default.js`
const patternLabTasks = require('@theme-tools/plugin-pattern-lab-php')({
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
