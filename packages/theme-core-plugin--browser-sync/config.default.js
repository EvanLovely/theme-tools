module.exports = {
  port: 3050,
  watchFiles: [],
  // enable when full CMS is set up
  // domain: 'mysite.dev',
  baseDir: './',
  startPath: './',
  openBrowserAtStart: false,
  // requires above to be true; allows non-default browser to open
  browser: [
    'Google Chrome',
  ],
  // Tunnel the Browsersync server through a random Public URL
  // -> http://randomstring23232.localtunnel.me
  tunnel: false,
  reloadDelay: 50,
  reloadDebounce: 750,
};
