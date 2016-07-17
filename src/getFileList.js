'use strict';

const fs = require('fs');
const options = require('./serverOptions');
const async = require('async');
const path = require('path');

module.exports = function getFileList(callback) {
  fs.readdir(path.resolve(options.filesDir), (err, allFiles) => {
    const files = allFiles.filter((fileName) => {
      return /.+\.(jpg|mp4)/.test(fileName);
    });
    async.map(
      files,
      (file, done) => {
        fs.stat(path.resolve(options.filesDir, file), (errFile, stat) => {
          if (errFile) { return done(errFile); }
          done(null, {
            name: file,
            size: (stat.size / 1024).toFixed(1),
          });
        });
      },
      (errMap, myFiles) => {
        if (errMap) { return callback(errMap); }
        callback(null, myFiles.reverse());
      }
    );
  });
};
