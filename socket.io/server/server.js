var options = require('./serverOptions');
var srvFunc = require('./serverFunctions');
var io = require('socket.io')();

io.on('connection', function (socket) {
  console.log('cam connected');

  socket.on('event', function (data) {
    srvFunc.serverEvent(data);
  });

  socket.on('disconnect', function () {
    console.log('cam disconnected');
  });
});

io.listen(options.socketPort);
