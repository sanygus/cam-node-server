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

  socket.on('sensors', (data, complete) => {
    sensorsHandler.giveSensors(data);
    db.getSettings(null, (err, settings) => {
      complete(settings);
    })
  });

  socket.on('file', (data, complete) => {
    fileHandler.fileSaver(data);
    complete();
  });

  socket.on('statistics', (data, complete) => {
    statistics.statisticsHandler(data);
    complete();
  });

  socket.on('RTVstatus', (data, callback) => {
    statistics.setRTVstatus(data);
    callback(null);
  });

  socket.on('disconnect', () => {
    log('cam disconnected');
    statistics.setStatus(false);
    statistics.setRTVstatus(false);
  });
});

io.listen(options.socketPort);
fileHandler.checkFilesDir();
log(`server is listening on port ${options.socketPort}`);
