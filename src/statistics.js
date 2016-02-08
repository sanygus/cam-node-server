var dateformat = require('dateformat');
var log = require('./log');

var online = false;
var onlineDate = null;
var bytes = 0;
var files = 0;
var time = 0; // ms
var speed = []; // {date, value(,3)} Kbytes/sec
var speedAvg = 0; // Kbytes/sec (,3)
var uptime = ''; // string
var disk = ''; // string

module.exports.setStatus = function setStatus(status) {
  online = status;
  onlineDate = dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss');
};

module.exports.statisticsHandler = function statisticsHandler(data) {
  log(data);
  if ((data.hasOwnProperty('size')) && (data.hasOwnProperty('time'))) {
    bytes += data.size;
    time += data.time;
    files++;
    speed.push({
      date: data.date,
      value: ((data.size / 1024) / (data.time / 1000)).toFixed(3),
    });
    speedAvg = ((bytes / 1024) / (time / 1000)).toFixed(3);
  } else if ((data.hasOwnProperty('uptime')) && (data.hasOwnProperty('disk'))) {
    uptime = data.uptime;
    disk = data.disk;
  } else {
    log('corrupt object');
  }
};

module.exports.getStatistics = function getStatistics() {
  return {
    online: online,
    onlineDate: onlineDate,
    MBytes: (bytes / 1024 / 1024).toFixed(3), // bytes -> MB
    filesCount: files,
    sec: (time / 1000).toFixed(3), // ms -> sec
    speed: speed, // {date, value} Kbytes/sec
    speedAvg: speedAvg, // KB/sec
    uptime: uptime.replace('\n', ''),
    disk: disk.replace('\n', '<br>'),
  };
};
