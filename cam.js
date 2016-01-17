
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
			if(data != ''){
				sensorsvalues = data.toString().replace(/},{/g,'}*{').split('*');
			};
		});
	};
});
var settingsfile = '/tmp/settings.data';
var settings;


function sendfile(fname){
	//TODO: no send incomplete pict//may be OK
	if(socketopened && !binarytrans && !texttrans){
		fs.readFile(fname, function(er,data){
			var fnamedir = fname.substring(0,fname.lastIndexOf('/'));
			var fnameshort = fname.substring(fname.lastIndexOf('/')+1);
			console.log('fnameshort:'+fnameshort+' fnamedir:'+fnamedir);
			console.log('sending file "'+fnameshort+'" started...');

			texttrans = true;
			socket.send('{"type":"sendfile","filename":"'+fnameshort+'"}',function(){
				texttrans = false;
				binarytrans = true;

				socket.send(data, function(){
					console.log('file '+fnameshort+' sent!');
					binarytrans = false;
					fs.readdir(fnamedir,function(err,files){
						files = files.filter(function(fn){
							return /.*\.(jpg|h264)$/.test(fn);
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
	sendSettings();//2
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


//---SETTINGS----
getSettings().then(function(result){//переписать
	settings = result;
	fs.writeFile(settingsfile, JSON.stringify(result));
	console.log(settings);
	sendSettings();//2
});

function getSettings(){//file or default

	var defaultSettings = {
		photo: {
			width: 2592,//px
			height: 1944,//px
			quality: 100,//%
			timeout: 200//ms
		},
		video: {
			width: 1280,//px
			height: 720,//px
			framerate: 15,//fps
			bitrate: 15000000,//bits/s//1080p30 a high quality bitrate would be 15Mbits/s or more
			time: 20000//ms
		}
	};

	return new Promise(function(resolve){
		fs.exists(settingsfile, function(exist){
			if(exist){
				fs.readFile(settingsfile, function(err,data){
					if(data != ''){
						resolve(JSON.parse(data));
						console.log('settings loaded from file');
					}else{
						resolve(defaultSettings);
						console.log('data is empty');
					};
				});
			}else{
				resolve(defaultSettings);
				console.log('file not exist');
			};
		});
	});

};

function sendSettings(){
	if(socketopened && !binarytrans && !texttrans && typeof settings === 'object'){
		texttrans = true;
		socket.send('{"type":"settings","data":'+JSON.stringify(settings)+'}',function(){
			texttrans = false;
			console.log('settings sent');
		});
	}else{
		console.log('settings not sent - socket not opened or busy! or settings is not object');
	};
};


//---CAMERA----
var cam = new Camera();
cam.baseDirectory("/tmp/cam");

function takePhoto(){
	if (typeof settings === 'object'){
		cam.prepare({"timeout": settings.photo.timeout,
			"width": settings.photo.width,
			"height": settings.photo.height,
			"quality": settings.photo.quality
		}).takePicture(dateformat(new Date(),'yyyy-mm-dd\'T\'HH:MM:ss')+".jpg",function(file,err){
			console.log(file);
			sendfile(file);
		});
	}else{
		console.log('settings is undefined')
	};
};

function takeVideo(){//https://www.raspberrypi.org/documentation/raspbian/applications/camera.md
	if (typeof settings === 'object'){
		cam.nopreview()
		.width(settings.video.width)
		.height(settings.video.height)
		.framerate(settings.video.framerate)
		//.bitrate(settings.video.bitrate)//bits/s//1080p30 a high quality bitrate would be 15Mbits/s or more
		.timeout(settings.video.time)
		.recordVideo(dateformat(new Date(),'yyyy-mm-dd\'T\'HH:MM:ss')+".h264",function(file,err){
			console.log(file);
			sendfile(file);
		});
	}else{
		console.log('settings is undefined')
	};
};
//takeVideo();
/*
setInterval(function(){//photo or video
	takePhoto();
},15000);

setInterval(function(){
	sendsensorsdata();
},3000);
*/

//---END----
/*
TODO:
-get settings from server
-change settings
-photo and videorec logic
-sending data logic
*/