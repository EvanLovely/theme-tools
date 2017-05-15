'use strict';
import gulp from 'gulp';

// Default config at `node_modules/theme-core-plugin--sass/config.default.js`
const cssTasks = require('theme-core-plugin--sass')({
  src: [
    'source/styles/*.scss'
  ],
  dest: 'public/styles',
  lint: {
    enabled: true
  },
  sassdoc: {
    enabled: true,
    dest: 'public/sassdoc'
  }
});

// Default config at `node_modules/theme-core-plugin--browser-sync/config.default.js`
const browserSyncTasks = require('theme-core-plugin--browser-sync')({
  baseDir: './public',
  port: '3000'
});

// Default config at `node_modules/theme-core-plugin--pattern-lab--php/config.default.js`
const patternLabTasks = require('theme-core-plugin--pattern-lab--php')({
  configFile: 'pattern-lab/config/config.yml'
});



gulp.task('css', cssTasks.compile);
gulp.task('css:lint', cssTasks.validate);


gulp.task('pl', patternLabTasks.compile);
gulp.task('pl:clean', patternLabTasks.cleanPl);


gulp.task('compile', gulp.series([
  cssTasks.clean,
  patternLabTasks.clean,
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
