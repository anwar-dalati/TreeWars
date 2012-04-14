
var PlayerManager = function() {

	this.addPlayer = function() {
		console.log('player added')
	}
}

var instance = null;

module.exports.PlayerManager = function() {
	if (!instance) {
		instance = new PlayerManager();
	}

	return instance;
}