'use strict';

const async = require('async');
const db = require('./db');
const getFileList = require('./getFileList');
const sensorsHandler = require('./sensorsHandler');
const statistics = require('./statistics');

module.exports = function getWebData(callback) {
  async.parallel(
    [
      (callbackAsync) => {
        getFileList(callbackAsync);
      },
      (callbackAsync) => {
        sensorsHandler.getSensors(callbackAsync);
      },
      (callbackAsync) => {
        statistics.getStatus(callbackAsync);
      },
      (callbackAsync) => {
        db.getSettings(null, callbackAsync);
      },
    ],
    (err, results) => {
      callback({
        fileList: results[0],
        sensors: results[1],
        statusCam: results[2],
        settings: results[3]
      });
    }
  );
};
