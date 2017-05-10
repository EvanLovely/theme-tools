# Browser Sync Plugin for Theme Core

# Requirements

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
