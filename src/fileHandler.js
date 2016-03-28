'use strict';

const options = require('./serverOptions');
const fs = require('fs');
const path = require('path');
const log = require('./log');

module.exports = function fileHandler(data) {
  fs.writeFile(path.resolve(options.filesDir, data.filename), data.content, () => {
    log(`file ${data.filename} saved`);
  });
};
