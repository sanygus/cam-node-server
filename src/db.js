const options = require('./serverOptions');
const lifeCycle = require('./lifeCycle');
const DataStore = require('nedb');
const path = require('path');

let db;

module.exports.saveSettings = (/*idDev, */type, option, value, callback) => {
  // save to db
  /*if (type === 'mode') { mode = value }
  console.log(mode);*/
  if (type === 'mode') {
    lifeCycle.setMode(value, () => {
      callback(null);
    });
  }
  console.log(value);
};

module.exports.getSettings = (idDev, callback) => {
  // load from db
  lifeCycle.getMode((err, mode) => {
    callback(null, { mode });
  });
};

module.exports.init = () => {
  db = new DataStore({ filename: options.DBFile, autoload: true });
  db.persistence.setAutocompactionInterval(options.DBCompactionInterval);
};
