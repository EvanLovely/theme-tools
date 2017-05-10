# Browser Sync Plugin for Theme Core

# Getting Started

## Requirements

- Gulp 4 installed with `npm install --save gulpjs/gulp#4.0`

## Install

```bash
npm install theme-core-plugin--browser-sync --save
```

## Configure

The config that is passed in is merged with [`config.default.js`](config.default.js). We suggest starting with [`config.simple.js`](config.simple.js) to get started:

```bash
cp node_modules/theme-core-plugin--browser-sync/config.simple.js config.browser-sync.js
```

## Setup

Add this to your `gulpfile.js`:

```js
const config = {};
config.browserSync = require('./config.browser-sync.js');
const browserSyncTasks = require('theme-core-plugin--browser-sync')(config.browserSync);

gulp.task('serve', browserSyncTasks.serve);
```

# Tasks

These tasks are methods inside `browserSyncTasks` from the above code example. You can run them anyway you can run a function, though they are often ran via Gulp.

## `browserSyncTasks.serve` - Create server

Create server using [Browser Sync](https://www.browsersync.io/).

## `browserSyncTasks.reload` - Reload the page

Probably not needed. Wraps [`.reload()`](https://www.browsersync.io/docs/api#api-reload) so you can just fire it or pass in a string or array of strings of paths of files to reload which can allow CSS files to get injected.
