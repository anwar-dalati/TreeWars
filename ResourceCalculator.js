var ResourceCalculator = function() {

	var that = this

	this.calculateSunReward = function(baseLight, leafDensity) {
		var absorbPercentage = leafDensity * 11 + 34
		return baseLight * (absorbPercentage / 100)
	}

	this.calculateWaterReward = function(baseMoisture, rootWidth) {
		return baseMoisture * (rootWidth / 100)
	}
}

var instance = null;

module.exports.ResourceCalculator = function() {
	if (!instance) {
		instance = new ResourceCalculator()
	}

	return instance
}