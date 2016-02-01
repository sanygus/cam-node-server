var options = require('./camOptions');
var sensors = require('./sensors');
var fileSender = require('./fileSender');
var photo = require('./photo');
var video = require('./video');
var socket = require('socket.io-client').connect(options.serverAddress);

socket.on('connect', function cb() {
  console.log('connected to server ', options.serverAddress);
});

socket.on('disconnect', function cb() {
  console.log('disconnected from server');
});

sensors(socket);
fileSender(socket, options.filesDir, options.fileSenderInterval);
photo();
video();
