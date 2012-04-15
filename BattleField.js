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
			|| typeof that.getBattleTile(x, that.airHeight).getPlayerName() != 'undefined'
		) {
			return false
		}

		return true
	}

	this.markTileAsUsed = function(player, x) {
		that.getBattleTile(x, that.airHeight - 1).setPlayerName(player.getName())
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