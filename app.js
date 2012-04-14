
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var io = require('socket.io').listen(app)
io.set('log level', 1); // reduce logging

var playerManager = require('./PlayerManager.js').PlayerManager()
var gameManager = require('./GameManager.js').GameManager()

io.sockets.on('connection', function(socket) {
	console.log('connection')

	var player = null

	socket.on('createGame', function(data) {
		var code = gameManager.getNewCode()
		gameManager.createGame(code)
		player = playerManager.addPlayer(data.playerName)
		gameManager.joinGame(code, player)
		socket.emit('createGameCode', {
			code: code
		})
	})
	socket.on('joinGame', function(data) {
		player = playerManager.addPlayer(data.playerName)
		var success = gameManager.joinGame(data.code, player)
		socket.emit('joinGameSuccess', {success: success})
	})

	socket.on('build', function(data) {
		console.log(player.getName())
	})

	//  build calls
	socket.on('buildExtendHeigth', function() {
		console.log('extend heigth of player %s', player.getName())
		player.getBuildings().extendHeigth()
	})
	socket.on('buildExtendWidth', function() {
		console.log('extend width of player %s', player.getName())
		player.getBuildings().extendWidth()
	})
	socket.on('buildPlaceRoot', function(data) {
		console.log('place root of player %s to x: %s, y: %s', player.getName(), data.x, data.y)
		player.getBuildings().placeRoot(data.x, data.y)
	})
})