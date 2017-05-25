'use strict';

const gulp = require('gulp');
const browserSyncTasks = require('@theme-tools/plugin-browser-sync')({
  baseDir: 'build',
  watchFiles: ['build/*']
});
const sassTasks = require('@theme-tools/plugin-sass')({
  src: [
      'src/*.scss'
  ],
  dest: 'build'
});
const twigTasks = require('@theme-tools/plugin-twig-js')({
  sources: [
    'src/a.twig'
  ]
});

gulp.task('twig', twigTasks.compile);
gulp.task('sass', sassTasks.compile);

gulp.task('default', gulp.series([
  sassTasks.compile,
  twigTasks.compile,
  gulp.parallel([
    sassTasks.watch,
    browserSyncTasks.serve,
  ]),
]));
