$(function() {

	soundManager.url = '../swf/';
	soundManager.flashVersion = 8;
	soundManager.useFlashBlock = false;
	soundManager.debugMode = false;

	soundManager.onready(function() {
		var music = soundManager.createSound({
			id: 'music',
			url: '../sounds/at-rest.mp3'
		});
		var twitter = soundManager.createSound({
			id: 'twitter',
			url: '../sounds/evening-in-the-forest.mp3'
		});

		twitter.play();
		music.play();
	});

	$('#sound').click(function() {
		soundManager.togglePause('twitter');
		soundManager.togglePause('music');
	});

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

		for (var x = 0; x < data.battleField.length; x++) {
			for (var y = 0; y < data.battleField[x].length; y++) {
				var tile = data.battleField[x][y]
				// data.rootDensity
				// data.rootStrength
				// data.leafDensity
				// tile.playerNames
				//$('<img id="img_x_y" src="" class="tree0Center0" />')
				$('#img_x_y').attr('class', 'tree0Center0')

				if (tile.type == 1 && typeof tile.playerNames != 'undefined' && tile.playerNames.length) { // ground
					// theres a root
				}
			}
		}
	})

	socket.on('updatePlayerResources', function(data) {
		console.log(data)
		$('#health').html('Health: ' + data.healthPoints)
		$('#sun').html('Sun: ' +  Math.ceil(data.sun))
		$('#water').html('Water: ' + Math.ceil(data.water))
		$('#nutrients').html('Nutrients: ' + Math.ceil(data.nutrients))
	})

	// TODO: implement weather icons
	socket.on('updateCurrentEnvironment', function(data) {
		console.log(data)
		$('#uiWrapper #weather .weather').remove()

		for (var i = 0; i < data.states.length; i++) {
			var state = data.states[i]
			$('#uiWrapper #weather').append($('<div class="noImage weather">' + state.name + ' (' + state.ticks + ')' + '</div>'))
		}
		if (i > 0) {
			$('#uiWrapper #weather').attr('class', 'noImage')
		} else {
			$('#uiWrapper #weather').attr('class', 'noImage hide')
		}
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