var Tree = function() {

	var that = this
	var treeHeigth = 4
	var treeWidth = 3
	var rootStrength = 1
	var leafDensity = 2
	var rootWidth = 1
	var rootCount = 0

	var healthPoints = 10
	var sun = 6
	var water = 20
	var nutrients = 0

	this.extendTreeHeigth = function() {
		treeHeigth++
		console.log('extended tree heigth to %s', treeHeigth)
	}

	this.getTreeHeigth = function() {
		return treeHeigth
	}

	this.extendTreeWidth = function() {
		treeWidth++
		treeWidth++
		console.log('extended tree width to %s', treeWidth)
	}

	this.getTreeWidth = function() {
		return treeWidth
	}

	this.extendLeafDensity = function() {
		leafDensity++
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
		var max = rootCount * 20
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

	this.changeRootsCount = function(amount) {
		rootCount += amount
	}
}

module.exports.Tree = function() {
	return new Tree();
}