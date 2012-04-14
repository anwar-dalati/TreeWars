var BattleField = function() {

	var that = this
	var battleField = []

	var fieldLength = 32
	var airHeight = 10
	var groundDepth = 4

	this.create = function() {
		console.log('create BattleField...')
		var width = fieldLength - 1
		var height = airHeight + groundDepth - 1
		for (var x = 0; x <= width; x++) {
			for (var y = 0; y <= height; y++) {
				var tile = require('./Tile.js').Tile()

				if (y > airHeight - 1) {
					tile.setType(1);
				}

				that.setBattleTile(x,y,tile)
			}
		}
	}

	this.getBattleTile = function(x,y) {
		return battleField[x][y]
	}

	this.setBattleTile = function(x,y,tile) {
		if (typeof battleField[x] == 'undefined') {
			battleField[x] = []
		}
		battleField[x][y] = tile
	}
}

module.exports.BattleField = function() {
	var battleField = new BattleField()
	battleField.create()
	return battleField
}