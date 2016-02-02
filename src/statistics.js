var dateformat = require('dateformat');

var online = false;
var onlineDate = null;
var bytes = 0;
var time = 0; // ms
var speed = []; // {date, value(,3)} Kbytes/sec
var speedAvg = 0; // Kbytes/sec (,3)

module.exports.setStatus = function setStatus(status) {
  online = status;
  onlineDate = dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss');
};

module.exports.statisticsHandler = function statisticsHandler(data) {
  bytes += data.size;
  time += data.time;
  speed.push({
    date: data.date,
    value: ((data.size / 1024) / (data.time / 1000)).toFixed(3),
  });
  speedAvg = ((bytes / 1024) / (time / 1000)).toFixed(3);
};

module.exports.getStatistics = function getStatistics() {
  return {
    online: online,
    onlineDate: onlineDate,
    MBytes: (bytes / 1024 / 1024).toFixed(3), // bytes -> MB
    sec: (time / 1000).toFixed(3), // ms -> sec
    speed: speed, // {date, value} Kbytes/sec
    speedAvg: speedAvg, // KB/sec
  };
};
