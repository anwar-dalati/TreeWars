var Game = function() {

	var that = this
	var code = 0
	var players = []
	var environment = null
	var battleField = null
	var ticks = 0
	var trees = []

	var increaseMoistureByRain = 5

	this.create = function(code, battleField) {
		console.log('create game with code %s', code)

		that.code = code
		that.environment = require('./Environment.js').Environment()
		that.battleField = battleField

		return that
	}

	this.join = function(player) {
		players.push(player)
		console.log('%s joined game with code %s', player.getName(), that.code)
	}

	this.start = function() {
		setInterval(function() {
			that.gameLoop()
		}, 1000)
	}

	this.nextTick = function() {
		that.gameLoop()
	}

	this.getCode = function() {
		return that.code
	}

	this.getEnvironment = function() {
		return that.environment
	}

	this.placeTree = function(x, player) {
		if (!that.battleField.isAvailable(x)) {
			console.log('There is already placed a tree here')
			return false
		}

		if (typeof trees[player.getName()] != 'undefined') {
			console.log('You have already placed your tree')
			return false
		}

		console.log('player %s placed tree at %s', player.getName(), x)
		that.battleField.markTile(player.getName(), x)
		trees[player.getName()] = require('./Tree.js').Tree()
		return true
	}

	this.gameLoop = function() {
		if (++ticks % 5 == 0) {
			console.log('tick %s', ticks)
		}

		// update player's tree resources and stuff
		for (var i = 0; i < players.length; i++) {
			// DUMMY RESOURCE ADDING
			// TODO: later to be calculated by the ResourceCalculator using the battleField
			players[i].getTree().changeSun(1)
			players[i].getTree().changeWater(1)

			that.updatePlayerResources()

			// just for testing purposes
			// TODO: send the battlefield to the clients on every tick
			players[i].getSocket().emit('battleField', {battleField: that.battleField.toArray()})
		}

		if (that.environment.getRainTicks()) {
			that.rain();
		}

		that.environment.decreaseTicks();
	}

	this.rain = function() {
		console.log('its raining')
		for (var x = 0; x < that.battleField.fieldLength; x++) {
			for (var y = that.battleField.airHeight; y < that.battleField.airHeight + that.battleField.groundDepth; y++) {
				that.battleField.getBattleTile(x, y).increaseMoisture(increaseMoistureByRain);
			}
		}
	}

	this.bg = function() {
		var line = ''
		for (var x = 0; x < that.battleField.fieldLength; x++) {
			line += that.lpad(x, 5) + ' '
		}
		console.log(line)

		var content;
		for (var y = 0; y < that.battleField.airHeight + that.battleField.groundDepth; y++) {
			line = ''
			for (var x = 0; x < that.battleField.fieldLength; x++) {
				if (that.battleField.getBattleTile(x,y).getType()) {
					content = that.battleField.getBattleTile(x,y).getMoisture();
				} else {
					content = '.';
				}
				line += that.lpad(content, 5) + ' '
			}
			console.log(line)
		}
	}

	this.lpad = function(str, length, pad) {
		str = String(str)
		length = length || 3
		pad = pad || " "
		while (str.length < length) {
			str = pad + str;
		}
		return str
	}

	this.rpad = function(str, length, pad) {
		str = String(str)
		length = length || 3
		pad = pad || " "
		while (str.length < length) {
			str += pad;
		}
		return str
	}

	this.updatePlayerResources = function() {
		for (var i = 0; i < players.length; i++) {
			players[i].getSocket().emit('updatePlayerResources', {
				healthPoints: players[i].getTree().getHealthPoints(),
				sun: players[i].getTree().getSun(),
				water: players[i].getTree().getWater()
			})
		}
	}
}

module.exports.Game = function(code, battleField) {
	var game = new Game();
	return game.create(code, battleField);
}