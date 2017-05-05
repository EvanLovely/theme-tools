'use strict';
const gulp = require('gulp');
<% if (css === 'theme-core-plugin--sass') { -%>
const cssTasks = require('theme-core-plugin--sass')({});
<% } -%>
<% if (browserSync) { -%>
const browserSyncTasks = require('theme-core-plugin--browser-sync')({});
<% } -%>
<% if (usePatternLab) { -%>
const patternLabTasks = require('theme-core-plugin--pattern-lab--php')({});
<% } -%>

<% if (css === 'theme-core-plugin--sass') { -%>
gulp.task('css', cssTasks.compile);
<% } -%>
<% if (browserSync) { -%>
gulp.task('serve', browserSyncTasks.serve);
<% } %>
<% if (usePatternLab) { -%>
gulp.task('pl', patternLabTasks.compile);
<% } %>
