const dateformat = require('dateformat');
const log = require('./log');

let online = false;
let onlineDate = null;
let bytes = 0;
let files = 0;
let time = 0; // ms
const speed = []; // {date, value(,3)} Kbytes/sec
let speedAvg = 0; // Kbytes/sec (,3)
let uptime = ''; // string
let disk = ''; // string

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
    online,
    onlineDate,
    MBytes: (bytes / 1024 / 1024).toFixed(3), // bytes -> MB
    filesCount: files,
    sec: (time / 1000).toFixed(3), // ms -> sec
    speed, // {date, value} Kbytes/sec
    speedAvg, // KB/sec
    uptime: uptime.replace('\n', ''),
    disk: disk.replace('\n', '<br>'),
  };
};
