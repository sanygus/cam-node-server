//TODO: from file!
var sensorsdata=[];//массив объектов

function FileServer(){

	var WebSocket = require('ws').Server;
	var fs = require('fs');
	var ws = new WebSocket({port:2929});

	ws.on('connection', function(wssocket){
		var sendfilemode = false;
		var filename = '';

		console.log('connect open');

		wssocket.on('message',function(data){

			if(!sendfilemode)
			{
				var datajson = JSON.parse(data);
				switch(datajson.type)
				{
					case 'sendfile':
						sendfilemode = true;
						filename = datajson.filename;
						console.log('file receive start');	
						break;
					case 'sensors':
						sensorsdata = sensorsdata.concat(JSON.parse(datajson.data));
						console.log(sensorsdata);
						break;
					default:
						console.log('undefined type');

				};

			}else{
				fs.writeFile('files/'+filename, data, function(){
					console.log('file '+filename+' saved!');
					sendfilemode = false;
					filename = '';
				});
			};

		});
		
		wssocket.on('close',function(){
			console.log('connect close');
			sendfilemode = false;
			filename = '';
		});

	});
};

module.exports = FileServer;
module.exports.sensorsdata = function(){return sensorsdata;}