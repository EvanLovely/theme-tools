## Setup

### Initialize Project

If you don't have a `package.json` file, run this to get one: `npm init`.

### Install & Setup Gulp 4

Run this to install Gulp 4:

```bash
npm install --save gulpjs/gulp#4.0
```

Create a file called `gulpfile.js` with:

```js
const gulp = require('gulp');
const config = {};
```

Even though Gulp 4 isn't officially out, it's safe to use and offers useful stuff like the ability to declare task groups in [series](https://github.com/gulpjs/gulp/blob/4.0/docs/API.md#gulpseriestasks) or [parallel](https://github.com/gulpjs/gulp/blob/4.0/docs/API.md#gulpparalleltasks).

- [Gulp 4 docs](https://github.com/gulpjs/gulp/tree/4.0/docs)
- [The Complete-Ish Guide to Upgrading to Gulp 4](https://www.joezimjs.com/javascript/complete-guide-upgrading-gulp-4/)

### Install Plugins

Find a list of all available plugins by [searching for "theme-tools-plugin" on npm](https://www.npmjs.com/browse/keyword/theme-tools-plugin).
