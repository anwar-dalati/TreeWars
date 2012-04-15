var Tile = function() {

	var that = this

	var moisture = 0
	var playerName = null
	var type = null // 0 = Air, 1 = Ground
	var strength
	var branches
	var storage

	this.getMoisture = function() {
		return that.moisture
	}

	this.getPlayerName = function() {
		return that.playerName
	}

	this.getType = function() {
		return that.type
	}

	this.setMoisture = function(moisture) {
		that.moisture = moisture
	}

	this.setPlayerName = function(playerName) {
		that.playerName = playerName
	}

	this.setType = function(type) {
		that.type = type
	}

	this.decreaseMoisture = function(amount) {
		that.moisture = Math.max(0, that.moisture - amount)
	}

	this.increaseMoisture = function(amount) {
		that.moisture = Math.min(100, that.moisture + amount)
	}

}

module.exports.Tile = function() {
	var tile = new Tile()
	return tile
}