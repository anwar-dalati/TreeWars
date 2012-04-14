var GameManager = function() {

	var that = this
	var games = []

	this.createGame = function() {
		var code = that.getNewCode()
		var game = require('./Game.js').Game(code)

		games.push(game)

		return game.getCode()
	}

	this.getNewCode = function() {
		var code = that.generateCode()
		for (var i = 0; i < games.length; i++) {
			if (games[i].getCode() == code) {
				return that.getNewCode()
			}
		}
		return code
	}

	this.generateCode = function() {
		return Math.round(Math.random() * 899999 + 100000);
	}

	this.joinGame = function(code, player) {
		var game = null
		for (var i = 0; i < games.length; i++) {
			if (games[i].getCode() == code) {
				game = games[i]
				break
			}
		}

		if (game !== null) {
			game.join(player)
		}
	}
}

var instance = null;

module.exports.GameManager = function() {
	if (!instance) {
		instance = new GameManager();
	}

	return instance;
}