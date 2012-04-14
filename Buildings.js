var Buildings = function() {

	var that = this
	var heigth = 0
	var width = 0
	var roots = []

	this.extendHeigth = function() {
		console.log('extended heigth')
	}

	this.getHeigth = function() {
		return that.heigth
	}

	this.extendWidth = function() {
		console.log('extended width')
	}

	this.getWidth = function() {
		return that.width
	}

	this.placeRoot = function(x, y) {
		console.log('placed root to x: %s, y: %s', x, y)
		roots.push({x: x, y: y})
	}
}

module.exports.Buildings = function() {
	return new Buildings();
}