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

	this.toArray = function() {
		var tiles = []

		for (var x = 0; x < battleField.length; x++) {
			for (var y = 0; y < battleField[x].length; y++) {
				var tile = that.getBattleTile(x, y)
				if (typeof tiles[x] == 'undefined') {
					tiles[x] = []
				}

				tiles[x][y] = {
					moisture: 100,//tile.getMoisture(),
					playerName: 'test',// tile.getPlayerName(),
					type: 1// tile.getType()
				}
			}
		}

		return tiles
	}
}

module.exports.BattleField = function() {
	var battleField = new BattleField()
	battleField.create()
	return battleField
}