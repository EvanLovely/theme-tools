'use strict';

const gulp = require('gulp');
const core = require('@theme-tools/core');
const defaultConfig = require('./config.default');

// const htmlhint = require('gulp-htmlhint');
// const data = require('gulp-data');
// const del = require('del');
// const path = require('path');
// const join = require('path').join;
const twig = require('gulp-twig');
const gulpif = require('gulp-if');

module.exports = (userConfig) => {
  const config = core.utils.merge({}, defaultConfig, userConfig);
  const tasks = {};

  /**
   * Compiles html templates with twig.js
   * '.twig' and '.html' files listed in config.sources are piped through twig
   * data can be match for each template by matching the file with '*.data.json' file
   * for example: 'index.twig' and 'index.data.json'
   * Adds 'compile:html' to tasks.compile
   * @param done
   */
  function compileHtml(done) {
    return gulp.src(config.sources)
            .pipe(gulpif(config.twig.enabled, twig({
              base: config.twig.baseDir,
            })))
            .pipe(gulp.dest(config.dest))
            .on('end', () => { done(); });
  }
  compileHtml.description = 'Move html from source to build and run Swig if enabled';
  // gulp.task('compile:html', done => compileHtml(done));
  // tasks.compile.push('compile:html');
  tasks.compile = compileHtml;
  //
  // /**
  //  * Runs runs basic validator on html
  //  * Adds 'validate:html' to tasks.validate
  //  */
  // function validateHtml(done) {
  //   return gulp.src(config.dest + 'index.html')
  //           .pipe(htmlhint({
  //             "alt-require": true,
  //           }))
  //           .pipe(htmlhint.reporter('htmlhint-stylish'))
  //           .on('end', () => done() );
  // };
  // validateHtml.description = 'Lint Html';
  // gulp.task('validate:html', validateHtml);
  // if (config.lint) {
  //   tasks.validate.push('validate:html');
  // }
  //
  // /**
  //  * Removes *.css and *.css.map from the the dest
  //  * Adds 'clean:css' to tasks.clean
  //  * @param done
  //  */
  // function cleanHtml(done) {
  //   del(
  //       [
  //         join(config.dest, '*.html'),
  //       ],
  //       { force: true }
  //   )
  //       .then(() => { done(); });
  // }
  // cleanHtml.description = 'Clean built html';
  // gulp.task('clean:html', cleanHtml);
  // tasks.clean.push('clean:html');
  //
  //
  // /**
  //  * Create gulp watch for twig.js templates
  //  * On file change, triggers the following tasks
  //  * 1. 'compile:html'
  //  * 2. 'validate:html' if enabled
  //  * Adds 'watch:html' to tasks.watch
  //  */
  // function watchHtml() {
  //   const watchDirectories = config.sources;
  //   if (config.twig.enabled) {
  //     watchDirectories.push(config.twig.baseDir + '**/*.twig');
  //   }
  //   return gulp.watch(watchDirectories, gulp.series('compile:html', 'validate:html'));
  // }
  // watchHtml.description = 'Watch Html';
  // gulp.task('watch:html', watchHtml);
  // tasks.watch.push('watch:html');

  return tasks;
};
