const options = require('./serverOptions');
const DataStore = require('nedb');
const path = require('path');

let db;

module.exports.saveSettings = (/*idDev, type, option, value, */ callback) => {
  // save to db
  callback(null);
};

module.exports.getSettings = (idDev) => {
  // load from db
  callback(null);
};

module.exports.init = () => {
  db = new DataStore({ filename: options.DBFile, autoload: true });
  db.persistence.setAutocompactionInterval(options.DBCompactionInterval);
};
