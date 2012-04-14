var Build = function() {

	this.extendHeigth = function() {
		socket.emit('buildExtendHeigth')
	}

	this.extendWidth = function() {
		socket.emit('buildExtendWidth')
	}

	this.placeRoot = function(x, y) {
		socket.emit('buildPlaceRoot', {x: x, y: y})
	}
}