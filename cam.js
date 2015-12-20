
var WebSocket = require('ws');
var fs = require('fs');
var Camera = require("camerapi");//https://www.npmjs.com/package/camerapi
var dateformat = require('dateformat');

var socket = new WebSocket("ws://192.168.0.122:2929");
var socketopened = false;

function sendfile(fname){
	if(socketopened){
		fs.readFile(fname, function(er,data){
			console.log('sending file started...');
			socket.send('{"type":"sendfile","filename":"'+fname.substring(fname.lastIndexOf('/')+1)+'"}',function(){
				socket.send(data, function(){
					console.log('file '+fname+' sent!');
				});
			});
		});
	}else{
		console.log('socket not opened!');
	};
}

socket.on('open', function(){
	console.log('connected to server');
	socketopened = true;	
});

socket.on('close', function(){
	console.log('disconnected from server');
	socketopened = false;
});

socket.on('error', function(){
	console.log('connecting error');
	socketopened = false;
});


var cam = new Camera();
cam.baseDirectory("/tmp/cam");

setInterval(function(){
	cam.prepare({"timeout": 200,
			"width": 2592,
			"height": 1944,
			"quality": 100
		}).takePicture(dateformat(new Date(),'isoDateTime').replace('+0300','')+".jpg",function(file){
			console.log(file);
			sendfile(file);
		});
},10000);

/*


*/