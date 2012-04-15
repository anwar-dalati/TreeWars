var Tree = function() {

	var that = this
	var treeHeigth = 3
	var treeWidth = 3
	var rootStrength = 0
	var leafDensity = 0
	var rootWidth = 0

	var healthPoints = 10
	var sun = 0
	var water = 0
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
		sun += amount
		console.log('changed sun by %s', amount)
	}

	this.changeWater = function(amount) {
		water += amount
		console.log('changed water by %s', amount)
	}

	this.changeNutrients = function(amount) {
		nutrients += amount
		console.log('changed nutrients by %s', amount)
	}

	this.setRootStrength = function(strength) {
		rootStrength = strength
	}
}

module.exports.Tree = function() {
	return new Tree();
}