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

	this.placeTree = function(player, x) {
		if (!that.battleField.isAvailable(x)) {
			console.log('You cant place your tree here')
			return false
		}

		if (typeof trees[player.getName()] != 'undefined') {
			console.log('You have already placed your tree')
			return false
		}

		console.log('player %s placed tree at %s', player.getName(), x)
		that.battleField.markTileAsUsed(player, x)
		trees[player.getName()] = require('./Tree.js').Tree()

		trees[player.getName()].setRootStrength(1)

		that.placeRoot(player, x, that.battleField.airHeight)
		that.placeRoot(player, x+1, that.battleField.airHeight)

		return true
	}

	this.placeRoot = function(player, x, y) {
		that.battleField.getBattleTile(x,y).setPlayerName(player.getName())
	}

	this.growRoot = function(player, x, y) {
		if (!that.canRootGrowHere(x,y)) {
			return false
		}

		console.log('player %s groth roots to %s:%s', player.getName(), x, y)
	}

	this.canRootGrowHere = function(player, x,y) {
		var rootStrength = trees[player.getName()].getRootStrength()
		var tile = that.battleField.getBattleTile(x,y)
		if (!tile.getType() || (typeof tile.getPlayerName() != 'undefined' && tile.getPlayerName() == player.getName()) || (tile.getStrength() > rootStrength)) {
			return false
		}

		tile = that.battleField.getBattleTile(x,that.battleField.airHeight - 1)
		if (typeof tile.getPlayerName() != 'undefined' && tile.getPlayerName() != player.getName()) {
			return false
		}

		tile = that.battleField.getBattleTile(x-1,that.battleField.airHeight - 1)
		if (tile != null && typeof tile.getPlayerName() != 'undefined' && tile.getPlayerName() != player.getName()) {
			return false
		}

		tile = that.battleField.getBattleTile(x,y-1)
		if (tile != null && typeof tile != 'undefined' && tile.getType() && typeof tile.getPlayerName() != 'undefined' && tile.getPlayerName() == player.getName()) {
			return true
		}

		tile = that.battleField.getBattleTile(x,y+1)
		if (tile != null && typeof tile != 'undefined' && tile.getType() && typeof tile.getPlayerName() != 'undefined' && tile.getPlayerName() == player.getName()) {
			return true
		}

		tile = that.battleField.getBattleTile(x-1,y)
		if (tile != null && typeof tile != 'undefined' && tile.getType() && typeof tile.getPlayerName() != 'undefined' && tile.getPlayerName() == player.getName()) {
			return true
		}

		tile = that.battleField.getBattleTile(x+1,y)
		if (tile != null && typeof tile != 'undefined' && tile.getType() && typeof tile.getPlayerName() != 'undefined' && tile.getPlayerName() == player.getName()) {
			return true
		}

		return false
	}

	this.strengthRoot = function(player) {
		console.log('player %s strength the roots', player.getName())
		var tile
		for (var x = 0; x < that.battleField.fieldLength; x++) {
			for (var y = that.battleField.airHeight; y < that.battleField.airHeight + that.battleField.groundDepth; y++) {
				tile = that.battleField.getBattleTile(x, y)
				if (typeof tile.getPlayerName() != 'undefined' && tile.getPlayerName() == player.getName()) {
					that.battleField.getBattleTile(x, y).increaseStrength(1)
				};
			}
		}
	}

	this.branchRoot = function(player) {
		console.log('player %s branches the roots', player.getName())
		var tile
		for (var x = 0; x < that.battleField.fieldLength; x++) {
			for (var y = that.battleField.airHeight; y < that.battleField.airHeight + that.battleField.groundDepth; y++) {
				tile = that.battleField.getBattleTile(x, y)
				if (typeof tile.getPlayerName() != 'undefined' && tile.getPlayerName() == player.getName()) {
					that.battleField.getBattleTile(x, y).increaseBranches(1)
				};
			}
		}
	}

	this.gameLoop = function() {
		if (++ticks % 5 == 0) {
			console.log('tick %s', ticks)
		}

		// environment updates needed to do every tick
		if (that.environment.getRainTicks()) {
			that.rain(that.environment.getRainTicks() > 0);
		}
		that.sunshine(that.environment.getSunshineTicks() > 0)
		that.spring(that.environment.getSpringTicks() > 0)
		that.coldSnap(that.environment.getColdSnapTicks() > 0)
		that.drought(that.environment.getDroughtTicks() > 0)
		that.storm(that.environment.getStormTicks() > 0)
		that.environment.decreaseTicks();

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

			var envStates = []
			if (that.environment.getRainTicks() > 0) {
				envStates.push({name: 'Rain', ticks: that.environment.getRainTicks()})
			}
			if (that.environment.getSunshineTicks() > 0) {
				envStates.push({name: 'Sunshine', ticks: that.environment.getSunshineTicks()})
			}
			if (that.environment.getSpringTicks() > 0) {
				envStates.push({name: 'Spring', ticks: that.environment.getSpringTicks()})
			}
			if (that.environment.getColdSnapTicks() > 0) {
				envStates.push({name: 'Cold Snap', ticks: that.environment.getColdSnapTicks()})
			}
			if (that.environment.getDroughtTicks() > 0) {
				envStates.push({name: 'Drought', ticks: that.environment.getDroughtTicks()})
			}
			if (that.environment.getStormTicks() > 0) {
				envStates.push({name: 'Storm', ticks: that.environment.getStormTicks()})
			}
			players[i].getSocket().emit('updateCurrentEnvironment', {states: envStates})
		}
	}

	this.rain = function() {
		console.log('its raining')
		for (var x = 0; x < that.battleField.fieldLength; x++) {
			for (var y = that.battleField.airHeight; y < that.battleField.airHeight + that.battleField.groundDepth; y++) {
				that.battleField.getBattleTile(x, y).increaseMoisture(increaseMoistureByRain);
			}
		}
	}

	this.sunshine = function(active) {
		if (active) {
			console.log('its shining')
		}
	}

	this.spring = function(active) {
		if (active) {
			console.log('its spring')
		}
	}

	this.coldSnap = function(active) {
		if (active) {
			console.log('its cold')
		}
	}

	this.drought = function(active) {
		if (active) {
			console.log('its droughn')
		}
	}

	this.storm = function(active) {
		if (active) {
			console.log('its stormy')
		}
	}

	this.bg = function(player) {
		var line = 'y \\ x '
		for (var x = 0; x < that.battleField.fieldLength; x++) {
			line += that.lpad(x, 5) + ' '
		}
		console.log(line)

		var content
		var tile
		for (var y = 0; y < that.battleField.airHeight + that.battleField.groundDepth; y++) {
			if (y >= that.battleField.airHeight) {
				line = ' ' + y
			} else {
				line = that.lpad(y, 5) + ' '
			}
			for (x = 0; x < that.battleField.fieldLength; x++) {
				if (y < that.battleField.airHeight && x == that.battleField.fieldLength) {
					continue
				}
				// present Players
				content = that.getPresentPlayersAtCoord(x,y)
				if (typeof content == 'object') {
					content = content.join(',')
					if (!content.length) {
						line += that.lpad('-', 5) + ' '
						continue
					}
				}
				if (typeof content == 'undefined') {
					line += that.lpad('-', 5) + ' '
					continue
				}

				// Root
//				if (that.battleField.getBattleTile(x,y).getType()) {
//					tile = that.battleField.getBattleTile(x,y)
//					if (typeof tile.getPlayerName() != 'undefined') {
//						content = tile.getStrength() + ':' + tile.getBranches() + ':' + tile.getStorage()
//					} else {
//						content = '.'
//					}
//				} else {
//					content = '.'
//				}

				// Moisture
//				if (that.battleField.getBattleTile(x,y).getType()) {
//					content = that.battleField.getBattleTile(x,y).getMoisture();
//				} else {
//					content = '.';
//				}

				// can root grow
//				content =  (that.canRootGrowHere(player,x,y)) ? '1': content = '.'

				line += that.lpad(content, 5) + ' '
			}
			console.log(line)
		}
	}

	this.getPresentPlayersAtCoord = function(x,y) {
		if (that.battleField.getBattleTile(x,y).getType()) {
			return that.battleField.getBattleTile(x,y).getPlayerName()
		}
		var players = []
		var playerName
		for (var bx = 0; bx < that.battleField.fieldLength; bx++) {
			playerName = that.battleField.getBattleTile(bx, that.battleField.airHeight - 1).getPlayerName()
			if (typeof playerName != 'undefined') {
				var tree = trees[playerName]
				if ((x - bx) < tree.getTreeWidth() - 1 && (bx - x) < tree.getTreeWidth() - 1 && y > that.battleField.airHeight - tree.getTreeHeigth() - 1) {
					players.push(playerName)
				}
			}
		}
		return players
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
				water: players[i].getTree().getWater(),
				nutrients: players[i].getTree().getNutrients()
			})
		}
	}
}

module.exports.Game = function(code, battleField) {
	var game = new Game();
	return game.create(code, battleField);
}