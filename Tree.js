var Tree = function() {

	var healthPoints = 10
	var sun = 0
	var water = 0

	this.changeSun = function(battleField) {
		sun++
	}

	this.changeWater = function(battleField) {
		water++
	}
}

module.exports.Tree = function() {
	return new Tree()
}