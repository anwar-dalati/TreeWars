var Player = function() {

	var that = this
	var socket = null
	var name
	var host = false

	this.create = function(name, socket) {
		console.log('Created player %s', name)

		that.socket = socket
		that.name = name
		that.tree = require('./Tree.js').Tree()

		return that
	}

	this.getSocket = function() {
		return that.socket
	}

	this.getName = function() {
		return that.name
	}

	this.setHost = function(host) {
		that.host = host
	}

	this.isHost = function() {
		return that.host
	}
}

module.exports.Player = function(name, socket) {
	var player = new Player();
	return player.create(name, socket);
}