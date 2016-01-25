var options = require('./serverOptions');
var sensorsHandler = require('./sensorsHandler');
var fileHandler = require('./fileHandler');
var statistics = require('./statistics');
var io = require('socket.io')();

io.on('connection', function (socket) {
  console.log('cam connected');
  statistics.setStatus(true);

  socket.on('sensors', function (data) {
    sensorsHandler(data);
  });

  socket.on('file', function (data, complete) {
    fileHandler(data);
    complete();
  });

  socket.on('disconnect', function () {
    console.log('cam disconnected');
    statistics.setStatus(false);
  });
});

io.listen(options.socketPort);
console.log('server is listening on port ', options.socketPort);
