//TODO: from file!
var sensorsdata = [];//array of objs
var statistics = {//statistics (received)
	allbytes: 0,
	alltime: 0,//time of trasfer (sec)
	countfiles: 0,
	countsensors: 0,
	speed: {//bytes/sec
		last: 0,
		avg: 0
	},
	update: function(bytes,time) {
		var diffbytes = bytes - this.allbytes;
		this.allbytes = bytes;//!BUG!//only for current session
		if(time!=undefined && time > 0){
			this.alltime += time/1000;//sec
			this.speed.last = diffbytes/(time/1000);//bytes/sec
			this.speed.avg = (this.speed.avg==0) ? this.speed.last : (this.speed.avg + this.speed.last)/2;
		};
	}
};

function FileServer(){

	var WebSocket = require('ws').Server;
	var fs = require('fs');
	var ws = new WebSocket({port:2929});

	ws.on('connection', function(wssocket){

		var sendfilemode = false;
		var filename = '';
		var timestart;//?
		var timeend;//?
		console.log('connect open');

		wssocket.on('message',function(data){

			if(!sendfilemode)
			{
				statistics.update(wssocket.bytesReceived);//?
				
				var datajson = JSON.parse(data);
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
						statistics.countsensors += newsensorsdata.length;
						break;
					default:
						console.log('undefined type');

				};

			}else{

				timeend = new Date();//?
				statistics.update(wssocket.bytesReceived, timeend - timestart);//?
				
				fs.writeFile('files/'+filename, data, function(){
					console.log('file '+filename+' saved!');
					sendfilemode = false;
					filename = '';
					statistics.countfiles++;
				});
			};

		});
		
		wssocket.on('close',function(){
			if(sendfilemode){//?
				timeend = new Date();
				statistics.update(wssocket.bytesReceived, timestart - timeend);
			};
			console.log('connect close');
			sendfilemode = false;
			filename = '';
		});

	});
};

module.exports = FileServer;
module.exports.sensorsdata = function(){return sensorsdata;}
module.exports.statistics = function(){return statistics;}