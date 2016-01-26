var sensors = [];

module.exports = function sensorsHandler(values) {
  console.log(values);
  sensors.push(values);
};

module.exports.getSensors = function getSensors() {
  return sensors;
};
