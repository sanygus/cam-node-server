var options = require('./serverOptions');
var fs = require('fs');

module.exports = function (data) {
  fs.writeFile(options.filesDir + '/' + data.filename, data.content, function () {
    console.log('file ' + data.filename + ' saved');
  });
};
