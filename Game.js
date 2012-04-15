var Game = function() {

	var that = this
	var code = 0
	var players = []
	var environment = null
	var battleField = null
	var resourceCalculator = null
	var ticks = 0
	var trees = []

	var increaseMoistureByRain = 5

	this.create = function(code, battleField) {
		console.log('create game with code %s', code)

		that.code = code
		that.environment = require('./Environment.js').Environment()
		that.battleField = battleField
		that.resourceCalculator = require('./ResourceCalculator.js').ResourceCalculator()

		return that
	}

	this.join = function(player) {
		// inform all players that a player has joined the game
		for (var i = 0; i < players.length; i++) {
			players[i].getSocket().emit('playerJoined', {playerName: player.getName()})
		}

		players.push(player)
		console.log('%s joined game with code %s', player.getName(), that.code)
	}

	this.start = function() {
		// player positions hardcoded for now
		if (players.length == 4) {
			that.placeTree(players[0], 10)
			that.placeTree(players[1], 14)
			that.placeTree(players[2], 18)
			that.placeTree(players[3], 22)
		} else if (players.length == 3) {
			that.placeTree(players[0], 11)
			that.placeTree(players[1], 16)
			that.placeTree(players[2], 21)
		} else if (players.length == 2) {
			that.placeTree(players[0], 13)
			that.placeTree(players[1], 19)
		}

		// inform all players that the game is starting
		var y = that.battleField.airHeight - 1
		var startingPoints = []

		for (var x = 0; x < that.battleField.fieldLength; x++) {
			var tile = that.battleField.getBattleTile(x, y)
			if (typeof tile.getPlayerName() == 'undefined') {
				continue
			}

			startingPoints.push({
				playerName: tile.getPlayerName(),
				x: x,
				y: y
			})
		}

		for (var i = 0; i < players.length; i++) {
			players[i].getSocket().emit('startingGame', {startingPoints: startingPoints})
		}

		setInterval(function() {
			that.gameLoop()
		}, 1000)
	}

	this.getPlayers = function() {
		return players
	}

	this.countPlayers = function() {
		return players.length
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
		trees[player.getName()].changeRootsCount(1)
	}

	this.growRoot = function(player, x, y) {
		if (!that.canRootGrowHere(player,x,y)) {
			return false
		}

		console.log('player %s grows roots to %s:%s', player.getName(), x, y)

		var tile = that.battleField.getBattleTile(x,y)
		tile.setPlayerName(player.getName())
		tile.setStrength(trees[player.getName()].getRootStrength())
		tile.setBranches(trees[player.getName()].getRootWidth())
	}

	this.canRootGrowHere = function(player, x,y) {
		var rootStrength = trees[player.getName()].getRootStrength()
		var tile = that.battleField.getBattleTile(x,y)

		if (tile == null || !tile.getType() || (typeof tile.getPlayerName() != 'undefined' && tile.getPlayerName() == player.getName()) || (tile.getStrength() > rootStrength)) {
			return false
		}

		if (y == that.battleField.airHeight) {
			tile = that.battleField.getBattleTile(x,that.battleField.airHeight - 1)
			if (typeof tile.getPlayerName() != 'undefined' && tile.getPlayerName() != player.getName()) {
				return false
			}

			tile = that.battleField.getBattleTile(x-1,that.battleField.airHeight - 1)
			if (tile != null && typeof tile.getPlayerName() != 'undefined' && tile.getPlayerName() != player.getName()) {
				return false
			}
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
					trees[player.getName()].setRootStrength(tile.getStrength())
				};
			}
		}
	}

	this.branchesRoot = function(player) {
		console.log('player %s branches the roots', player.getName())
		var tile
		for (var x = 0; x < that.battleField.fieldLength; x++) {
			for (var y = that.battleField.airHeight; y < that.battleField.airHeight + that.battleField.groundDepth; y++) {
				tile = that.battleField.getBattleTile(x, y)
				if (typeof tile.getPlayerName() != 'undefined' && tile.getPlayerName() == player.getName()) {
					that.battleField.getBattleTile(x, y).increaseBranches(1)
					trees[player.getName()].setRootWidth(tile.getBranches())
				};
			}
		}
	}


	this.cleanRoots = function() {
		console.log('game.cleanRoots')
		that.battleField.cleanRoots()
	}

	this.growTreeWidth = function(player) {
		trees[player.getName()].extendTreeWidth(that.battleField.maxTreeWidth)
	}

	this.growTreeHeight = function(player) {
		trees[player.getName()].extendTreeHeigth(that.battleField.maxTreeHeight)
	}

	this.growLeafDensity = function(player) {
		trees[player.getName()].extendLeafDensity(that.battleField.maxLeafDensity)
	}

	this.gameLoop = function() {
		if (++ticks % 5 == 0) {
			console.log('tick %s', ticks)
		}
		var i = 0
		var playerTree = null

		that.battleField.cleanRoots()
		for (i = 0; i < players.length; i++) {
			trees[players[i].getName()].setRootCount(trees[players[i].getName()].countRootsAtBattleField(players[i].getName(), that.battleField))
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

		var playerTrees = []
		for (i = 0; i < players.length; i++) {
			// decrease resources by the cost the tree takes
			playerTree = trees[players[i].getName()]
			playerTrees.push({
				playerName: players[i].getName(),
				height: playerTree.getTreeHeigth(),
				width: playerTree.getTreeWidth()
			})
		}

		// update player's tree resources and stuff
		for (i = 0; i < players.length; i++) {
			// decrease resources by the cost the tree takes
			playerTree = trees[players[i].getName()]
			var sunCost = Math.pow(playerTree.getTreeHeigth() * 0.5, 0.8745)
			var waterCost = playerTree.getTreeHeigth() * playerTree.getTreeWidth() * playerTree.getLeafDensity()
			playerTree.changeSun(-sunCost)
			playerTree.changeWater(-waterCost)

			// just for testing purposes
			// TODO: send the battlefield to the clients on every tick
			players[i].getSocket().emit('battleField', {
				rootDensity: playerTree.getRootWidth(),
				rootStrength: playerTree.getRootStrength(),
				leafDensity: playerTree.getLeafDensity(),
				battleField: that.battleFieldToArray(),
				trees: playerTrees
			})

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
				envStates.push({name: 'ColdSnap', ticks: that.environment.getColdSnapTicks()})
			}
			if (that.environment.getDroughtTicks() > 0) {
				envStates.push({name: 'Drought', ticks: that.environment.getDroughtTicks()})
			}
			if (that.environment.getStormTicks() > 0) {
				envStates.push({name: 'Storm', ticks: that.environment.getStormTicks()})
			}
			players[i].getSocket().emit('updateCurrentEnvironment', {states: envStates})
		}

		var tile = null
		// ground tile loop
		for (var x = 0; x < that.battleField.fieldLength; x++) {
			for (var y = 0; y < that.battleField.airHeight + that.battleField.groundDepth; y++) {
				tile = that.battleField.getBattleTile(x, y)
				if (tile.getType() != 1 || typeof tile.getPlayerName() == 'undefined') { // no ground tile
					continue
				}
				playerTree = trees[tile.getPlayerName()]

				var absorbedWater = that.resourceCalculator.calculateWaterReward(tile.moisture, playerTree.getRootWidth())
				playerTree.changeWater(absorbedWater)
				tile.decreaseMoisture(playerTree.getRootWidth())
			}
		}

		// air tile loop
		for (x = 0; x < that.battleField.fieldLength; x++) {
			// initial light value for that column
			var light = that.environment.getSunStrength()
			var playersAbsorbed = []

			for (y = 0; y < that.battleField.airHeight + that.battleField.groundDepth; y++) {
				tile = that.battleField.getBattleTile(x, y)
				if (tile.getType() != 0) { // no air tile
					continue
				}

				var playersAtCoord = that.getPresentPlayersAtCoord(x, y)
				if (typeof playersAtCoord != 'object' && typeof playersAtCoord != 'undefined') {
					playersAtCoord = [].push(playersAtCoord)
				}

				// skip row in that column which has no tiles
				if (!playersAtCoord.length) {
					continue
				}

				var splittedLight = light / playersAtCoord.length
				for (i = 0; i < playersAtCoord.length; i++) {
					// player can only get light once for each row
					var playerAbsorbedAlready = false
					for (var j = 0; j < playersAbsorbed.length; j++) {
						if (playersAbsorbed[j] == playersAtCoord[i]) {
							splittedLight += light / playersAtCoord.length
							playerAbsorbedAlready = true
							break
						}
					}
					if (playerAbsorbedAlready) {
						continue
					}

					playerTree = trees[playersAtCoord[i]]

					var absorbedLight = that.resourceCalculator.calculateSunReward(splittedLight, playerTree.getLeafDensity())
					playerTree.changeSun(absorbedLight)
					light -= absorbedLight

					playersAbsorbed.push(playersAtCoord[i])
				}

				// step to the next column if no light is left over
				if (light <= 0) {
					break
				}
			}
		}

		// generate Nutrients
        var generatedNutrients = that.resourceCalculator.calculateNutrientReward(playerTree.getSun(), playerTree.getWater(), that.environment.getSpringTicks())
        playerTree.changeNutrients(generatedNutrients)
        playerTree.changeSun(-generatedNutrients)
        playerTree.changeWater(-generatedNutrients)

        // TODO: dead?

		that.updatePlayerResources()
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
		for (var x = 0; x < that.battleField.fieldLength - 1; x++) {
			line += that.lpad(x, 5) + ' '
		}
		console.log(line)

		var content
		var tile
		for (var y = 0; y < that.battleField.airHeight + that.battleField.groundDepth; y++) {
			if (y >= that.battleField.airHeight) {
				line = ' ' + y
			} else {
				line = '  ' + y + '   '
			}
			for (x = 0; x < that.battleField.fieldLength; x++) {
				if (y < that.battleField.airHeight && x == that.battleField.fieldLength-1) {
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
			return (that.battleField.getBattleTile(x,y).getPlayerName())
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
			var playerTree = trees[players[i].getName()]
			players[i].getSocket().emit('updatePlayerResources', {
				healthPoints: playerTree.getHealthPoints(),
				sun: playerTree.getSun(),
				water: playerTree.getWater(),
				nutrients: playerTree.getNutrients()
			})
		}
	}

	this.battleFieldToArray = function() {
		var tiles = []

		for (var x = 0; x < that.battleField.fieldLength; x++) {
			for (var y = 0; y < that.battleField.airHeight + that.battleField.groundDepth; y++) {
				var tile = that.battleField.getBattleTile(x, y)
				if (typeof tiles[x] == 'undefined') {
					tiles[x] = []
				}

				tiles[x][y] = {
					moisture: tile.getMoisture(),
					playerNames: that.getPresentPlayersAtCoord(x, y),// tile.getPlayerName(),
					type: tile.getType()
				}
			}
		}

		return tiles
	}
}

module.exports.Game = function(code, battleField) {
	var game = new Game();
	return game.create(code, battleField);
}