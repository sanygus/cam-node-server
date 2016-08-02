const settings = {
  mode: [],
  RTV: false,
}

module.exports.getSettings = (callback) => {
  callback(null, settings);
};

module.exports.setSetting = (type, value, callback) => {
  settings[type] = value;
  callback(null);
};
