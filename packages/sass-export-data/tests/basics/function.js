const path = require('path');
const sassExportData = require('../../sass-export-data');

module.exports = sassExportData({
  path: path.join(__dirname, 'dest/a/b/c'),
});
