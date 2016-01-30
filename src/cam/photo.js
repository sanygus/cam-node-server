var options = require('./camOptions');
var dateformat = require('dateformat');
var settings = options.defaultSettings;
var path = require('path');
var Camera = require('camerapi');
var cam = new Camera();
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

module.exports = function photo() {
  if (settings.photo.freq > 0) {
    setTimeout(function cb() {
      takePhoto(function cbTakePhoto() {
        photo();
      });
    }, settings.photo.freq);
  }
};
