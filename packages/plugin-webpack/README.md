# Jekyll Plugin for Theme Tools

> Theme core plugins let you easily pass in configuration and get a set of Gulp-ready task functions back that have sensible defaults and work well together.

# Getting Started

## Install

```bash
npm install @theme-tools/plugin-webpack --save
```

## Configure

The config that is passed in is merged with [`config.default.js`](config.default.js).

```bash
cp node_modules/@theme-tools/plugin-webpack/config.default.js config.webpack.js
```

## Setup

Add this to your `gulpfile.js`:

```js
const gulp = require('gulp');
const config = {};
config.webpack = require('./config.webpack.js');
const webpackTasks = require('@theme-tools/plugin-webpack')(config.webpack);

gulp.task('webpack', webpack.compile);
gulp.task('watch:webpack', webpack.watch);
```

# Details

## Tasks

These tasks are methods inside `webpackTasks` from the above code example. You can run them anyway you can run a function, though they are often ran via Gulp. All tasks take a callback function as the first and only parameter that will run when the task is done - exactly how `gulp.task()`, `gulp.parallel()`, and `gulp.series()` want.

### `webpackTasks.compile()` - Compile Webpack

Compile Webpack.

### `webpackTasks.watch()` - Watch Webpack

Watch and recompile Webpack incrementally.

## Configuration

The configuration passed in is the [contents of `webpack.config.js`](https://webpack.js.org/configuration/).
