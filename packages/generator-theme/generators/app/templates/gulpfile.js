'use strict';
const gulp = require('gulp');
<% if (css === 'theme-core-plugin--sass') { -%>
const cssTasks = require('theme-core-plugin--sass')({});
<% } -%>
<% if (browserSync) { -%>
const browserSyncTasks = require('theme-core-plugin--browser-sync')({});
<% } -%>

<% if (css === 'theme-core-plugin--sass') { -%>
gulp.task('css', cssTasks.compile);
<% } -%>
<% if (browserSync) { -%>
gulp.task('serve', browserSyncTasks.serve);
<% } %>
