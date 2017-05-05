# Sass Plugin for Theme Core

# Requirements

- Gulp 4 installed with `github:gulpjs/gulp#4.0`

## Setup

  npm install theme-core-plugin--sass --save
  cp node_modules/theme-core-plugin--sass/config.simple.js config.sass.js

Add this to your `gulpfile.js`:

```js
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



