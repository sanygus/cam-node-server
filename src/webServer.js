'use strict';

const options = require('./serverOptions');
const express = require('express');
const getFileList = require('./getFileList');
const sensorsHandler = require('./sensorsHandler');
// const statistics = require('./statistics');
const log = require('./log');
const path = require('path');
const async = require('async');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve(process.cwd(), 'views'));

app.get('/', (request, result) => {
  getFileList((err/* , files */) => {
    if (err) { throw err; }
    result.render('index.ejs');
  });
});

app.get('/data', (request, result) => {
  async.parallel(
    [
      (callbackAsync) => {
        getFileList((err, files) => {
          if (err) { throw err; }
          callbackAsync(null, files);
        });
      },
      (callbackAsync) => {
        sensorsHandler.getSensors((err, sensors) => {
          if (err) { throw err; }
          callbackAsync(null, sensors[sensors.length - 1] || []);
        });
      },
    ],
    (err, results) => {
      result.json({
        filesList: results[0],
        sensors: results[1],
      });
    }
  );
});

app.use('/files', express.static(path.resolve(options.filesDir)));
app.use('/assets', express.static(path.resolve(options.assetsWebDir)));

app.listen(options.webPort);
log(`Webserver is listening on ${options.webPort}`);
