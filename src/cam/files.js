var options = require('./camOptions');
var fs = require('fs');
var dateformat = require('dateformat');
var Camera = require('camerapi');
var settings = options.defaultSettings;
var currentTransfer = [];
var cam = new Camera();
var path = require('path');
cam.baseDirectory(path.resolve(options.filesDir));

function getNextFile(filename, callback) { // 2016-01-24T18:29:19.jpg
  var nextFilename = null;
  var currentFileIndex;

  fs.readdir(path.resolve(options.filesDir), function cb(err, files) {
    var dirfiles = files.concat[filename].filter(function filterFunc(fn) {
      return (/.*\.(jpg|h264)$/.test(fn) && (currentTransfer.indexOf(fn) === -1));
    }).sort().reverse();
    currentFileIndex = dirfiles.indexOf(filename);
    if (typeof dirfiles[currentFileIndex + 1] !== 'undefined') {
      nextFilename = dirfiles[currentFileIndex + 1];
    }
    callback(nextFilename);
  });
}

function sendFile(socket, filename) {
  if (socket.connected) {
    currentTransfer.push(filename);
    fs.readFile(path.resolve(options.filesDir, filename), function cb(err, data) {
      console.log('sending ', filename);
      socket.emit('file', { filename: filename, content: data }, function cbEmit() {
        currentTransfer.splice(currentTransfer.indexOf(filename), 1);
        fs.unlink(path.resolve(options.filesDir, filename), function cbUnlink(errUnlink) {
          if (errUnlink) { throw errUnlink; }
          getNextFile(filename, function cbGetNextFile(nextFilename) {
            if (nextFilename) {
              sendFile(socket, nextFilename);
            }
          });
        });
      });
    });
  }
}

function takePhoto(callback) {
  cam.prepare({
    timeout: settings.photo.timeout,
    width: settings.photo.width,
    height: settings.photo.height,
    quality: settings.photo.quality,
  }).takePicture(dateformat(new Date(), 'yyyy-mm-dd\'T\'HH:MM:ss') + '.jpg',
  function cb(filename, err) {
    if (err) { throw err; }
    callback(filename.substring(filename.lastIndexOf('/') + 1));
  });
}

function takeVideo(callback) {
  cam.nopreview()
    .width(settings.video.width)
    .height(settings.video.height)
    .framerate(settings.video.framerate)
    // .bitrate(settings.video.bitrate)//bits/s//1080p30 15Mbits/s or more
    .timeout(settings.video.time)
    .recordVideo(dateformat(new Date(), 'yyyy-mm-dd\'T\'HH:MM:ss') + '.h264',
    function cb(filename, err) {
      if (err) { throw err; }
      callback(filename.substring(filename.lastIndexOf('/') + 1));
    });
}

function photo(socket) {
  if (settings.photo.freq > 0) {
    setTimeout(function cb() {
      takePhoto(function cbTakePhoto(filename) {
        sendFile(socket, filename);
        photo(socket);
      });
    }, settings.photo.freq);
  }
}

function video(socket) {
  if (settings.video.freq > 0 && settings.video.freq > settings.video.time) {
    setTimeout(function cb() {
      takeVideo(function cbTakeVideo(filename) {
        sendFile(socket, filename);
        video(socket);
      });
    }, settings.video.freq);
  }
}

module.exports = function cb(socket) {
  photo(socket);// take and send photos
  video(socket);// take and send videos
};

/*
TODO:
- отдельно фото/видео и отправка файлов
*/
