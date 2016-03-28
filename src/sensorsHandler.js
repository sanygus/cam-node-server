'use strict';

const log = require('./log');

const sensors = [];

module.exports.giveSensors = function giveSensors(values) {
  log(values);
  sensors.push(values);
};

module.exports.getSensors = function getSensors(callback) {
  callback(null, sensors);
};
