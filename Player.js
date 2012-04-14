var Player = function() {

	var that = this
	var name
	var buildings = null

	this.create = function(name) {
		console.log('Created player %s', name)

		that.name = name
		that.buildings = require('./Buildings.js').Buildings()

		return that
	}

	this.getName = function() {
		return that.name
	}

	this.getBuildings = function() {
		return that.buildings
	}
}

module.exports.Player = function(name) {
	var player = new Player();
	return player.create(name);
}