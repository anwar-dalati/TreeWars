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

	this.getStrength = function() {
		return that.strength
	}

	this.getBranches = function() {
		return that.branches
	}

	this.getStorage = function() {
		return that.storage
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

	this.setStrength = function(strength) {
		that.strength = strength
	}

	this.setBranches = function(branches) {
		that.branches = branches
	}

	this.setStorage = function(storage) {
		that.storage = storage
	}

	this.decreaseMoisture = function(amount) {
		that.moisture = Math.max(0, Math.pow(that.moisture, 0.4) * (1 - amount/100) )
	}

	this.increaseMoisture = function(amount) {
		that.moisture = Math.min(100, that.moisture + amount)
	}

	this.decreaseBranches = function(amount) {
		that.branches = Math.max(1, that.branches - amount)
	}

	this.increaseBranches = function(amount) {
		that.branches = Math.min(5, that.branches + amount)
	}

	this.decreaseStorage = function(amount) {
		that.storage = Math.max(0, that.storage - amount)
	}

	this.increaseStorage = function(amount) {
		that.storage = Math.min(10, that.storage + amount)
	}

	this.decreaseStrength = function(amount) {
		that.strength = Math.max(1, that.strength - amount)
	}

	this.increaseStrength = function(amount) {
		that.strength = Math.min(5, that.strength + amount)
	}

}

module.exports.Tile = function() {
	var tile = new Tile()
	return tile
}