var ResourceCalculator = function() {

	var that = this

	this.calculateSunReward = function(baseLight, leafDensity) {
		var absorbPercentage = leafDensity * 8 + 34 + (leafDensity ? 1:0) * 26
		return baseLight * (absorbPercentage / 100)
	}

	this.calculateWaterReward = function(baseMoisture, rootWidth) {
		return Math.pow(baseMoisture, 0.4) * (3 + rootWidth)
	}

    this.calculateNutrientReward = function(sun, water, springTicks) {
      var conversionRate = (springTicks ? 0.4:0.2)
      return conversionRate * Math.min(Math.max(0,sun), Math.max(0,water))
    }
}

var instance = null;

module.exports.ResourceCalculator = function() {
	if (!instance) {
		instance = new ResourceCalculator()
	}

	return instance
}