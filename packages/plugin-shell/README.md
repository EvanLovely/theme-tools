# Shell Plugin for Theme Tools

> Watch files and run shell commands - the possibilities are endless!

## Features

- Can make multiple sets of files to watch and shell commands to run
- Registers a `run` task and a `watch` task for each
- Watch tasks trigger OS notification upon errors
- Run tasks exit upon errors

# Getting Started

## Install

```bash
npm install @theme-tools/plugin-shell --save
```

## Setup

Add this to your `gulpfile.js`:

```js
const gulp = require('gulp');
const shell = require('@theme-tools/plugin-shell');

const textTasks = shell({
  watch: ['files/*.txt'],
  cmd: 'echo "a txt file changed"',
  name: 'text',
});
gulp.task(textTasks.run); // registers `gulp text:run` as task
gulp.task(textTasks.watch); // registers `gulp text:watch` as task

const cssTasks = shell({
  watch: ['files/*.css'],
  cmd: 'echo "a css file changed"',
  name: 'css',
});
gulp.task(cssTasks.run); // registers `gulp css:run` as task
gulp.task(cssTasks.watch); // registers `gulp css:watch` as task

gulp.task('run', gulp.series([
  textTasks.run,
  cssTasks.run,
]));

gulp.task('default', gulp.parallel([
  textTasks.watch,
  cssTasks.watch,
]));

```

# Details

## Tasks

These tasks are methods inside `shellTasks` from the above code example. You can run them anyway you can run a function, though they are often ran via Gulp. All tasks take a callback function as the first and only parameter that will run when the task is done - exactly how `gulp.task()`, `gulp.parallel()`, and `gulp.series()` want.

### `.run()` - Run shell

Run the command.

### `.watch()` - Watch and run shell

Watch and run.

## Configuration

**All configuration is deep merged with [`config.default.js`](config.default.js).**

### `cmd`

Type: `String` Default: ``

Shell command to run

### `watch`

Type: `Array<String>` Default: `[]`

Array of file paths to watch. Globs allowed.

### `name`

Type: `String` Default: `shell`

Gulp task name prefix.

### `triggerBrowserReloadAfter`

Type: `Boolean` Default: `false`

If you're using `@theme-tools/plugin-browser-sync`, this command will trigger a reload after.
