var options = require('./camOptions');
var socket = require('socket.io-client').connect(options.serverAddress);

socket.on('connect', function () {
  console.log('connected to server ', options.serverAddress);
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});
