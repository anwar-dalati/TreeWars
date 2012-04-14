var Game = function() {

	var that = this
	var code = 0
	var players = []
	var battleField = null

	this.create = function(code, battleField) {
		console.log('create game with code %s', code)

		that.code = code
		that.battleField = battleField

		return that
	}

	this.join = function(player) {
		players.push(player)
		console.log('%s joined game with code %s', player.getName(), that.code)
	}

	this.getCode = function() {
		return that.code
	}
}

module.exports.Game = function(code, battleField) {
	var game = new Game();
	return game.create(code, battleField);
}