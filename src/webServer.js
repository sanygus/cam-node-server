var express = require('express');
var dateformat = require('dateformat');
var options = require('../options');
var getFileList = require('./getFileList');
var data = require('./data');

var app = express();
app.set('view engine', 'ejs');

app.get('/', function (request, result) {
	getFileList(function (err, myFiles) {
		var statistics = data.statistics;

		if (statistics.onlineDate != null) {
			statistics.onlineDate = dateformat(statistics.onlineDate, 'yyyy-mm-dd HH:MM:ss');
		}

		result.render('index', {
			files: myFiles,
			sd: data.sensorData,
			statistics: statistics,
			camSettings: data.camSettings,
		});
	});
});

app.get('/imgs/:img', function(request, result) {
	result.sendFile(
		request.params.img,
		{ root: options.filesDir }
	);
});

app.listen(options.webPort);

console.log('Web server listening on port', options.webPort);
