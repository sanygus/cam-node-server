'use strict';

const async = require('async');
const getFileList = require('./getFileList');
const sensorsHandler = require('./sensorsHandler');
const statistics = require('./statistics');

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
          callbackAsync(null, sensors);
        });
      },
      (callbackAsync) => {
        statistics.getStatus( (err, status) => {
          if (err) { throw err; }
          callbackAsync(null, status);
        });
      },
    ],
    (err, results) => {
      callback({
        fileList: results[0],
        sensors: results[1],
        statusCam: results[2],
      });
    }
  );
};
