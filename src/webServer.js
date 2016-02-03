var options = require('./serverOptions');
var express = require('express');
var getFileList = require('./getFileList');
var sensorsHandler = require('./sensorsHandler');
var statistics = require('./statistics');
var log = require('./log');
var path = require('path');

var app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve(process.cwd(), 'views'));

app.get('/', function cbGetRoot(request, result) {
  getFileList(function cbGetFileList(err, files) {
    result.render('index', {
      files: files,
      sensors: sensorsHandler.getSensors(),
      statistics: statistics.getStatistics(),
    });
  });
});

app.use('/files', express.static(path.resolve(options.filesDir)));

app.listen(options.webPort);
log('Webserver is listening on ' + options.webPort);
