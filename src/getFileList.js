var fs = require('fs');
var options = require('./serverOptions');
var async = require('async');
var path = require('path');

module.exports = function getFileList(callback) {
  fs.readdir(path.resolve(options.filesDir), function cbReadDir(err, files) {
    async.map(
      files,
      function funcMap(file, done) {
        fs.stat(path.resolve(options.filesDir, file), function cbStat(errFile, stat) {
          if (errFile) { return done(errFile); }
          done(null, {
            name: file,
            size: (stat.size / 1024).toFixed(1),
          });
        });
      },
      function cbMap(errMap, myFiles) {
        if (errMap) { return callback(errMap); }
        callback(null, myFiles);
      }
    );
  });
};
