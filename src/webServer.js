var options = require('./serverOptions');
var express = require('express');
var getFileList = require('./getFileList');
var sensorsHandler = require('./sensorsHandler');
var statistics = require('./statistics');

var app = express();
app.set('view engine', 'ejs');

app.get('/', function (request, result) {
  getFileList(function (err, files) {
    result.render('index', {
      files: files,
      sensors: sensorsHandler.getSensors(),
      statistics: statistics,
    });
  });
});

app.use('/files', express.static(options.filesDir));

app.listen(options.webPort);
console.log('Webserver is listening on ', options.webPort);
