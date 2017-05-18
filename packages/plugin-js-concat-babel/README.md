# JS (Concat, Babel) Plugin for Theme Tools

> Theme core plugins let you easily pass in configuration and get a set of Gulp-ready task functions back that have sensible defaults and work well together.

## Features

- Concatenate multiple JS files into a single file
- Run through Babel so you can use ES6 thanks to `babel-preset-es2015` (optional)
- Process end file with Uglify (optional)
- Validate code using ESlint (optional)
- Watch tasks that only lints changed files

# Getting Started

## Requirements

- Gulp 4 installed with `npm install --save gulpjs/gulp#4.0`

## Install

```bash
npm install @theme-tools/plugin-js-concat-babel --save
```

## Configure

The config that is passed in is merged with [`config.default.js`](config.default.js). We suggest starting with [`config.simple.js`](config.simple.js) to get started:

```bash
cp node_modules/@theme-tools/plugin-js-concat-babel/config.simple.js config.js.js
```

## Setup

Add this to your `gulpfile.js`:

```js
const gulp = require('gulp');
const config = {};
config.js = require('./config.js.js');
const jsTasks = require('@theme-tools/plugin-js-concat-babel')(config.js);

gulp.task('validate:js', jsTasks.validate);
gulp.task('js', jsTasks.compile);
gulp.task('clean:js', jsTasks.clean);
gulp.task('watch:js', jsTasks.watch);
```

# Details

## Tasks

These tasks are methods inside `jsTasks` from the above code example. You can run them anyway you can run a function, though they are often ran via Gulp. All tasks take a callback function as the first and only parameter that will run when the task is done - exactly how `gulp.task()`, `gulp.parallel()`, and `gulp.series()` want.

### `jsTasks.compile()` - Compile JS

Concat all the files in `config.src` together, run them through Babel with the `babel-preset-es2015` preset, Uglify it, then write it to `config.dest`.

### `jsTasks.validate()` - Lint using Eslint

Test code using eslint.

### `jsTasks.clean()` - Clean files

Deletes files that were made.

### `jsTasks.watch()` - Watch files

Watches files, then compiles and validates the changed files.

## Configuration

**All configuration is deep merged with [`config.default.js`](config.default.js).**

### `src`

Type: `Array<String>` Default: `[ 'js/**/*.js' ]`

All the files to work on.

### `dest`

Type: `String` Default: `'dest/'`

Destination folder to write files.

### `destName`

Type: `String` Default: `'all.js'`

The filename to write.

### `sourceMapEmbed`

Type: `Boolean` Default: `false`

Should sourcemaps be embeded in the file or as their own `*.js.map` file?

### `uglify`

Type: `Boolean` Default: `true`

Should the file be Uglified?

### `babel`

Type: `Boolean` Default: `true`

Should Babel transpile the JS using the preset `babel-preset-es2015`?

### `eslint`

Type: `Object`

#### `eslint.enabled`

Type: `Boolean` Default: `true`

Enable ESlint?

#### `eslint.extraSrc`

Type: `Array<String>` Default: `[]`

A list that can use globbing of files to lint on top of what is found in `src`.

## Setup Details

### Setting up ESlint

1. Create your [configuration file](http://eslint.org/docs/user-guide/configuring) (i.e. `.eslintrc`)


## Theme Core Events

This is only info for other Theme Core plugin developers.

### emit `'reload'`

This event is emmited when files are done compiling. The first paramater is a String of the files changed.
