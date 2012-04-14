var GameManager = function() {

	var that = this
	var games = []

	this.createGame = function() {
		var game = require('./Game.js').Game()
		games.push(game)

		return game.getCode()
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
			console.log('join game with code %s', code)
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