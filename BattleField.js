var BattleField = function() {

	var that = this
	var battleField = []

	this.fieldLength = 33
	this.airHeight = 10
	this.groundDepth = 4
	this.maxTreeWidth = 19

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
					tile.setBranches(1)
					tile.setStrength(1)
					tile.setStorage(0)
				}

				that.setBattleTile(x,y,tile)
			}
		}
	}

	this.isAvailable = function(x) {
		var sideWidth = (that.maxTreeWidth - 1) / 2
		if (x - sideWidth <= 0
			|| x + sideWidth >= that.fieldLength
			|| typeof that.getBattleTile(x, that.airHeight-1).getPlayerName() != 'undefined'
			|| typeof that.getBattleTile(x+1, that.airHeight-1).getPlayerName() != 'undefined'
			|| typeof that.getBattleTile(x+2, that.airHeight-1).getPlayerName() != 'undefined'
			|| typeof that.getBattleTile(x-1, that.airHeight-1).getPlayerName() != 'undefined'
			|| typeof that.getBattleTile(x-2, that.airHeight-1).getPlayerName() != 'undefined'
		) {
			return false
		}

		return true
	}

	this.markTileAsUsed = function(player, x) {
		that.getBattleTile(x, that.airHeight - 1).setPlayerName(player.getName())
	}

	this.getBattleTile = function(x,y) {
		if (typeof battleField[x] == 'undefined') {
			return null
		}
		return (typeof battleField[x][y] != 'undefined') ? battleField[x][y] : null
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