const gulp = require('gulp');
const shell = require('../');

const textTasks = shell({
  watch: ['files/*.txt'],
  cmd: 'echo "a txt file changed"',
  name: 'text',
});

gulp.task(textTasks.run);
gulp.task(textTasks.watch);

const cssTasks = shell({
  watch: ['files/*.css'],
  cmd: 'echo "a css file changed"',
  name: 'css',
});
gulp.task(cssTasks.run);
gulp.task(cssTasks.watch);

const errorTasks = shell({
  watch: ['files/this-triggers-error.txt'],
  cmd: 'echo "the error file errored" && exit 1',
  name: 'error',
});
gulp.task(errorTasks.run);
gulp.task(errorTasks.watch);

gulp.task('run', gulp.series([
  textTasks.run,
  cssTasks.run,
  errorTasks.run,
]));

gulp.task('default', gulp.parallel([
  textTasks.watch,
  cssTasks.watch,
  errorTasks.watch,
]));
