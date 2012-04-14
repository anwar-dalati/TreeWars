$(function() {

	var startDialog = function() {
		var buttons = {};
		buttons['Ok'] = function() {
			$(this).dialog('close')
			tw.playerName = $('#playerName').val()
			roleDialog()
		}

		$('#start_dialog').dialog({
			buttons: buttons
		})
	}

	var roleDialog = function() {
		var buttons = {};
		buttons['Create Game'] = function() {
			$(this).dialog('close')
			socket.emit('createGame', {playerName: tw.playerName})
		}
		buttons['Join Game'] = function() {
			$(this).dialog('close')
			joinDialog()
		}

		$('#role_dialog').dialog({
			buttons: buttons
		})
	}

	var joinDialog = function() {
		var buttons = {};
		buttons['Join'] = function() {
			$(this).dialog('close')
			socket.emit('joinGame', {code: $('#joinGameCode').val(), playerName: tw.playerName})
		}

		$('#join_dialog').dialog({
			buttons: buttons
		})
	}

	socket.on('createGameCode', function(data) {
		console.log('game code: %s', data.code)
		tw.gameCode = data.code
		tw.host = true
	})
	socket.on('joinGameSuccess', function(data) {
		console.log('joining game with code %s %s', $('#joinGameCode').val(), data.success ? 'succeeded' : 'failed')
		if (data.success) {
			tw.gameCode = $('#joinGameCode').val()
		} else {
			joinDialog()
		}
	})

	socket.on('battleField', function(data) {
		console.log(data.battleField[0][0])
	})

	socket.on('updatePlayerResources', function(data) {
		console.log(data)
		$('#resources #health').html('Health: ' + data.healthPoints)
		$('#resources #sun').html('Sun: ' +  data.sun)
		$('#resources #water').html('Water: ' + data.water)
		$('#resources #nutrients').html('Nutrients: ' + data.nutrients)
	})

	socket.on('updateCurrentEnvironment', function(data) {
		console.log('Environment: ' + (data.state ? data.state : 'None active') + ' Left: ' + data.ticks)
		$('#resources #environment').html((data.state ? data.state : 'None active') + ' (' + data.ticks + ')')
	})

	startDialog()
})


// ONLY FOR TESTING
var test = function() {
	socket.emit('build', {playerName: tw.playerName})
}
var start = function() {
	socket.emit('startGame')
}
var bg = function() {
	socket.emit('bgGame')
}
var next = function() {
	socket.emit('nextGame')
}
var placeTree = function(x) {
	socket.emit('placeTreeGame', {x:x})
}