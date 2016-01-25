var sensors = [];

module.exports = function (values) {
  console.log(values);
  sensors.push(values);
};

module.exports.getSensors = function () {
  return sensors;
};
