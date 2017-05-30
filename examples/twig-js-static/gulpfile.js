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
  // 1. Clean
  twigTasks.clean,
  sassTasks.clean,
  // 2. Compile
  twigTasks.compile,
  sassTasks.compile,
  // 3. Watch
  gulp.parallel([
    sassTasks.watch,
    twigTasks.watch,
    browserSyncTasks.serve,
  ]),
]));
