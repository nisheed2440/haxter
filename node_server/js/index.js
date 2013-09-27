var geoApp = function(options){
	var _this = this;
	this.defaults = {
			ipAddress:'127.0.0.1',
			port:'8000',
			ssl:'http'
	};
	this.socketInstance = null;
	this.watchId = null;
	this.options = $.extend(_this.defaults,options,true);

	this.geoConnect = function(){
		var connectAddress = _this.options.ssl + '://' + _this.options.ipAddress + ':' + _this.options.port;

		if(_this.socketInstance === null){

			_this.socketInstance = io.connect(connectAddress, {'force new connection':true});
			console.log('Socket Initialized');
			console.log(connectAddress);

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

		console.log('Geolocation watch initialized');
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
			console.log(position);
			
			_this.socketInstance.emit('find poolers',{
				lat:position.coords.latitude,
				long:position.coords.longitude
			});
		}
	};
	
	this.geoError = function(){
		console.log('Geolocation error');
	};
};



$(document).ready(function(){
	//Flag to check the disconnect function later
	var socketCreated = false;
	
	$('#ip-setup-form-submit').bind('click',function(e){
		var ip   = $('#ip-address').val();
		var port = $('#ip-port').val();
		
		$('#geo-setup').fadeOut('fast',function(){
			$('#geo-maps').fadeIn('fast',function(){
				
				//Initializations go here
				var geoData = new geoApp({
					ipAddress : ip,
					port: port,
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
});




