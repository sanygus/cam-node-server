var options = require('./camOptions');
var fs = require('fs');
var dateformat = require('dateformat');
var Camera = require('camerapi');
var path = require('path');
var settings = options.defaultSettings;
var cam = new Camera();
cam.baseDirectory(path.resolve(options.filesDir));

function sendFile(socket, filename, callback) {
  if (socket.connected) {
    fs.readFile(path.resolve(options.filesDir, filename), function cb(err, data) {
      if (err) { throw err; } 
      console.log('sending ', filename);
      socket.emit('file', { filename: filename, content: data }, () => {
        callback(true);
      });
    });
  } else {
    callback(false);
  }
}

function takePhoto(callback) {
  cam.prepare({
    timeout: settings.photo.timeout,
    width: settings.photo.width,
    height: settings.photo.height,
    quality: settings.photo.quality,
  }).takePicture(dateformat(new Date(), 'yyyy-mm-dd\'T\'HH:MM:ss') + '.jpg', () => {
    callback();
  });
}

function takeVideo(callback) {
  cam.nopreview()
    .width(settings.video.width)
    .height(settings.video.height)
    .framerate(settings.video.framerate)
    // .bitrate(settings.video.bitrate)//bits/s//1080p30 15Mbits/s or more
    .timeout(settings.video.time)
    .recordVideo(dateformat(new Date(), 'yyyy-mm-dd\'T\'HH:MM:ss') + '.h264', () => {
    callback();
  });
}

function photo() {
  if (settings.photo.freq > 0) {
    setTimeout(function cb() {
      takePhoto( () => {
        photo();
      });
    }, settings.photo.freq);
  }
}

function video() {
  if (settings.video.freq > 0) {
    setTimeout(function cb() {
      takeVideo( () => {
        video();
      });
    }, settings.video.freq);
  }
}

function fileSender(socket) {
  if (socket.connected) {
    fs.readdir(path.resolve(options.filesDir), (err, files) => {
      if (err) { throw err; }
      var filesDir = files.slice().filter( (fileName) => {
        return /.*\.(jpg|h264)$/.test(fileName);
      }).sort().reverse();
      if(filesDir.length > 0) {
        sendFile(socket, filesDir[0], (success) => {
          if (success) {
            fs.unlink(path.resolve(options.filesDir, filesDir[0]), () => {
              fileSender(socket);
            });
          } else {
            callFileSender(socket);
          }
        });
      } else {
        callFileSender(socket);
      }
    });
  } else {
    callFileSender(socket);
  }
}

function callFileSender(socket) {
  setTimeout( () => {
    fileSender(socket);
  }, options.fileSenderFreq);
};

module.exports = function cb(socket) {
  photo();// take and send photos
  video();// take and send videos
  fileSender(socket);
};

/*
BUGS:
- после реконнекта файлы не отправляются

NOTES;
- если частота фото или видео 0, то их вызов больше не выполняется
*/
