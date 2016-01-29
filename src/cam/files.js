var options = require('./camOptions');
var dateformat = require('dateformat');
var Camera = require('camerapi');
var path = require('path');
var settings = options.defaultSettings;
var cam = new Camera();
var fileSender = require('./fileSender');

cam.baseDirectory(path.resolve(options.filesDir));

function takePhoto(callback) {
  cam.prepare({
    timeout: settings.photo.timeout,
    width: settings.photo.width,
    height: settings.photo.height,
    quality: settings.photo.quality,
  }).takePicture(
    dateformat(new Date(), 'yyyy-mm-dd\'T\'HH:MM:ss') + '.jpg',
    function cbTakePicture() {
      callback();
    }
  );
}

function takeVideo(callback) {
  cam.nopreview()
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

function photo() {
  if (settings.photo.freq > 0) {
    setTimeout(function cb() {
      takePhoto(function cbTakePhoto() {
        photo();
      });
    }, settings.photo.freq);
  }
}

function video() {
  if (settings.video.freq > 0) {
    setTimeout(function cb() {
      takeVideo(function cbTakeVideo() {
        video();
      });
    }, settings.video.freq);
  }
}

module.exports = function cb(socket) {
  photo();// take and send photos
  video();// take and send videos
  fileSender(socket, options.filesDir, options.fileSenderFreq);
};

/*
BUGS:
- после реконнекта файлы не отправляются

NOTES;
- если частота фото или видео 0, то их вызов больше не выполняется
*/
