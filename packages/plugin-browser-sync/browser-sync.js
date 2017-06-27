'use strict';

const core = require('@theme-tools/core');
const browserSync = require('browser-sync').create('server');
const debug = require('debug')('@theme-tools/plugin-browser-sync');
const defaultConfig = require('./config.default');

module.exports = (userConfig) => {
  const config = core.utils.merge({}, defaultConfig, userConfig);

  const options = {
    browser: config.browser,
    files: config.watchFiles || [],
    port: config.port,
    tunnel: config.tunnel,
    open: config.openBrowserAtStart,
    reloadOnRestart: true,
    reloadDelay: config.reloadDelay,
    reloadDebounce: config.reloadDebounce,
    // https://www.browsersync.io/docs/options#option-middleware
    middleware: config.middleware || [],
    // https://www.browsersync.io/docs/options#option-rewriteRules
    rewriteRules: config.rewriteRules || [],
    // placing at `</body>` instead of `<body>`
    snippetOptions: {
      rule: {
        match: /<\/body>/i,
        fn: (snippet, match) => snippet + match,
      },
    },
    notify: {
      styles: [
        'display: none',
        'padding: 15px',
        'font-family: sans-serif',
        'position: fixed',
        'font-size: 0.9em',
        'z-index: 9999',
        'bottom: 0px',
        'right: 0px',
        'border-bottom-left-radius: 5px',
        'background-color: #1B2032',
        'margin: 0',
        'color: white',
        'text-align: center',
      ],
    },
  };
  if (config.domain) {
    options.proxy = config.domain;
    options.startPath = config.startPath;
    options.serveStatic = config.serveStatic || [];
  } else {
    options.server = config.baseDir;
    options.startPath = config.startPath;
  }

  function serve() {
    return browserSync.init(options);
  }
  serve.description = 'Create a local server using BrowserSync';
  serve.displayName = 'browser-sync:serve';

  /**
   * Reload BrowserSync
   * @param {(string|string[])=} files - File paths to reload
   */
  function reload(files) {
    browserSync.reload(files);
  }
  reload.description = 'Reload BrowserSync';
  reload.displayName = 'browser-sync:reload';

  core.events.on('reload', (files) => {
    debug('Event triggered: "reload"', files);
    reload(files);
  });

  return {
    serve,
    reload,
  };
};
