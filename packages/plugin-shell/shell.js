'use strict';

const core = require('@theme-tools/core');
const gulp = require('gulp');
const defaultConfig = require('./config.default');

module.exports = (userConfig) => {
  const config = core.utils.merge({}, defaultConfig, userConfig);

  /**
   * Run shell
   * @param done
   * @param errorShouldExit {Boolean} [false] - Should it stop the script if an error happens?
   */
  function runner(done, errorShouldExit) {
    core.utils.sh(config.cmd, errorShouldExit, (err) => {
      if (config.triggerBrowserReloadAfter) {
        core.events.emit('reload'); // used by `@theme-tools/plugin-browser-sync`
      }
      done(err);
    });
  }

  function run(done) {
    runner(done, true);
  }
  run.description = `Run shell command: ${config.cmd}`;
  run.displayName = `${config.name}:run`;

  function watch(done) {
    gulp.watch(config.watch, () => runner(done, false));
  }
  watch.description = `Watch and rerun ${config.name}.`;
  watch.displayName = `${config.name}:watch`;

  return {
    run,
    watch,
  };
};
