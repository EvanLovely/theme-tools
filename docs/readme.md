# Theme Core Docs

## Plugins

All plugins are named like this: `theme-core-plugin--NAME` and are located in the `packages/` folder.

Each take a config object and returns an object containing functions that it can run, like a css compile, or watch css to compile. No plugins contain `gulp.task()`.
