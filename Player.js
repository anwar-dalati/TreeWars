var Player = function() {

	var that = this
	var name

	this.create = function(name) {
		console.log('Created player %s', name)

		that.name = name

		return that
	}

	this.getName = function() {
		return that.name
	}
}

module.exports.Player = function(name) {
	var player = new Player();
	return player.create(name);
}