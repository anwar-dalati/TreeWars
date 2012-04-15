
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
	var player2 = null
	var player3 = null
	var player4 = null
	var game = null

	socket.on('createGame', function(data) {
		var code = gameManager.getNewCode()
		gameManager.createGame(code)
		player = playerManager.addPlayer(data.playerName, socket)
		game = gameManager.joinGame(code, player)
		player.setHost(true)

		socket.emit('createGameCode', {
			code: code
		})
	})
	socket.on('joinGame', function(data) {
		player = playerManager.addPlayer(data.playerName, socket)
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
			game.bg(player)
		}
	})
	socket.on('nextGame', function() {
		if (player.isHost()) {
			game.nextTick()
		}
	})
	socket.on('placeTreeGame', function(data) {
		game.placeTree(player, data.x)
	})
	socket.on('growRootGame', function(data) {
		game.growRoot(player, data.x, data.y)
	})
	socket.on('strengthRootGame', function() {
		game.strengthRoot(player)
	})
	socket.on('branchesRootGame', function() {
		game.branchesRoot(player)
	})
	socket.on('batch', function() {
		var code = gameManager.getNewCode()
		gameManager.createGame(code)
		player = playerManager.addPlayer('1', socket)
		game = gameManager.joinGame(code, player)
		player.setHost(true)
		player2 = playerManager.addPlayer('2', socket)
		game = gameManager.joinGame(code, player2)
		player3 = playerManager.addPlayer('3', socket)
		game = gameManager.joinGame(code, player3)
		player4 = playerManager.addPlayer('4', socket)
		game = gameManager.joinGame(code, player4)
		game.placeTree(player2, 13)
		game.growRoot(player2, 14,11)
		game.strengthRoot(player2)
		game.placeTree(player3, 16)
		game.strengthRoot(player3)
		game.strengthRoot(player3)
		game.growRoot(player3, 17,11)
		game.placeTree(player4, 19)
		game.growRoot(player4, 19,11)
		game.strengthRoot(player4)
		game.strengthRoot(player4)
		game.strengthRoot(player4)
		game.strengthRoot(player4)
		game.placeTree(player, 10)
		game.strengthRoot(player)
		game.strengthRoot(player)
		game.strengthRoot(player)
		game.bg(player)
		game.growRoot(player, 11,11)
		game.growRoot(player, 12,11)
		game.growRoot(player, 13,11)
		game.growRoot(player, 14,11)
		game.growRoot(player, 15,11)
		game.growRoot(player, 16,11)
		game.growRoot(player, 17,11)
		game.growRoot(player, 18,11)
		game.growRoot(player, 19,11)
		game.growRoot(player, 20,11)
		game.bg(player)
		game.strengthRoot(player2)
		game.strengthRoot(player2)
		game.strengthRoot(player2)
		game.growRoot(player2, 13,11)
		game.bg(player)
	})

	socket.on('build', function(data) {
		console.log(player.getName())
	})

	// build calls
	socket.on('buildExtendTreeHeigth', function() {
		console.log('extend heigth of player %s', player.getName())
		player.getTree().extendTreeHeigth()
	})
	socket.on('buildExtendTreeWidth', function() {
		console.log('extend width of player %s', player.getName())
		player.getTree().extendTreeWidth()
	})
	socket.on('buildExtendLeafDensity', function() {
		console.log('extend leaf density of player %s', player.getName())
		player.getTree().extendLeafDensity()
	})
	socket.on('buildExtendRootStrength', function() {
		console.log('extend root density of player %s', player.getName())
		game.strengthRoot(player)
		player.getTree().extendRootStrength()
	})
	socket.on('buildExtendRootWidth', function() {
		console.log('extend root width of player %s', player.getName())
		player.getTree().extendRootWidth()
		game.branchRoot(player)
	})

	// environment calls
	socket.on('summonRain', function() {
		console.log('summoning rain by %s', player.getName())
		game.getEnvironment().setRain()
	})
	socket.on('summonSunshine', function() {
		console.log('summoning sunshine by %s', player.getName())
		game.getEnvironment().setSunshine()
	})
	socket.on('summonSpring', function() {
		console.log('summoning spring by %s', player.getName())
		game.getEnvironment().setSpring()
	})
	socket.on('summonColdSnap', function() {
		console.log('summoning cold snap by %s', player.getName())
		game.getEnvironment().setColdSnap()
	})
	socket.on('summonDrought', function() {
		console.log('summoning drouth by %s', player.getName())
		game.getEnvironment().setDrought()
	})
	socket.on('summonStorm', function() {
		console.log('summoning storm by %s', player.getName())
		game.getEnvironment().setStorm()
	})
})