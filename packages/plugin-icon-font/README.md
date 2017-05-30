# Font Icon Plugin for Theme Tools

> Theme core plugins let you easily pass in configuration and get a set of Gulp-ready task functions back that have sensible defaults and work well together.

# Getting Started

## Requirements

- Gulp 4 installed with `npm install --save gulpjs/gulp#4.0`

## Install

```bash
npm install @theme-tools/plugin-icon-font --save
```

## Configure

The config that is passed in is merged with [`config.default.js`](config.default.js). We suggest starting with it to get started:

```bash
cp node_modules/@theme-tools/plugin-icon-font/config.default.js config.icon-font.js
```

## Setup

Add this to your `gulpfile.js`:

```js
const gulp = require('gulp');
const config = {};
config.iconFont = require('./config.icon-font.js');
const iconTasks = require('@theme-tools/plugin-icon-font')(config.iconFont);

gulp.task('icons', iconTasks.compile);
gulp.task('icons:clean', iconTasks.clean);
gulp.task('icons:watch', iconTasks.watch);
```

# Details

## Tasks

These tasks are methods inside `iconTasks` from the above code example. You can run them anyway you can run a function, though they are often ran via Gulp. All tasks take a callback function as the first and only parameter that will run when the task is done - exactly how `gulp.task()`, `gulp.parallel()`, and `gulp.series()` want.

### `iconTasks.compile()` - Compile icons

Compile all svg files into a single icon font.

### `iconTasks.watch()` - Watch

Watch files and recompile.

### `iconTasks.clean()` - Clean

Clean compiled files.

## Configuration

**All configuration is deep merged with [`config.default.js`](config.default.js).**

### `src`

Type: `String | Array<String>` Default: `'images/icons/src/*.svg`

SVGs to work from.

### `dest`

Type: `String` Default: `dest/`

Where to write icon fonts

### `templates`

Type: `Object`

#### `templates.enabled`

Type: `Boolean` Default: `false`

If templates are turned on.

#### `templates.sets`

Type: `Array<Object>` Default: `[]`

Each set is an object containing a `src` (String) and `dest` (String) from where to read a template from and where to write it to. These files will get handed info on the icons made. It can be used to create a Sass file so you can use the icons in mixins or can be used to create an HTML file that demos the icons. See [Setting up Templates](#setting-up-templates) below for more info.

## Set up

### Setting up Templates

Here's some examples of templates that can be used:

```html
<div class="icons-demo" id="icons">
  {% glyphs.forEach((glyph) => { %}
  <div class="icons__item" data-name="{{ glyph.name }}">
    <i class="{{ classNamePrefix }}--{{ glyph.name }}"></i> {{ classNamePrefix }}--{{ glyph.name }}
  </div>
  {% }); %}
</div>
```

```scss
$icon-font-base-name: "{{ fontName }}";
$icon-font-path: "{{ fontPath }}";
$icon-font-class-prefix: "{{ classNamePrefix }}";

$font-icons: ({% glyphs.forEach((glyph) => { %}
  {{ glyph.name }}: "\{{ glyph.content }}",{% }); %}
);
```

## Theme Core Events

This is only info for other Theme Core plugin developers.

### emit `'reload'`

This event is emmited when files are done compiling. The first paramater is a String of the files changed.
