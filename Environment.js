var Environment = function() {

	var that = this

	this.rain = function() {
		console.log('rain summoned')
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