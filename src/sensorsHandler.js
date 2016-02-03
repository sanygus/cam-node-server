var log = require('./log');

var sensors = [];

module.exports = function sensorsHandler(values) {
  log(values);
  sensors.push(values);
};

module.exports.getSensors = function getSensors() {
  return sensors;
};
