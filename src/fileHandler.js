var options = require('./serverOptions');
var fs = require('fs');
var path = require('path');
var log = require('./log');

module.exports = function cb(data) {
  fs.writeFile(path.resolve(options.filesDir, data.filename), data.content, function cbWriteFile() {
    log('file ' + data.filename + ' saved');
  });
};
