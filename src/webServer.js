const options = require('./serverOptions');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const getWebData = require('./getWebData');
// const statistics = require('./statistics');
const db = require('./db');
const log = require('./log');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve(process.cwd(), 'views'));

app.get('/', (request, response) => {
  response.render('index.ejs');
});

app.get('/data', (request, response) => {
  getWebData( (data) => {
    response.json(data);
  });
});

app.post('/settings', bodyParser.json(), (request, response) => {
  const result = { saved: false };
  log(request.body);
  db.saveSettings(request.body.type, 0, request.body.value, (error) => {
    if (!error) { result.saved = true; }
    response.json(result);
  });
});

app.use('/files', express.static(path.resolve(options.filesDir)));
// app.use('/assets', express.static(path.resolve(options.assetsWebDir)));

app.listen(options.webPort);
log(`Webserver is listening on ${options.webPort}`);
