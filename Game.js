var Game = function() {

	var that = this
	var code = 0
	var players = []
	var environment = null

	this.create = function(code) {
		console.log('create game with code %s', code)

		that.code = code
		that.environment = require('./Environment.js').Environment()

		return that
	}

	this.join = function(player) {
		players.push(player)
		console.log('%s joined game with code %s', player.getName(), that.code)
	}

	this.getCode = function() {
		return that.code
	}

	this.getEnvironment = function() {
		return that.environment
	}
}

module.exports.Game = function(code) {
	var game = new Game();
	return game.create(code);
}