$(function() {
	
	var playerTrees = [];

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

		//twitter.play();
		//music.play();
		
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

	var waitDialog = function() {
		var buttons = {};

		if (tw.host) {
			buttons['Start'] = function() {
				$(this).dialog('close')
				socket.emit('startGame')
			}
		}

		$('#wait_dialog .joinedPlayers').html(tw.playerName)
		$('#wait_dialog .gameCode').html('<strong>' + tw.gameCode + '</strong><br />')
		$('#wait_dialog').dialog({
			buttons: buttons
		})
	}

	socket.on('createGameCode', function(data) {
		console.log('game code: %s', data.code)
		tw.gameCode = data.code
		tw.host = true
		waitDialog()
	})
	socket.on('joinGameSuccess', function(data) {
		console.log('joining game with code %s %s', $('#joinGameCode').val(), data.success ? 'succeeded' : 'failed')
		if (data.success) {
			tw.gameCode = $('#joinGameCode').val()
			waitDialog()
		} else {
			joinDialog()
		}
	})

	socket.on('playerJoined', function(data) {
		console.log('player %s joined the game', data.playerName)
		$('#wait_dialog .joinedPlayers').append(', ' + data.playerName)
	})

	//PlayerTree(2,2,10,0, 3, 4, 0);
	socket.on('startingGame', function(data) {
		tw.startingPoints = data.startingPoints
		
		playerTrees.push(new PlayerTree(2,2,10,0, 3, 4, 0));

		$('#wait_dialog').dialog('close')
		$('#gameWrapper').css('background-image', 'none')

		$('#growHeight').removeClass('hide').click(function() {
			build.extendTreeHeigth()
		})
		$('#growWidth').removeClass('hide').click(function() {
			build.extendTreeWidth()
		})
		$('#growFoliageDense').removeClass('hide').click(function() {
			build.extendLeafDensity()
		})
		$('#growRootsDense').removeClass('hide').click(function() {
			build.extendRootDensity()
		})
		$('#strengthRoots').removeClass('hide').click(function() {
			build.extendRootWidth()			
		})
		
		
	})

	socket.on('battleField', function(data) {
		console.log(data.battleField[0][0])

		playerTrees[0].clearTree();
		playerTrees[0].drawTree();		

		for (var x = 0; x < data.battleField.length; x++) {
			for (var y = 0; y < data.battleField[x].length; y++) {
				var tile = data.battleField[x][y]
				var rootDensity = data.rootDensity
				var rootStrength = data.rootStrength
				var leafDensity = data.leafDensity
				// tile.playerNames
				//$('<img id="img_x_y" src="" class="tree0Center0" />')
				$('#img_x_y').attr('class', 'tree0Center0')

				if (tile.type == 1 && typeof tile.playerNames != 'undefined' && typeof tile.playerNames != 'object') { // ground
					console.log('root at x: %s, y: %s', x, y)
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
			$('#uiWrapper #weather').append($('<img class="weather ' + data.state + '" />'))
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
var growRoot = function(x, y) {
	socket.emit('growRootGame', {x:x, y:y})
}
var strengthRoot = function() {
	socket.emit('strengthRootGame')
}
var brancheRoot = function() {
	socket.emit('branchesRootGame')
}
var batch = function() {
	socket.emit('batch')
}