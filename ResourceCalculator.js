var ResourceCalculator = function() {

	var that = this

	this.calculateSunReward = function(battleField) {
		for (var x = 0; x < battleField.length; x++) {
			for (var y = 0; y < battleField[x].length; y++) {
				//
			}
		}
	}
}

var instance = null;

module.exports.ResourceCalculator = function() {
	if (!instance) {
		instance = new ResourceCalculator()
	}

	return instance
}