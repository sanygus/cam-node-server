var options = require('./camOptions');
var fileSender = require('./fileSender');
var photo = require('./photo');
var video = require('./video');

module.exports = function cb(socket) {
  photo();
  video();
  fileSender(socket, options.filesDir, options.fileSenderFreq);
};

/*
BUGS:
- после реконнекта файлы не отправляются

NOTES;
- если частота фото или видео 0, то их вызов больше не выполняется
*/
