var Build = function() {

	this.extendTreeHeigth = function() {
		socket.emit('buildExtendTreeHeigth')
	}

	this.extendTreeWidth = function() {
		socket.emit('buildExtendTreeWidth')
	}

	this.extendLeafDensity = function() {
		socket.emit('buildExtendLeafDensity')
	}

	this.placeRoot = function(x, y) {
		socket.emit('buildPlaceRoot', {x: x, y: y})
	}

	this.extendRootDensity = function() {
		socket.emit('buildExtendRootDensity')
	}

	this.extendRootWidth = function() {
		socket.emit('buildExtendRootWidth')
	}
}