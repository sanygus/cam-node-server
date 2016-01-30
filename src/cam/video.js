var options = require('./camOptions');
var dateformat = require('dateformat');
var settings = options.defaultSettings;
var path = require('path');
var Camera = require('camerapi');
var cam = new Camera();
cam.baseDirectory(path.resolve(options.filesDir));

function takeVideo(callback) {
  cam
    .nopreview()
    .width(settings.video.width)
    .height(settings.video.height)
    .framerate(settings.video.framerate)
    // .bitrate(settings.video.bitrate)//bits/s//1080p30 15Mbits/s or more
    .timeout(settings.video.time)
    .recordVideo(
      dateformat(new Date(), 'yyyy-mm-dd\'T\'HH:MM:ss') + '.h264',
      function cbTakeVideo() {
        callback();
      }
    );
}

module.exports = function video() {
  if (settings.video.freq > 0) {
    setTimeout(function cb() {
      takeVideo(function cbTakeVideo() {
        video();
      });
    }, settings.video.freq);
  }
};
