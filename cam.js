
var WebSocket = require('ws');
var fs = require('fs');
var Camera = require("camerapi");//https://www.npmjs.com/package/camerapi
var dateformat = require('dateformat');
var exec = require('child_process');

var socket = new WebSocket("ws://hubsolar.cloudapp.net:8082");
var socketopened = false;
var binarytrans = false;

function sendfile(fname){
	if(socketopened){
		fs.readFile(fname, function(er,data){
			console.log('sending file started...');
			socket.send('{"type":"sendfile","filename":"'+fname.substring(fname.lastIndexOf('/')+1)+'"}',function(){
				binarytrans = true;
				socket.send(data, function(){
					console.log('file '+fname+' sent!');
					binarytrans = false;
				});
			});
		});
	}else{
		console.log('socket not opened!');
	};
}

function sendsensorsdata(){
	/*TODO: saving data*/
	var cputemp = exec.execSync('/opt/vc/bin/vcgencmd measure_temp').toString().substring(5,11);
	var pingt = exec.execSync('ping -c 1 -w 1 8.8.8.9;exit 0').toString().substring(91,98);
	if (pingt=='nsmitte'){pingt=null;}

	var data = '{\\"cputemp\\":\\"'+cputemp+'\\",\\"pingtime\\":\\"'+pingt+'\\"}';//temp
	 
	

	if(socketopened && !binarytrans){
		socket.send('{"type":"sensors","data":"'+data+'"}',function(){
			console.log('sent: '+data);
		});
	}else{
		console.log('sensors data not sent - socket not opened or binary data transfer!');
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

setInterval(function(){
	sendsensorsdata();
},3000);
/*


*/