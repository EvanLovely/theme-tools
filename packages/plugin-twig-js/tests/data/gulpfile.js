'use strict';

const gulp = require('gulp');

const config = {
  sources: [
    'src/a.twig',
  ],
  dest: 'build/',
  dataSources: [
    'src/data.json',
    'src/extra.json',
  ],
};
const twigTasks = require('../../twig')(config);

gulp.task('twig', twigTasks.compile);
gulp.task('watch', twigTasks.watch);
// gulp.task('clean:css', cssTasks.clean);

gulp.task('compile', gulp.series([
  twigTasks.compile,
]));
//
// gulp.task('default', gulp.series([
//   cssTasks.clean,
//   gulp.parallel([
//     cssTasks.compile,
//   ]),
//   cssTasks.watch,
// ]));
