var options = require('./serverOptions');
var sensorsHandler = require('./sensorsHandler');
var fileHandler = require('./fileHandler');
var statistics = require('./statistics');
var io = require('socket.io')();

io.on('connection', function cbOnConnect(socket) {
  console.log('cam connected');
  statistics.setStatus(true);

  socket.on('sensors', function cbOnSensors(data) {
    sensorsHandler(data);
  });

  socket.on('file', function cbOnFile(data, complete) {
    fileHandler(data);
    complete();
  });

  socket.on('disconnect', function cbOnDisconnect() {
    console.log('cam disconnected');
    statistics.setStatus(false);
  });
});

io.listen(options.socketPort);
console.log('server is listening on port ', options.socketPort);
