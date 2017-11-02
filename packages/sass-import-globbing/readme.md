# Sass Import Globbing

Uses [custom importer in `node-sass`](https://www.npmjs.com/package/node-sass#importer--v200---experimental) to handle `@import '**/*.scss'`

### Install

```bash
npm install --save @theme-tools/sass-import-globbing
```

### Setup

First, require it:

```js
const sassImportGlobbing = require('@theme-tools/sass-import-globbing');
```

Then pass `sassImportGlobbing` to the `importer` option in sass; here's a few examples depending on your build tool.

#### Adding to Gulp

```js
const sassImportGlobbing = require('@theme-tools/sass-import-globbing');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({
      importer: sassImportGlobbing
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
```

### Usage

