# Webpack Plugin for Theme Tools

> Theme core plugins let you easily pass in configuration and get a set of Gulp-ready task functions back that have sensible defaults and work well together.

# Getting Started

## Install

```bash
npm install @theme-tools/plugin-webpack webpack --save
```

## Configure

Create a `webpack.config.js` [config file](https://webpack.js.org/configuration/).

## Setup

Add this to your `gulpfile.js`:

```js
const gulp = require('gulp');
const webpackTasks = require('@theme-tools/plugin-webpack')(require('webpack.config.js'));

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
