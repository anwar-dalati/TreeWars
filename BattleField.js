var BattleField = function() {

	var that = this
	var battleField = []

	this.fieldLength = 32
	this.airHeight = 10
	this.groundDepth = 4

	this.create = function() {
		console.log('create BattleField...')
		var width = that.fieldLength - 1
		var height = that.airHeight + that.groundDepth - 1
		for (var x = 0; x <= width; x++) {
			for (var y = 0; y <= height; y++) {
				var tile = require('./Tile.js').Tile()

				if (y < that.airHeight) {
					tile.setType(0)
				} else {
					tile.setType(1)
					tile.setMoisture(50)
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