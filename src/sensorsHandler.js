'use strict';

const log = require('./log');
const db = require('./db');

const sensors = [];

module.exports.giveSensors = function giveSensors(values, callback) {
  log(values);
  sensors.push(values);
  db.getSettings(null, (err, settings) => {
    callback(settings);
  })
};

module.exports.getSensors = function getSensors(callback) {
  let result = { powers: [] };
  if (sensors.length > 0) {
    result = sensors[sensors.length - 1];
    let sensorsLength = 10;
    if(sensors.length > 10) { sensorsLength = sensors.length }
    result.powers = sensors.slice(sensorsLength - 10, sensors.length).map((sensor) => {
      return {
        power: sensor.power,
        date: sensor.date
      }
    });
  }
  callback(null, result);
};
