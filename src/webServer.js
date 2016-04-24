'use strict';

const options = require('./serverOptions');
const express = require('express');
const getWebData = require('./getWebData');
// const statistics = require('./statistics');
const log = require('./log');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve(process.cwd(), 'views'));

app.get('/', (request, response) => {
  response.render('index.ejs');
});

app.get('/data', (request, response) => {
  getWebData( (data) => {
    response.json(data);
    log(data);
  });
});

app.use('/files', express.static(path.resolve(options.filesDir)));
// app.use('/assets', express.static(path.resolve(options.assetsWebDir)));

app.listen(options.webPort);
log(`Webserver is listening on ${options.webPort}`);
