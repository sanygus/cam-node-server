var options = require('./serverOptions');
var sensorsHandler = require('./sensorsHandler');
var fileHandler = require('./fileHandler');
var statistics = require('./statistics');
var log = require('./log');
var io = (require('socket.io'))();

io.on('connection', function cbOnConnect(socket) {
  log('cam connected');
  statistics.setStatus(true);

  socket.on('sensors', function cbOnSensors(data) {
    sensorsHandler.giveSensors(data);
  });

  socket.on('file', function cbOnFile(data, complete) {
    fileHandler(data);
    complete();
  });

  socket.on('statistics', function cbOnStat(data, complete) {
    statistics.statisticsHandler(data);
    complete();
  });

  socket.on('disconnect', function cbOnDisconnect() {
    log('cam disconnected');
    statistics.setStatus(false);
  });
});

io.listen(options.socketPort);
log('server is listening on port ' + options.socketPort);
