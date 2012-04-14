var Tile = function() {

	var that = this
	var playerName = null
	var status = 0

	this.getName = function() {
		return playerName
	}

	this.getStatus = function() {
		return status
	}

	this.setName = function(playerName) {
		playerName = playerName
	}

	this.setStatus = function(status) {
		status = status
	}

}

module.exports.Tile = function() {
	var tile = new Tile()
	return tile
}