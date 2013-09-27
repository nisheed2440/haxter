/**
 * This app basically shows how a device can control remotly another device via its accelerometer.
 */

//Initialize the express server
var app = require('express')()
, server = require('http').createServer(app)
, io = require('socket.io').listen(server);

//Assign the port to listen to
server.listen(8000);

//Serve the requested page as index by default
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

//Include the resources here
//Resources JS
app.get('/js/jquery10.min.js', function (req, res) {
	res.sendfile(__dirname + '/js/jquery10.min.js');
});
app.get('/js/jquery-migrate.min.js', function (req, res) {
	res.sendfile(__dirname + '/js/jquery-migrate.min.js');
});
app.get('/js/jquery-1.10.2.min.map', function (req, res) {
	res.sendfile(__dirname + '/js/jquery-1.10.2.min.map');
});
app.get('/js/bootstrap.min.js', function (req, res) {
	res.sendfile(__dirname + '/js/bootstrap.min.js');
});
//Resources CSS
app.get('/css/bootstrap.min.css', function (req, res) {
	res.sendfile(__dirname + '/css/bootstrap.min.css');
});
app.get('/css/bootstrap-responsive.min.css', function (req, res) {
	res.sendfile(__dirname + '/css/bootstrap-responsive.min.css');
});

//When a socket is connected run the following
io.sockets.on('connection', function (socket) {

	console.log('Client Connected..');	
	socket.emit('client connected',{message:'Connected successfully'});

	//When user sends data to the server
	socket.on('accel data', function (data) {
		var coordinateData = {};
		coordinateData.x = data.posX;
		coordinateData.y = data.posY;
		coordinateData.z = data.posZ;

		var tiltDir = tiltDirection(data.posX,data.posY,data.posZ);

		//Send this event to the client to do whatever
		io.sockets.emit('update accel data',{coordinateData:tiltDir});
	});

	//When socket is disconnected
	socket.on('disconnect', function (data) {
		console.log('Client Disconnected..');
		io.sockets.emit('user disconnected');
	});
});