var Game = function() {

	var that = this
	var code = 0

	this.create = function() {
		that.code = Math.round(Math.random() * (999999 - 100000) + 100000);

		console.log('create game with code %s', that.code)

		return that
	}

	this.getCode = function() {
		return that.code
	}
}

module.exports.Game = function() {
	var game = new Game();
	return game.create();
}