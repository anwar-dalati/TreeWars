var PlayerManager = function() {

	var that = this

	this.addPlayer = function(name, socket) {
		var player = require('./Player.js').Player(name, socket)
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