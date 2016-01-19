var express = require('express');
var dateformat = require('dateformat');
var fileServer = require('./fileserver.js');
var options = require('../options');
var getFileList = require('./getFileList');

var app = express();
app.set('view engine', 'ejs');

app.get('/', function (request, result) {
	getFileList(function (err, myFiles) {
		var sensorsdata = fileServer.sensorsdata();
		var statistics = fileServer.statistics();
		var camSettings = fileServer.camSettings();

		if (statistics.onlineDate != null) {
			statistics.onlineDate = dateformat(statistics.onlineDate, 'yyyy-mm-dd HH:MM:ss');
		}

		result.render('index', {
			files: myFiles,
			sd: sensorsdata,
			statistics: statistics,
			camSettings: camSettings,
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
