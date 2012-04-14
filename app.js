
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
	var game = null

	socket.on('createGame', function(data) {
		var code = gameManager.getNewCode()
		gameManager.createGame(code)
		player = playerManager.addPlayer(data.playerName)
		game = gameManager.joinGame(code, player)
		player.setHost(true)

		socket.emit('createGameCode', {
			code: code
		})
	})
	socket.on('joinGame', function(data) {
		player = playerManager.addPlayer(data.playerName)
		game = gameManager.joinGame(data.code, player)
		socket.emit('joinGameSuccess', {success: game !== null})
	})
	socket.on('startGame', function() {
		if (player.isHost()) {
			console.log('game started by %s', player.getName())
			game.start()
		}
	})
	socket.on('bgGame', function() {
		if (player.isHost()) {
			game.bg()
		}
	})

	socket.on('build', function(data) {
		console.log(player.getName())
	})

	//  build calls
	socket.on('buildExtendTreeHeigth', function() {
		console.log('extend heigth of player %s', player.getName())
		player.getBuildings().extendTreeHeigth()
	})
	socket.on('buildExtendTreeWidth', function() {
		console.log('extend width of player %s', player.getName())
		player.getBuildings().extendTreeWidth()
	})
	socket.on('buildExtendLeafDensity', function() {
		console.log('extend leaf density of player %s', player.getName())
		player.getBuildings().extendLeafDensity()
	})
	socket.on('buildPlaceRoot', function(data) {
		console.log('place root of player %s to x: %s, y: %s', player.getName(), data.x, data.y)
		player.getBuildings().placeRoot(data.x, data.y)
	})
	socket.on('buildExtendRootDensity', function() {
		console.log('extend root density of player %s', player.getName())
		player.getBuildings().extendRootDensity()
	})
	socket.on('buildExtendRootWidth', function() {
		console.log('extend root width of player %s', player.getName())
		player.getBuildings().extendRootWidth()
	})

	// environment callc
	socket.on('summonRain', function() {
		console.log('summoning rain by %s', player.getName())
		game.getEnvironment().setRain()
	})
	socket.on('summonSunshine', function() {
		console.log('summoning sunshine by %s', player.getName())
		game.getEnvironment().sunshine()
	})
	socket.on('summonSpring', function() {
		console.log('summoning spring by %s', player.getName())
		game.getEnvironment().spring()
	})
	socket.on('summonColdSnap', function() {
		console.log('summoning cold snap by %s', player.getName())
		game.getEnvironment().coldSnap()
	})
	socket.on('summonDrouth', function() {
		console.log('summoning drouth by %s', player.getName())
		game.getEnvironment().drouth()
	})
	socket.on('summonStorm', function() {
		console.log('summoning storm by %s', player.getName())
		game.getEnvironment().storm()
	})
})