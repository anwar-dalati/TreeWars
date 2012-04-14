var Tree = function() {

	var that = this
	var treeHeigth = 0
	var treeWidth = 0
	var roots = []
	var rootDensity = 0
	var leafDensity = 0
	var rootWidth = 0

	var healthPoints = 10
	var sun = 0
	var water = 0

	this.extendTreeHeigth = function() {
		treeHeigth++
		console.log('extended tree heigth to %s', treeHeigth)
	}

	this.getTreeHeigth = function() {
		return treeHeigth
	}

	this.extendTreeWidth = function() {
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

	this.placeRoot = function(x, y) {
		roots.push({x: x, y: y})
		console.log('placed root to x: %s, y: %s', x, y)
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

	this.changeSun = function(amount) {
		sun += amount
	}

	this.changeWater = function(amount) {
		water += amount
	}
}

module.exports.Tree = function() {
	return new Tree();
}