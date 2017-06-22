'use strict';

const core = require('@theme-tools/core');
const defaultConfig = require('./config.default');

module.exports = (userConfig) => {
  const config = core.utils.merge({}, defaultConfig, userConfig);

  /**
   * Build Jekyll
   * @param done
   * @param errorShouldExit {Boolean} [false] - Should it stop the script if an error happens?
   * @param watchTask {Boolean} [false] - Is this a watch task?
   */
  function build(done, errorShouldExit, watchTask) {
    const cd = config.cwd ? `cd ${config.cwd} && ` : '';
    core.utils.sh(`${cd}${config.commandPrefix} build --incremental${watchTask ? ' --watch' : ''}`, errorShouldExit, (err) => {
      done(err);
    });
  }

  function jekyllBuild(done) {
    build(done, true, false);
  }
  jekyllBuild.description = 'Build Jekyll';
  jekyllBuild.displayName = 'jekyll:build';

  function watch(done) {
    build(done, false, true);
  }
  watch.description = 'Watch and rebuild Jekyll.';
  watch.displayName = 'jekyll:watch';

  return {
    build,
    watch,
  };
};
