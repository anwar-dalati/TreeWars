var Tree = function() {

	var healthPoints = 10
	var sun = 0
	var water = 0

	this.updateSun = function(battleField) {
		sun++
	}

	this.updateWater = function(battleField) {
		water++
	}
}

module.exports.Tree = function() {
	return new Tree()
}