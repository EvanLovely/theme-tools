'use strict';

const webpack = require('webpack'); // eslint-disable-line import/no-unresolved
const webpackMildCompile = require('webpack-mild-compile');
const core = require('@theme-tools/core');
const defaultConfig = require('./config.default');
const debug = require('debug')('@theme-tools/plugin-webpack');

module.exports = (userConfig) => {
  const config = core.utils.merge({}, defaultConfig, userConfig);

  // Config options - https://webpack.js.org/configuration/
  if (!config.plugins) config.plugins = [];
  if (typeof config.devtool === 'undefined') config.devtool = 'cheap-module-source-map';

  function compile(done) {
    if (process.env.NODE_ENV === 'production') {
      debug('Production var is true. Compressing more.');
      // https://webpack.js.org/guides/production-build/#node-environment-variable
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        })
      );

      // Uglify - https://webpack.js.org/guides/production-build/#minification
      config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: config.devtool,
        })
      );
    }
    debug('Final config that is about to be passed to webpack:');
    debug(config);
    webpack(config).run((err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        done(err);
      }

      // Stats config options: https://webpack.js.org/configuration/stats/
      console.log(stats.toString({
        chunks: false,  // Makes the build much quieter
        colors: true,   // Shows colors in the console
        modules: false, // Hides built modules making output less verbose
      }));

      done(stats.hasErrors() ? core.utils.error('Webpack Compile Failed.') : null);
    });
  }

  compile.description = 'Compile Webpack';
  compile.displayName = 'webpack:compile';

  function watch(done) {
    config.plugins.push(
      new webpack.LoaderOptionsPlugin({
        debug: true,
      })
    );

    // This fixes an issue where WebPack will constantly re-trigger watches for 10s
    // if the file was changed right before watch was started.
    // https://github.com/webpack/watchpack/issues/25
    const compiler = webpack(config);
    webpackMildCompile(compiler);

    compiler.watch({
      // https://webpack.js.org/configuration/watch/#watchoptions
      aggregateTimeout: 300,
    }, (err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        done(err);
      }

      // Stats config options: https://webpack.js.org/configuration/stats/
      console.log(stats.toString({
        chunks: false,  // Makes the build much quieter
        colors: true,   // Shows colors in the console
        modules: false, // Hides built modules making output less verbose
        version: false,
      }));

      core.events.emit('reload');
    });
  }

  watch.description = 'Watch & fast re-compile Webpack';
  watch.displayName = 'webpack:watch';

  return {
    compile,
    watch,
  };
};
