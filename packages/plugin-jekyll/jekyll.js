'use strict';

const core = require('@theme-tools/core');
const defaultConfig = require('./config.default');

module.exports = (userConfig) => {
  const config = core.utils.merge({}, defaultConfig, userConfig);

  function build(done, errorShouldExit, watchTask) {
    const cd = config.cwd ? `cd ${config.cwd} && ` : '';
    core.utils.sh(`${cd}${config.commandPrefix} build --incremental${watchTask ? ' --watch' : ''}`, errorShouldExit, (err) => {
      done(err);
    });
  }

  function jekyllBuild(done) {
    build(done, true);
  }
  jekyllBuild.description = 'Build Jekyll';

  function watch(done) {
    build(done, false, true);
  }
  watch.description = 'Watch and rebuild Jekyll.';

  return {
    build,
    watch,
  };
};
