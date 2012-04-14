var BattleField = function() {

	var that = this
	var battleField = []
	var tiles = []

	var fieldLength = 32
	var airHeight = 10
	var groundDepth = 4
//	var start_leaf_height = 3
//	var start_trunk_height = 1
//	var start_root_depth = 1

	this.create = function() {
		var width = fieldLength - 1
		var height = airHeight + groundDepth - 1
		for (var x = 0; x <= width; x++) {
			for (var y = 0; y <= height; y++) {
				that.setBattleTile(x,y,require('./Tile.js').Tile())
			}
		}
	}

	this.getBattleTile = function(x,y) {
		return battleField[x][y]
	}

	this.getTile = function(x,y) {

	}

	this.setBattleTile = function(x,y,tile) {
		if (typeof battleField[x] == 'undefined') {
			battleField[x] = []
		}
		battleField[x][y] = tile
	}

	this.setTile = function(x,y,tile) {
		if (typeof tiles[x] == 'undefined') {
			tiles[x] = {}
		}
		tiles[x][y] = tile
	}
}

module.exports.BattleField = function() {
	var battleField = new BattleField()
	battleField.create()
	return battleField
}