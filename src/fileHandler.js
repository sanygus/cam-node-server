'use strict';

const options = require('./serverOptions');
const fs = require('fs');
const path = require('path');
const log = require('./log');

module.exports.fileSaver = function fileSaver(data) {
  fs.writeFile(path.resolve(options.filesDir, data.filename), data.content, () => {
    log(`file ${data.filename} saved`);
  });
};

module.exports.checkFilesDir = function checkFilesDir() {
  fs.stat(path.resolve(options.filesDir), (err) => {
    if (err) {
      fs.mkdir(path.resolve(options.filesDir));
    }
  })
};
