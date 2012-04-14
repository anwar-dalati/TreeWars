var Player = function() {

	var that = this
	var socket = null
	var name
	var tree = null
	var buildings = null
	var host = false

	this.create = function(name, socket) {
		console.log('Created player %s', name)

		that.socket = socket
		that.name = name
		that.tree = require('./Tree.js').Tree()
		that.buildings = require('./Buildings.js').Buildings()

		return that
	}

	this.getSocket = function() {
		return that.socket
	}

	this.getName = function() {
		return that.name
	}

	this.getTree = function() {
		return that.tree
	}

	this.getBuildings = function() {
		return that.buildings
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