# Browser Sync Plugin for Theme Tools

> Theme core plugins let you easily pass in configuration and get a set of Gulp-ready task functions back that have sensible defaults and work well together.

# Getting Started

## Requirements

- Gulp 4 installed with `npm install --save gulpjs/gulp#4.0`

## Install

```bash
npm install @theme-tools/plugin-browser-sync --save
```

## Configure

The config that is passed in is merged with [`config.default.js`](config.default.js). We suggest starting with [`config.simple.js`](config.simple.js) to get started:

```bash
cp node_modules/@theme-tools/plugin-browser-sync/config.simple.js config.browser-sync.js
```

## Setup

Add this to your `gulpfile.js`:

```js
const gulp = require('gulp');
const config = {};
config.browserSync = require('./config.browser-sync.js');
const browserSyncTasks = require('@theme-tools/plugin-browser-sync')(config.browserSync);

gulp.task('serve', browserSyncTasks.serve);
```

# Details

## Tasks

These tasks are methods inside `browserSyncTasks` from the above code example. You can run them anyway you can run a function, though they are often ran via Gulp. All tasks take a callback function as the first and only parameter that will run when the task is done - exactly how `gulp.task()`, `gulp.parallel()`, and `gulp.series()` want.

### `browserSyncTasks.serve()` - Create server

Create server using [Browser Sync](https://www.browsersync.io/).

### `browserSyncTasks.reload()` - Reload the page

Probably not needed. Wraps [`.reload()`](https://www.browsersync.io/docs/api#api-reload) so you can just fire it or pass in a string or array of strings of paths of files to reload which can allow CSS files to get injected.

## Configuration

**All configuration is deep merged with [`config.default.js`](config.default.js).**

### `baseDir`

Type: `Object | String | Boolean` Default: `./`

Where to serve static files from. Disabled when `domain` is set. Passed to [`browser-sync`'s `server`](https://browsersync.io/docs/options#option-server) where lots of extra config info can be found.

### `domain`

Type: `String` Default: `null`

If you have local hosting already going and you want to use BrowserSync's [`proxy`](https://browsersync.io/docs/options#option-proxy), then set your local domain here (ie `mysite.dev`). Having this set disables the static server. Passed to [`browser-sync`'s `proxy`](https://browsersync.io/docs/options#option-proxy).

### `startPath`

Type: `String` Default: `''`

The path shown when the URLs are shown in the Terminal. If you have Pattern Lab going, it's nice to have `pattern-lab/public` set.

### `watchFiles`

Type: `Array<String>` Default: `[]`

Files to watch that will trigger a reload; css files will try to be injected (as long as they are brought using `<link>` and not `<style>@import</style>`). Passed to [`browser-sync`'s `files`](https://browsersync.io/docs/options#option-files).

### `openBrowserAtStart`

Type: `Boolean` Default: `false`

If the browser(s) should open at the start.

### `browsers`

Type: `Array<String>` Default: `[ 'Google Chrome' ]`

If `openBrowserAtStart`, then which browsers to open.

### `tunnel`

Type: `Boolean` Default: `false`

Tunnel the Browsersync server through a random Public URL like -> `http://randomstring23232.localtunnel.me`. Great for showing to other people remotely or testing sites on Browser Stack. Passed to [`browser-sync`'s `tunnel`](https://browsersync.io/docs/options#option-tunnel).

### `port`

Type: `Number` Default: `3050`

The port to use (i.e. `http://localhost:3050`). If the port is taken, it will increment by one and use that port so you can have multiple instances running if needed.

### `reloadDelay`

Type: `Number` Default: `50`

How long to wait, in milliseconds, between file change and reload.

### `reloadDebounce`

Type: `Number` Default: `750`

Wait for a specified window of event-silence before sending any reload events. Passed to [`browser-sync`'s `reloadDebounce`](https://browsersync.io/docs/options#option-reloadDebounce).

## Theme Core Events

This is only info for other Theme Core plugin developers.

### on `'reload'`

When a `'reload'` event is emmitted, Browser Sync fires the `reload()` method.

#### `files`

Type: `String | Array<String>` Default: `[]`

Files to reload/inject.
