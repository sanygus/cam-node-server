var fs = require('fs');
var options = require('./serverOptions');
var async = require('async');

module.exports = function getFileList(callback) {
  fs.readdir(options.filesDir, function (err, files) {
    async.map(
      files,
      function (file, done) {
        fs.stat(options.filesDir + '/' + file, function (errFile, stat) {
          if (errFile) { return done(errFile); }
          done(null, {
            name: file,
            size: (stat.size / 1024).toFixed(1),
          });
        });
      },
      function (errMap, myFiles) {
        if (errMap) { return callback(errMap); }
        callback(null, myFiles);
      }
    );
  });
};
