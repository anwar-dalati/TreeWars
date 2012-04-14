var PlayerManager = function() {

	var that = this

	this.addPlayer = function(name) {
		var player = require('./Player.js').Player(name)
		return player
	}
}

var instance = null;

module.exports.PlayerManager = function() {
	if (!instance) {
		instance = new PlayerManager();
	}

	return instance;
}