# Sass Plugin for Theme Core

# Getting Started

## Requirements

- Gulp 4 installed with `npm install --save gulpjs/gulp#4.0`

## Install

```bash
npm install theme-core-plugin--sass --save
```

## Configure

The config that is passed in is merged with [`config.default.js`](config.default.js). We suggest starting with [`config.simple.js`](config.simple.js) to get started:

```bash
cp node_modules/theme-core-plugin--sass/config.simple.js config.sass.js
```

## Setup
Add this to your `gulpfile.js`:

```js
const gulp = require('gulp');
const config = {};
config.sass = require('./config.sass.js');
const sassTasks = require('theme-core-plugin--sass')(config.sass);

gulp.task('sass', sassTasks.compile);
gulp.task('watch:sass', sassTasks.watch);
gulp.task('validate:sass', sassTasks.validate);
gulp.task('clean:sass', sassTasks.clean);
gulp.task('docs:sass', sassTasks.docs);
```

The config that is passed in is merged with `config.default.js`.

# Tasks

These tasks are methods inside `sassTasks` from the above code example. You can run them anyway you can run a function, though they are often ran via Gulp.

### `sassTasks.compile` - Compile Sass

The main task that takes Sass files and turns them into CSS files after passing them through AutoPrefixer.

### `sassTasks.validate` - Validate Sass using Stylelint

If you have a [Stylelint config](https://stylelint.io/user-guide/configuration/) present next to your Gulpfile, then this will run that for you. Disabled by default.

### `sassTasks.clean` - Clean compiled CSS.

Deletes files that are made by the other tasks.

### `sassTasks.docs` - Create documentation using SassDoc

Creates [SassDoc](http://sassdoc.com/) documentation for you.

### `sassTasks.watch` - Watch Sass

The watch task that will fire off the compile, validate, and docs tasks (if enabled).
