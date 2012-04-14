var Game = function() {

	var that = this
	var code = 0
	var players = []

	this.create = function(player) {
		that.code = Math.round(Math.random() * (999999 - 100000) + 100000);

		console.log('create game with code %s', that.code)

		that.join(player)

		return that
	}

	this.join = function(player) {
		players.push(player)
	}

	this.getCode = function() {
		return that.code
	}
}

module.exports.Game = function() {
	var game = new Game();
	return game.create();
}