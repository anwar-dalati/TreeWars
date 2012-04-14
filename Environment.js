var Environment = function() {

	var that = this
	var rainTicks = 0
	var sunshineTicks = 0

	this.getRainTicks = function() {
		return rainTicks
	}

	this.getSunshineTicks = function() {
		return sunshineTicks
	}

	this.decreaseTicks = function() {
		rainTicks = Math.max(0, --rainTicks)
		sunshineTicks = Math.max(0, --sunshineTicks)
	}

	this.setRain = function() {
		console.log('rain summoned')
		rainTicks = 10
	}

	this.sunshine = function() {
		console.log('sunshine summoned')
	}

	this.spring = function() {
		console.log('spring summoned')
	}

	this.coldSnap = function() {
		console.log('cold snap summoned')
	}

	this.drouth = function() {
		console.log('drouth summoned')
	}

	this.storm = function() {
		console.log('storm summoned')
	}
}

module.exports.Environment = function() {
	return new Environment();
}