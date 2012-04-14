var Environment = function() {

	var rainToTick = 10
	var sunshineToTick = 10
	var springToTick = 10

	var that = this
	var rainTicks = 0
	var sunshineTicks = 0
	var springTicks = 0

	this.getRainTicks = function() {
		return rainTicks
	}

	this.getSunshineTicks = function() {
		return sunshineTicks
	}

	this.getSpringTicks = function() {
		return springTicks
	}

	this.decreaseTicks = function() {
		rainTicks = Math.max(0, --rainTicks)
		sunshineTicks = Math.max(0, --sunshineTicks)
		springTicks = Math.max(0, --springTicks)
	}

	this.setRain = function() {
		console.log('rain summoned')
		rainTicks = rainToTick

		if (that.getSunshineTicks()) {
			rainTicks -= (sunshineToTick - sunshineTicks)
			sunshineTicks = 0
		} else if (that.getSpringTicks()) {
			rainTicks -= (springToTick - springTicks)
			springTicks = 0
		}
	}

	this.setSunshine = function() {
		console.log('sunshine summoned')
		sunshineTicks = sunshineToTick

		if (that.getRainTicks()) {
			sunshineTicks -= (rainToTick - rainTicks)
			rainTicks = 0
		} else if (that.getSpringTicks()) {
			sunshineTicks -= (springToTick - springTicks)
			springTicks = 0
		}
	}

	this.setSpring = function() {
		console.log('spring summoned')
		springTicks = springToTick

		if (that.getRainTicks()) {
			springTicks -= (rainToTick - rainTicks)
			rainTicks = 0
		} else if (that.getSpringTicks()) {
			springTicks -= (sunshineToTick - sunshineTicks)
			sunshineTicks = 0
		}
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