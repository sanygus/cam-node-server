var options = require('./camOptions');
var sensors = require('./sensors');
var files = require('./files');
var socket = require('socket.io-client').connect(options.serverAddress);

socket.on('connect', function () {
  console.log('connected to server ', options.serverAddress);
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

sensors(socket);
files(socket);
