'use strict';

const gulp = require('gulp');
const glob = require('glob');
const core = require('@theme-tools/core');
const debug = require('debug')('@theme-tools/plugin-pattern-lab-php');
const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');
const defaultConfig = require('./config.default');

module.exports = (userConfig) => {
  const config = core.utils.merge({}, defaultConfig, userConfig);

  let plConfig = yaml.safeLoad(
    fs.readFileSync(config.configFile, 'utf8')
  );
  const plRoot = path.join(config.configFile, '../..');
  const plSource = path.join(plRoot, plConfig.sourceDir);
  // const plPublic = path.join(plRoot, plConfig.publicDir);
  const consolePath = config.consolePath ? config.consolePath : path.join(plRoot, 'core/console');

  // BEGIN: Compile
  function plBuild(done, errorShouldExit) {
    core.events.emit('pattern-lab:precompile');
    // @todo add memory limit config option: `php -d memory_limit=4048M`
    core.utils.sh(`php ${consolePath} --generate`, errorShouldExit, (err) => {
      core.events.emit('reload');
      done(err);
    });
  }

  function compile(done) {
    plBuild(done, true);
  }
  compile.description = 'Compile Pattern Lab';
  compile.displayName = 'pattern-lab:compile';

  // Used by watches
  function compileWithNoExit(done) {
    plBuild(done, false);
  }
  compileWithNoExit.displayName = 'pattern-lab:compile';
  // END: Compile

  function getTwigNamespaceConfig(workingDir) {
    workingDir = workingDir || process.cwd(); // eslint-disable-line no-param-reassign
    const twigNamespaceConfig = {};
    config.twigNamespaces.sets.forEach((namespaceSet) => {
      const pathArray = namespaceSet.paths.map((pathBase) => {
        const results = glob.sync(path.join(pathBase, '**/*.twig')).map((pathItem) => { // eslint-disable-line arrow-body-style
          return path.relative(workingDir, path.dirname(pathItem));
        });
        results.unshift(path.relative(workingDir, pathBase));
        return results;
      });
      twigNamespaceConfig[namespaceSet.namespace] = {
        paths: core.utils.uniqueArray(core.utils.flattenArray(pathArray)),
      };
    });
    return twigNamespaceConfig;
  }

  function addTwigNamespaceConfigToDrupal(done) {
    if (!config.twigNamespaces.drupalThemeFile) {
      done();
    } else {
      const twigNamespaceConfig = getTwigNamespaceConfig(
        path.dirname(config.twigNamespaces.drupalThemeFile)
      );
      const drupalThemeFile = yaml.safeLoad(
        fs.readFileSync(config.twigNamespaces.drupalThemeFile, 'utf8')
      );
      Object.assign(drupalThemeFile['component-libraries'], twigNamespaceConfig);
      const newThemeFile = yaml.safeDump(drupalThemeFile);
      fs.writeFileSync(config.twigNamespaces.drupalThemeFile, newThemeFile, 'utf8');
      done();
    }
  }

  function addTwigNamespaceConfigToPl(done) {
    const twigNamespaceConfig = getTwigNamespaceConfig(plRoot);
    plConfig = yaml.safeLoad(
      fs.readFileSync(config.configFile, 'utf8')
    );
    if (!plConfig.plugins) {
      Object.assign(plConfig, {
        plugins: {
          twigNamespaces: { enabled: true, namespaces: {} },
        },
      });
    } else if (!plConfig.plugins.twigNamespaces) {
      Object.assign(plConfig.plugins, {
        twigNamespaces: { enabled: true, namespaces: {} },
      });
    } else if (!plConfig.plugins.twigNamespaces.namespaces) {
      plConfig.plugins.twigNamespaces.namespaces = {};
    }
    Object.assign(plConfig.plugins.twigNamespaces.namespaces, twigNamespaceConfig);
    const newConfigFile = yaml.safeDump(plConfig);
    fs.writeFileSync(config.configFile, newConfigFile, 'utf8');
    done();
  }

  core.events.on('pattern-lab:precompile', () => {
    if (config.twigNamespaces) {
      addTwigNamespaceConfigToPl(() => {
        addTwigNamespaceConfigToDrupal(() => {});
      });
    }
  });

  function watch() {
    const watchedExtensions = config.watchedExtensions.join(',');
    const plGlob = [path.normalize(`${plSource}/**/*.{${watchedExtensions}}`)];
    const src = config.extraWatches
      ? [].concat(plGlob, config.extraWatches)
      : plGlob;
    gulp.watch(src, compileWithNoExit).on('all', (event, changedPath) => {
      debug(`Watch saw a "${event}" at: ${changedPath}`);
    });
  }
  watch.description = 'Watch and rebuild Pattern Lab';
  watch.displayName = 'pattern-lab:watch';

  return {
    compile,
    watch,
  };
};
