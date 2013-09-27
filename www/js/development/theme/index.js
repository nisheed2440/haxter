var geoApp = function(options){
	var _this = this;
	this.defaults = {
			ipAddress:'127.0.0.1',
			port:'8000',
			ssl:false
	};
	this.socketInstance = null;
	this.watchId = null;
	this.options = $.extend(_this.defaults,options,true);

	this.geoConnect = function(){
		var connectAddress = _this.options.ssl + '://' + _this.options.ipAddress + ':' + _this.options.port;

		if(_this.socketInstance === null){

			_this.socketInstance = io.connect(connectAddress, {'force new connection':true});
			console.log('Socket Initialized');

			//When the socket connects successfully.
			_this.socketInstance.on('connect',function(){
				_this.geoStartWatch(_this.options.frequency);
			});

			_this.socketInstance.on('poolers',function(data){		
					
				//Draws the  json data onto the maps
				
			});

		} else {
			_this.geoStartWatch(_this.options.frequency);
		}	
	};
	
	this.broadcastLocation = function(){
		//continuously broadcast location
	};

	this.geoStartWatch = function(frequency){
		frequency = frequency || 500;
		var options = { frequency: frequency };
		_this.watchId =  navigator.geolocation.watchPosition(_this.geoSuccess, _this.geoError, options);

		console.log('Accelerometer watch initialized');
		return;
	};

	this.geoStopWatch = function(){
		if (_this.watchId) {
			navigator.geolocation.clearWatch(_this.watchId);
			_this.watchId = null;
		}
		return;
	};
	
	this.geoSuccess = function(position){
		//update the coordinates in the view on google maps
		
		
		//send data to the server via the socket
		if(_this.socketInstance !== null){
			_this.socketInstance.emit('find poolers',{
				lat:acceleration.latitude,
				long:acceleration.longitude});
		}
	};
	
	this.geoError = function(){
		console.log('Geolocation error');
	};
};

//device APIs are available

function onDeviceReady() {
	//Flag to check the disconnect function later
	var socketCreated = false;
	
	$('#ip-setup-form-submit').bind('click',function(e){
		var ip   = $('#ip-address').val();
		var port = $('#ip-port').val();
		var ssl  = $('#ip-ssl').is(':checked');
		
		alert(ip  + ' ' + port + ' ' + ssl);
		
		$('#geo-setup').fadeOut('fast',function(){
			$('#geo-maps').fadeIn('fast',function(){
				
				//Initializations go here
				var geoData = new geoApp({
					ipAddress : ip,
					port: port,
					ssl : ssl,
					frequency:300,
				});
				
				$('#pooler-find').bind('click',function(e){
					e.preventDefault();	
					geoData.geoConnect();
				});
				
				$('#broadcast-location').bind('click',function(e){
					e.preventDefault();	
					geoData.broadcastLocation();
				});
			});
		});
	});
}
//Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);




