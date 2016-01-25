var options = require('./camOptions');
var fs = require('fs');
var dateformat = require('dateformat');
var Camera = require('camerapi');
var settings = options.defaultSettings;
var currentTransfer = [];
var cam = new Camera();
cam.baseDirectory(options.filesDir);

function getNextFile(filename, callback) { // 2016-01-24T18:29:19.jpg
  var nextFilename = null;
  var currentFileIndex;

  fs.readdir(options.filesDir, function (err, files) {
    files.push(filename);
    files = files.filter(function (fn) {
      return (/.*\.(jpg|h264)$/.test(fn) && (currentTransfer.indexOf(fn) === -1));
    }).sort().reverse();
    currentFileIndex = files.indexOf(filename);
    if (typeof files[currentFileIndex + 1] !== 'undefined') {
      nextFilename = files[currentFileIndex + 1];
    }
    callback(nextFilename);
  });
}

function sendFile(socket, filename) {
  if (socket.connected) {
    currentTransfer.push(filename);
    fs.readFile(options.filesDir + '/' + filename, function (err, data) {
      console.log('sending ', filename);
      socket.emit('file', { filename: filename, content: data }, function () {
        currentTransfer.splice(currentTransfer.indexOf(filename), 1);
        fs.unlink(options.filesDir + '/' + filename, function (errunlink) {
          getNextFile(filename, function (nextFilename) {
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
    'timeout': settings.photo.timeout,
    'width': settings.photo.width,
    'height': settings.photo.height,
    'quality': settings.photo.quality,
  }).takePicture(dateformat(new Date(), 'yyyy-mm-dd\'T\'HH:MM:ss') + '.jpg',
  function (filename, err) {
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
    .recordVideo(dateformat(new Date(), 'yyyy-mm-dd\'T\'HH:MM:ss') + ".h264",
    function (filename, err) {
      callback(filename.substring(filename.lastIndexOf('/') + 1));
    });
}

function photo(socket) {
  if (settings.photo.freq > 0) {
    setTimeout(function () {
      takePhoto(function (filename) {
        sendFile(socket, filename);
        photo(socket);
      });
    }, settings.photo.freq);
  }
}

function video(socket) {
  if (settings.video.freq > 0 && settings.video.freq > settings.video.time) {
    setTimeout(function () {
      takeVideo(function (filename) {
        sendFile(socket, filename);
        video(socket);
      });
    }, settings.video.freq);
  }
}

module.exports = function (socket) {
  photo(socket);// take and send photos
  video(socket);// take and send videos
};

/*
TODO: photo and video logic
- photo and video logic
*/
