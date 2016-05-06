'use strict';

const async = require('async');
const getFileList = require('./getFileList');
const sensorsHandler = require('./sensorsHandler');

module.exports = function getWebData(callback) {
  async.parallel(
    [
      (callbackAsync) => {
        getFileList( (err, files) => {
          if (err) { throw err; }
          callbackAsync(null, files);
        });
      },
      (callbackAsync) => {
        sensorsHandler.getSensors( (err, sensors) => {
          if (err) { throw err; }
          callbackAsync(null, sensors || []);
        });
      },
    ],
    (err, results) => {
      callback({
        fileList: results[0],
        sensors: results[1],
      });
    }
  );
};
