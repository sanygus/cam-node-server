var fs = require('fs');
var options = require('../options');
var async = require('async');

module.exports = function getFileList(callback) {
  fs.readdir(options.filesDir, function(err, files) {
    async.map(
      files,
      function(file, done) {
        fs.stat(options.filesDir + '/' + file, function(err, stat) {
          if (err) { return done(err); }
          done(null, {
            name: file,
            size: (stat.size/1024).toFixed(1)
          });
        });
      },
      function (err, myFiles) {
        if (err) { return callback(err); }
        callback(null, myFiles);
      }
    );
  });
};
