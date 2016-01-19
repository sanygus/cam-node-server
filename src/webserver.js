var fs = require('fs');
var express = require('express');
var async = require('async');
var dateformat = require('dateformat');
var fileServer = require('./fileserver.js');

function WebServer() {

	var filesdir = 'files';

	var app = express();
	app.set('view engine','ejs')

	app.get('/', function(request,result){
		fs.readdir(filesdir, function(err,files){
			async.map(files, function(file,callback){
				fs.stat(filesdir+'/'+file,function(er,stat){
					callback(er,{'name':file,'size':(stat.size/1024).toFixed(1)});
				});

			}, function(err,myfiles){
				var sensorsdata = fileServer.sensorsdata();
				var statistics = fileServer.statistics();
				var camSettings = fileServer.camSettings();

				if(statistics.onlineDate != null){
					statistics.onlineDate = dateformat(statistics.onlineDate,'yyyy-mm-dd HH:MM:ss');
				};

				result.render('index',{title:'mytitle',text:'Files:',files:myfiles,sd:sensorsdata,statistics:statistics,camSettings:camSettings});
			});
		});
	});

	app.get('/imgs/:img', function(request,result){
		result.sendFile(request.params.img,{root:filesdir});
	});

	app.listen(2930);
};

module.exports = WebServer;
