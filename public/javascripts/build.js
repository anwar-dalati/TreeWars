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

	this.extendRootDensity = function() {
		socket.emit('buildExtendRootDensity')
	}

	this.extendRootWidth = function() {
		socket.emit('buildExtendRootWidth')
	}
}