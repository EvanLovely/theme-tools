'use strict';

const gulp = require('gulp');

const config = {
  src: [
    'scss/**/*.scss',
  ],
  dest: 'dest/',
  sassdoc: {
    enabled: false,
  },
};
const cssTasks = require('../../sass')(config);

gulp.task('css', cssTasks.compile);
gulp.task('watch:css', cssTasks.watch);
gulp.task('clean:css', cssTasks.clean);

gulp.task('compile', gulp.series([
  cssTasks.clean,
  cssTasks.compile,
]));

gulp.task('default', gulp.series([
  cssTasks.clean,
  gulp.parallel([
    cssTasks.compile,
  ]),
  cssTasks.watch,
]));
