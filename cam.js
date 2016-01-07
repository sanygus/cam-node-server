
var WebSocket = require('ws');
var fs = require('fs');
var Camera = require("camerapi");//https://www.npmjs.com/package/camerapi
var dateformat = require('dateformat');
var exec = require('child_process');

var socket = new WebSocket("ws://192.168.0.122:2929");
var socketopened = false;
var binarytrans = false;
var texttrans = false;
var sensorsvalues = [];//массив строк
var sensorsdatafile = '/tmp/sensors.data';
fs.exists(sensorsdatafile, function(exist){
	if(exist){
		fs.readFile(sensorsdatafile, function(err,data){
			if(data!=''){
				sensorsvalues = data.toString().replace(/},{/g,'}*{').split('*');
			};
		});
	};
});



function sendfile(fname){
	//TODO: no send incomplete pict//may be OK
	if(socketopened && !binarytrans && !texttrans){
		fs.readFile(fname, function(er,data){
			var fnameshort = fname.substring(fname.lastIndexOf('/')+1);
			var fnamedir = fname.substring(0,fname.lastIndexOf('/'));
			console.log('fnameshort:'+fnameshort+' fnamedir:'+fnamedir);
			console.log('sending file "'+fnameshort+'" started...');

			texttrans = true;
			socket.send('{"type":"sendfile","filename":"'+fnameshort+'"}',function(){
				texttrans = false;
				binarytrans = true;

				socket.send(data, function(){
					console.log('file '+fnameshort+' sent!');
					binarytrans = false;

					//----можно вынести, стоит ли?----
					fs.readdir(fnamedir,function(err,files){
						files = files.filter(function(fn){
							return /.*\.jpg$/.test(fn);
						}).sort().reverse();
						fs.unlink(fname,function(){
								console.log('file '+fnameshort+' deleted!');
						});
						console.log(files);
						if(files.length > 1){//unsent fotos exist
							var indcurrentfile = files.indexOf(fnameshort);
							var fnameshortnewsend = '';
							if(indcurrentfile > 0){//new photos exist
								fnameshortnewsend = files[0];//newest
							}else{
								fnameshortnewsend = files[indcurrentfile+1];//older
							};
							setTimeout(function(){
								sendfile(fnamedir+'/'+fnameshortnewsend);
							},3000);
						};
					});
					
				});

			});
		});
	}else{
		console.log('socket not opened or busy!');
	};
}

function sendsensorsdata(){

	var date = dateformat(new Date(),'yyyy-mm-dd\'T\'HH:MM:ss');
	var cputemp = exec.execSync('/opt/vc/bin/vcgencmd measure_temp').toString().substring(5,11);
	var pingt = exec.execSync('ping -c 1 -w 1 8.8.8.8;exit 0').toString().substring(91,98);
	/*var cputemp = '37.9\'C';
	var pingt = '28.9 ms';*/
	if (pingt=='nsmitte'){pingt=null;}

	var values = '{\\"date\\":\\"'+date+'\\",\\"cputemp\\":\\"'+cputemp+'\\",\\"pingtime\\":\\"'+pingt+'\\"}';//temp
	sensorsvalues.push(values);
	console.log(sensorsvalues);
	
	if(socketopened && !binarytrans && !texttrans){
		texttrans = true;
		socket.send('{"type":"sensors","data":"['+sensorsvalues+']"}',function(){
			texttrans = false;
			console.log('sent: '+'{"type":"sensors","data":"['+sensorsvalues+']"}');
			sensorsvalues = [];
			fs.writeFile(sensorsdatafile,sensorsvalues);
		});
	}else{
		console.log('sensors data not sent - socket not opened or busy!');
		fs.writeFile(sensorsdatafile,sensorsvalues);
	};
	
}



socket.on('open', function(){
	console.log('connected to server');
	socketopened = true;	
});

socket.on('close', function(){
	console.log('disconnected from server');
	socketopened = false;
	var binarytrans = false;
	var texttrans = false;
});

socket.on('error', function(){
	console.log('connecting error');
	socketopened = false;
	var binarytrans = false;
	var texttrans = false;
	//TODO:reconnect
});


var cam = new Camera();
cam.baseDirectory("/tmp/cam");

setInterval(function(){
	cam.prepare({"timeout": 200,
			"width": 2592,
			"height": 1944,
			"quality": 100
		}).takePicture(dateformat(new Date(),'yyyy-mm-dd\'T\'HH:MM:ss')+".jpg",function(file){
			console.log(file);
			sendfile(file);
		});
},15000);

setInterval(function(){
	sendsensorsdata();
},3000);
/*


*/