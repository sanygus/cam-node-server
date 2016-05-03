const options = require('./serverOptions');
const db = require('./db');
const sensorsHandler = require('./sensorsHandler');
const fileHandler = require('./fileHandler');
const statistics = require('./statistics');
const log = require('./log');
const io = (require('socket.io'))();

db.init();

io.on('connection', (socket) => {
  log('cam connected');
  statistics.setStatus(true);

  socket.on('sensors', (data) => {
    sensorsHandler.giveSensors(data);
  });

  socket.on('file', (data, complete) => {
    fileHandler(data);
    complete();
  });

  socket.on('statistics', (data, complete) => {
    statistics.statisticsHandler(data);
    complete();
  });

  socket.on('disconnect', () => {
    log('cam disconnected');
    statistics.setStatus(false);
  });
});

io.listen(options.socketPort);
log(`server is listening on port ${options.socketPort}`);
