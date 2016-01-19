var WebSocket = require('ws').Server;
var fs = require('fs');
var data = require('./data');
var options = require('../options');

var ws = new WebSocket({ port: options.wsPort });

var bytesReceivedOld = null;

ws.on('connection', function(wssocket){

	var sendfilemode = false;
	var filename = '';
	var timestart;//?
	var timeend;//?
	console.log('connect open');
	if(bytesReceivedOld != null){
		wssocket.bytesReceived = bytesReceivedOld;
	};
	data.statistics.setonline(true);

	wssocket.on('message',function(msgData){

		if(!sendfilemode)
		{
			data.statistics.update(wssocket.bytesReceived);//?

			var datajson = JSON.parse(msgData);
			switch(datajson.type)
			{
				case 'sendfile':
					sendfilemode = true;
					filename = datajson.filename;
					console.log('file receive '+filename+' start');
					timestart = new Date();//?
					break;
				case 'sensors':
					var newsensorsdata = JSON.parse(datajson.data);
					sensorsdata = sensorsdata.concat(newsensorsdata);
					//console.log(sensorsdata);
					data.statistics.countsensors += newsensorsdata.length;
					break;
				case 'settings':
					data.camSettings = datajson.data;
					console.log('get settings');
					console.log(data.camSettings);
					break;
				default:
					console.log('undefined type');

			};

		}else{

			timeend = new Date();//?
			data.statistics.update(wssocket.bytesReceived, timeend - timestart);//?

			fs.writeFile('files/'+filename, data, function(){
				console.log('file '+filename+' saved!');
				sendfilemode = false;
				filename = '';
				data.statistics.countfiles++;
			});
		};

	});

	wssocket.on('close',function(){
		if(sendfilemode){//?
			timeend = new Date();
			data.statistics.update(wssocket.bytesReceived, timestart - timeend);
		}else{
			data.statistics.update(wssocket.bytesReceived);
		};
		data.statistics.setonline(false);
		bytesReceivedOld = wssocket.bytesReceived;
		console.log('connect close');
		sendfilemode = false;
		filename = '';
	});

});
