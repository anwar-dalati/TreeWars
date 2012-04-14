var Environment = function() {

	this.rain = function() {
		socket.emit('summonRain')
	}

	this.sunshine = function() {
		socket.emit('summonSunshine')
	}

	this.spring = function() {
		socket.emit('summonSpring')
	}

	this.coldSnap = function() {
		socket.emit('summonColdSnap')
	}

	this.drouth = function() {
		socket.emit('summonDrouth')
	}

	this.storm = function() {
		socket.emit('summonStorm')
	}
}