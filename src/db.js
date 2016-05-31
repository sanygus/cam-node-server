const options = require('./serverOptions');
const DataStore = require('nedb');
const path = require('path');

let db;
let mode = 'photo';

module.exports.saveSettings = (/*idDev, */type, option, value, callback) => {
  // save to db
  if (type === 'mode') { mode = value }
  console.log(mode);
  callback(null);
};

module.exports.getSettings = (idDev, callback) => {
  // load from db
  callback(null, mode);
};

module.exports.init = () => {
  db = new DataStore({ filename: options.DBFile, autoload: true });
  db.persistence.setAutocompactionInterval(options.DBCompactionInterval);
};
