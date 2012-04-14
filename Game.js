var Game = function() {

	var that = this
	var code = 0
	var players = []
	var environment = null
	var battleField = null
	var ticks = 0

	this.create = function(code, battleField) {
		console.log('create game with code %s', code)

		that.code = code
		that.environment = require('./Environment.js').Environment()
		that.battleField = battleField

		return that
	}

	this.join = function(player) {
		players.push(player)
		console.log('%s joined game with code %s', player.getName(), that.code)
	}

	this.start = function() {
		setInterval(function() {
			that.gameLoop()
		}, 1000)
	}

	this.getCode = function() {
		return that.code
	}

	this.getEnvironment = function() {
		return that.environment
	}

	this.gameLoop = function() {
		if (++ticks % 5 == 0) {
			console.log('tick %s', ticks)
		}

		// update player's tree resources and stuff
		for (var i = 0; i < players.length; i++) {
//			player[i].getTree().updateSun(battleField)
//			player[i].getTree().updateWater(battleField)

			// just for testing purposes
			// send the battlefield to the clients on every tick
			players[i].getSocket().emit('battleField', {battleField: that.battleField.toArray()})
		}
	}
}

module.exports.Game = function(code, battleField) {
	var game = new Game();
	return game.create(code, battleField);
}