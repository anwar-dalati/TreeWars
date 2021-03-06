var Tree = function() {

	var that = this
	var treeHeigth = 4
	var treeWidth = 3
	var rootStrength = 1
	var leafDensity = 2
	var rootWidth = 1
	var rootCount = 0
    var weatherPoints = 0

	var healthPoints = 120
	var sun = 6
	var water = 20
	var nutrients = 0
	var dead = false

	this.extendTreeHeigth = function(maxTreeHeigth) {
		var oldMaxHealthPoints = that.getMaxHealthPoints()

		treeHeigth++
		treeHeigth = Math.min(maxTreeHeigth, treeHeigth)

		that.updateNewHealthPoints(oldMaxHealthPoints)

		console.log('extended tree heigth to %s (max: %s)', treeHeigth, maxTreeHeigth)
	}

	this.getTreeHeigth = function() {
		return treeHeigth
	}

	this.extendTreeWidth = function(maxTreeWidth) {
		var oldMaxHealthPoints = that.getMaxHealthPoints()

		treeWidth+=2
		treeWidth = Math.min(maxTreeWidth, treeWidth)

		that.updateNewHealthPoints(oldMaxHealthPoints)

		console.log('extended tree width to %s', treeWidth)
	}

	this.getTreeWidth = function() {
		return treeWidth
	}

	this.extendLeafDensity = function(maxLeafDensity) {
		leafDensity++
		leafDensity = Math.min(maxLeafDensity, leafDensity)
		console.log('extended leaf density to %s', leafDensity)
	}

	this.getLeafDensity = function() {
		return leafDensity
	}

	this.extendRootStrength = function() {
		rootStrength++
		console.log('extended root density to %s', rootStrength)
	}

	this.getRootStrength = function() {
		return rootStrength
	}

	this.extendRootWidth = function() {
		rootWidth++
		console.log('extended root width to %s', rootWidth)
	}

	this.getRootWidth = function() {
		return rootWidth
	}

	this.getHealthPoints = function() {
		return healthPoints
	}

	this.changeHealthPoints = function(amount) {
		healthPoints += amount
	}

	this.getMaxHealthPoints = function() {
		return treeHeigth * treeWidth * 10
	}

	this.updateNewHealthPoints = function(oldMaxHealthPoints) {
		var diff = that.getMaxHealthPoints() - oldMaxHealthPoints
		that.changeHealthPoints(diff)
	}

	this.getSun = function() {
		return sun
	}

	this.getWater = function() {
		return water
	}

	this.getNutrients = function() {
		return nutrients
	}

	this.changeSun = function(amount) {
		var max = that.getLeafDensity() * 2 * that.getTreeWidth() * that.getTreeHeigth()
		sun = Math.min(sun + amount, max)

		console.log('changed sun by %s, now %s', amount, sun)
	}

	this.changeWater = function(amount) {
		var max = rootCount * 20 * that.getRootStrength()
		water = Math.min(water + amount, max)

		console.log('changed water by %s, now %s', amount, water)
	}

	this.changeNutrients = function(amount) {
		nutrients += amount
		console.log('changed nutrients by %s, now %s', amount, nutrients)
	}

	this.setRootStrength = function(strength) {
		rootStrength = strength
	}

	this.setRootWidth = function(width) {
		rootWidth = width
	}

	this.setRootCount = function(count) {
		rootCount = count
	}

	this.changeRootsCount = function(amount) {
		rootCount += amount
	}

    this.setWeatherPoints = function(amount) {
        weatherPoints = amount
    }

    this.changeWeatherPoints = function(amount) {
        weatherPoints += amount
    }
    
    

    this.getWeatherPoints = function() {
      return weatherPoints
    }

	this.countRootsAtBattleField = function(playerName, battleField) {
		var count = 0
		var tile, x, y

		for (x = 0; x < battleField.fieldLength; x++) {
			for (y = battleField.airHeight; y < battleField.airHeight+battleField.groundDepth; y++) {
				tile = battleField.getBattleTile(x, y)
				if (tile != null && typeof tile != 'undefined' && tile.getPlayerName() == playerName) {
					count++
				}
			}
		}

		return count
	}

	this.damageTree = function() {
		if (sun < 0) {
			that.changeHealthPoints(sun)
			that.changeNutrients(-sun)
			sun = 0
		}
		if (water < 0) {
			that.changeHealthPoints(water)
			that.changeNutrients(-water)
			water = 0
		}
	}

	this.setDead = function(dead) {
		that.dead = dead
	}

	this.isDead = function() {
		return that.dead
	}
}

module.exports.Tree = function() {
	return new Tree();
}