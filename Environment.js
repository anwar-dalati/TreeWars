var Environment = function() {

	var rainToTick = 10
	var sunshineToTick = 10
	var springToTick = 10
	var coldSnapToTick = 10
	var droughtToTick = 10
	var stormToTick = 10

	var that = this
	var rainTicks = 0
	var sunshineTicks = 0
	var springTicks = 0
	var coldSnapTicks = 0
	var droughtTicks = 0
	var stormTicks = 0

	var sunStrength = 10
	var springActive = false
	var coldSnapActive = false

	this.getRainTicks = function() {
		return rainTicks
	}

	this.getSunshineTicks = function() {
		return sunshineTicks
	}

	this.getSpringTicks = function() {
		return springTicks
	}

	this.getColdSnapTicks = function() {
		return coldSnapTicks
	}

	this.getDroughtTicks = function() {
		return droughtTicks
	}

	this.getStormTicks = function() {
		return stormTicks
	}

	this.decreaseTicks = function() {
		rainTicks = Math.max(0, --rainTicks)
		sunshineTicks = Math.max(0, --sunshineTicks)
		springTicks = Math.max(0, --springTicks)
		coldSnapTicks = Math.max(0, --coldSnapTicks)
		droughtTicks = Math.max(0, --droughtTicks)
		stormTicks = Math.max(0, --stormTicks)
	}

	this.setRain = function() {
		console.log('rain summoned')
		rainTicks = rainToTick

		if (that.getSunshineTicks()) {
			rainTicks -= (sunshineToTick - sunshineTicks)
			sunshineTicks = 0
		}
	}

	this.setSunshine = function() {
		console.log('sunshine summoned')
		sunshineTicks = sunshineToTick

		if (that.getRainTicks()) {
			sunshineTicks -= (rainToTick - rainTicks)
			rainTicks = 0
		}
	}

	this.setSpring = function() {
		console.log('spring summoned')
		springTicks = springToTick
	}

	this.setColdSnap = function() {
		console.log('cold snap summoned')
		coldSnapTicks = coldSnapToTick
		springTicks = 0
	}

	this.setDrought = function() {
		console.log('drouth summoned')
		droughtTicks = droughtToTick
	}

	this.setStorm = function() {
		console.log('storm summoned')
		stormTicks = stormToTick
	}

	this.getSunStrength = function() {
		return sunshineTicks > 0 ? 12 : 10
	}
}

module.exports.Environment = function() {
	return new Environment();
}