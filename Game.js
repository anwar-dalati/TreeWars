var Game = function() {

	var that = this
	var code = 0
	var players = []
	var environment = null
	var battleField = null
	var ticks = 0

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

	this.gameLoop = function() {
		if (++ticks % 5 == 0) {
			console.log('tick %s', ticks)
		}

		// update player's tree resources and stuff
		for (var i = 0; i < players.length; i++) {
//			player[i].getTree().updateSun(battleField)
//			player[i].getTree().updateWater(battleField)

			// just for testing purposes
			// send the battlefield to the clients on every tick
			players[i].getSocket().emit('battleField', {battleField: that.battleField.toArray()})
		}

		if (that.environment.getRainTicks()) {
			that.rain();
		}

		that.environment.decreaseTicks();
	}

	this.rain = function() {
		for (var x = 0; x <= battleField.fieldLength; x++) {
			for (var y = battleField.airHeight; y <= battleField.airHeight + battleField.groundDepth; y++) {
				battleField.getBattleTile(x, y).increaseMoisture(increaseMoistureByRain);
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
}

module.exports.Game = function(code, battleField) {
	var game = new Game();
	return game.create(code, battleField);
}