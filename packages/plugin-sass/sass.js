'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const stylelint = require('gulp-stylelint');
const postcss = require('gulp-postcss');
const cached = require('gulp-cached');
const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const flatten = require('gulp-flatten');
const gulpif = require('gulp-if');
const sassdoc = require('sassdoc');
const path = require('path');
const del = require('del');
const debug = require('debug')('@theme-tools/plugin-sass');
const core = require('@theme-tools/core');
const sassExportData = require('@theme-tools/sass-export-data');
const sassImportGlobbing = require('@theme-tools/sass-import-globbing');
const defaultConfig = require('./config.default');

const join = path.join;

module.exports = (userConfig) => {
  const config = core.utils.merge({}, defaultConfig, userConfig);
  const buildBase = core.settings.get().buildBase;
  debug('Begin Config post merge');
  debug(config);
  debug('End Config');
  const tasks = {};

  if (config.exportData.enabled) {
    Object.assign(config.functions, sassExportData(config.exportData));
  }

  config.importers.push(sassImportGlobbing);

  function cssCompile(done, errorShouldExit) {
    debug('Compile triggered');
    gulp.src(config.src)
        .pipe(plumber({
          errorHandler(error) {
            notify.onError({
              title: 'CSS <%= error.name %> - Line <%= error.line %>',
              message: '<%= error.message %>',
            })(error);
            if (errorShouldExit) process.exit(1);
            this.emit('end');
          },
        }))
        .pipe(sourcemaps.init({
          debug: config.debug,
        }))
        .pipe(sass({
          outputStyle: config.outputStyle,
          sourceComments: config.sourceComments,
          includePaths: config.includePaths,
          functions: config.functions,
          importer: config.importers,
        }).on('error', sass.logError))
        .pipe(postcss(
          [
            autoprefixer({
              browsers: config.autoPrefixerBrowsers,
            }),
          ]
        ))
        .pipe(sourcemaps.write((config.sourceMapEmbed) ? null : './'))
        .pipe(gulpif(config.flattenDestOutput, flatten()))
        .pipe(gulp.dest(join(buildBase, config.dest)))
        .on('end', () => {
          core.events.emit('reload', join(config.dest, '**/*.css'));
          done();
        });
  }

  function compile(done) {
    cssCompile(done, true);
  }

  compile.description = 'Compile Scss to CSS using Libsass with Autoprefixer and SourceMaps';
  compile.displayName = 'sass:compile';

  tasks.compile = compile;

  function clean(done) {
    debug('clean triggered');
    del([
      join(config.dest, '*.{css,css.map}'),
      config.sassdoc.dest,
    ], { force: true }).then(() => done());
  }

  clean.description = 'Clean compiled CSS';
  clean.displayName = 'sass:clean';

  tasks.clean = clean;

  function validateCss(errorShouldExit) {
    debug('validate triggered');
    return gulp.src(config.src)
        .pipe(cached('validate:css'))
        .pipe(stylelint({
          failAfterError: errorShouldExit,
          reporters: [
            { formatter: 'string', console: true },
          ],
        }));
  }

  function validateCssWithNoExit() {
    return validateCss(false);
  }

  function validate() {
    return validateCss(true);
  }

  validate.description = 'Lint Scss files';
  validate.displayName = 'sass:validate';

  if (config.lint.enabled) tasks.validate = validate;

  function docs(done) {
    debug('docs triggered');
    gulp.src(config.src)
        .pipe(sassdoc({
          dest: config.sassdoc.dest,
          verbose: config.sassdoc.verbose,
          basePath: config.sassdoc.basePath,
          exclude: config.sassdoc.exclude,
          theme: config.sassdoc.theme,
          sort: config.sassdoc.sort,
        }))
        .on('end', done);
  }

  docs.description = 'Build CSS docs using SassDoc';
  docs.displayName = 'sass:docs';

  if (config.sassdoc.enabled) tasks.docs = docs;

  function watch() {
    debug('watch triggered');
    const watchTasks = [cssCompile];
    if (config.lint.enabled && config.lint.onWatch) {
      watchTasks.push(validateCssWithNoExit);
    }
    if (config.sassdoc.enabled) {
      watchTasks.push(docs);
    }
    const src = config.extraWatches
        ? [].concat(config.src, config.extraWatches)
        : config.src;
    return gulp.watch(src, gulp.parallel(watchTasks));
  }

  watch.description = 'Watch Scss';
  watch.displayName = 'sass:watch';

  tasks.watch = watch;

  return tasks;
};
