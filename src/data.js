module.exports.sensorsData = [];//array of objs

module.exports.statistics = { //statistics (received)
	online: false,
	onlineDate: null,
	setonline: function(online){
		this.online = online;
		this.onlineDate = new Date();
	},
	allbytes: 0,
	alltime: 0,//time of trasfer (sec)
	countfiles: 0,
	countsensors: 0,
	speed: {//bytes/sec
		last: null,
		avg: null
	},
	update: function(bytes,time) {
		var diffbytes = bytes - this.allbytes;
		this.allbytes = bytes;
		if(time!=undefined && time > 0){
			this.alltime += time/1000;//sec
			this.speed.last = diffbytes/(time/1000);//bytes/sec
			this.speed.avg = (this.speed.avg==null) ? this.speed.last : (this.speed.avg + this.speed.last)/2;
		};
	}
};

module.exports.camSettings = null;
