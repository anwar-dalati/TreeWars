var Tree = function() {

	var that = this
	var treeHeigth = 3
	var treeWidth = 3
	var rootDensity = 0
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

	this.extendRootDensity = function() {
		rootDensity++
		console.log('extended root density to %s', rootDensity)
	}

	this.getRootDensity = function() {
		return rootDensity
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
	}

	this.changeWater = function(amount) {
		water += amount
	}

	this.changeNutrients = function(amount) {
		nutrients += amount
	}
}

module.exports.Tree = function() {
	return new Tree();
}