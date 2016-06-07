let mode = [];

module.exports.getMode = (callback) => {
  callback(null, mode);
};

module.exports.setMode = (newMode, callback) => {
  mode = newMode;
  callback(null);
};
