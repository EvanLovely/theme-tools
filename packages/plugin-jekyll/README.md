# Jekyll Plugin for Theme Tools

> Theme core plugins let you easily pass in configuration and get a set of Gulp-ready task functions back that have sensible defaults and work well together.

# Getting Started

## Install

```bash
npm install @theme-tools/plugin-jekyll --save
```

## Configure

The config that is passed in is merged with [`config.default.js`](config.default.js).

```bash
cp node_modules/@theme-tools/plugin-jekyll/config.default.js config.jekyll.js
```

## Setup

Add this to your `gulpfile.js`:

```js
const gulp = require('gulp');
const config = {};
config.jekyll = require('./config.jekyll.js');
const jekyllTasks = require('@theme-tools/plugin-jekyll')(config.jekyll);

gulp.task('jekyll', jekyll.build);
gulp.task('watch:jekyll', jekyll.watch);
```

# Details

## Tasks

These tasks are methods inside `jekyllTasks` from the above code example. You can run them anyway you can run a function, though they are often ran via Gulp. All tasks take a callback function as the first and only parameter that will run when the task is done - exactly how `gulp.task()`, `gulp.parallel()`, and `gulp.series()` want.

### `jekyllTasks.build()` - Build Jekyll

Builds Jekyll.

### `jekyllTasks.watch()` - Watch Jekyll

Watch and rebuild Jekyll incrementally.

## Configuration

**All configuration is deep merged with [`config.default.js`](config.default.js).**

### `cwd`

Type: `String` Default: `./`

Path to where the build command should be ran. Probably same directory as `Gemfile`.

### `commandPrefix`

Type: `String` Default: `bundle exec jekyll`

You could use `jekyll` if you have it globally installed or an absolute path if you're having other issues.
