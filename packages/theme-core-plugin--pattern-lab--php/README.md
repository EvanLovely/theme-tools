# Pattern Lab Plugin for Theme Core

# Getting Started

## Requirements

- Gulp 4 installed with `npm install --save gulpjs/gulp#4.0`

## Install

```bash
npm install theme-core-plugin--pattern-lab--php --save
```

## Configure

The config that is passed in is merged with [`config.default.js`](config.default.js).

```bash
cp node_modules/theme-core-plugin--pattern-lab--php/config.default.js config.pattern-lab.js
```

## Setup

Add this to your `gulpfile.js`:

```js
const config = {};
config.pl = require('./config.pattern-lab.js');
const plTasks = require('theme-core-plugin--pattern-lab--php')(config.pl);

gulp.task('pl', plTasks.compile);
gulp.task('watch:pl', plTasks.watch);
```

# Tasks

These tasks are methods inside `plTasks` from the above code example. You can run them anyway you can run a function, though they are often ran via Gulp.

## `plTasks.compile` - Compile Pattern Lab

Compiles Pattern Lab.

## `plTasks.watch` - Watch pl

Watch and Compile Pattern Lab.
