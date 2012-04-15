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

	//var pTree = new PlayerTree(2,2,10,0, 3, 4, 0);
	//PlayerTree(2,2,10,0, 3, 4, 0);
	socket.on('startingGame', function(data) {
		tw.startingPoints = data.startingPoints

		var startingPoints = [], i = 0

		$(data.startingPoints).each(function() {
			startingPoints[i++] = $(this)
		})

		if (startingPoints.length == 4) {
			playerTrees.push(new PlayerTree(10,-5, startingPoints[0]['playerName']));
			playerTrees.push(new PlayerTree(14,-7, startingPoints[1]['playerName']));
			playerTrees.push(new PlayerTree(18,-9, startingPoints[2]['playerName']));
			playerTrees.push(new PlayerTree(22,-11, startingPoints[3]['playerName']));
		} else if (startingPoints.length == 3) {
			playerTrees.push(new PlayerTree(11,-5, startingPoints[0]['playerName']));
			playerTrees.push(new PlayerTree(16,-8, startingPoints[1]['playerName']));
			playerTrees.push(new PlayerTree(21,-11, startingPoints[2]['playerName']));
		} else if (startingPoints.length == 2) {
			playerTrees.push(new PlayerTree(13,-6, startingPoints[0]['playerName']));
			playerTrees.push(new PlayerTree(19,-10, startingPoints[1]['playerName']));
		}

		$('#wait_dialog').dialog('close')
		$('#gameWrapper').css('background-image', 'none')

		// build buttons
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

		// weather / hazard buttons
		$('#uiWrapper #weather .weather.Rain').click(function() {
			env.rain()
		})
		$('#uiWrapper #weather .weather.Sunshine').click(function() {
			env.sunshine()
		})
		$('#uiWrapper #weather .weather.Spring').click(function() {
			env.spring()
		})
		$('#uiWrapper #weather .weather.ColdSnap').click(function() {
			env.coldSnap()
		})
		$('#uiWrapper #weather .weather.Drought').click(function() {
			env.drought()
		})
		$('#uiWrapper #weather .weather.Storm').click(function() {
			env.storm()
		})
	})

	socket.on('battleField', function(data) {
		console.log(data)

		//pTree.drawTree();
		playerTrees[0].clearTree();

		for ( var i = 0; i < data.trees.length; i++) {
			playerTrees[i].setValues(data.trees[i].playerName, data.trees[i].treeHeight, data.trees[i].treeWidth, data.trees[i].leafDensity, data.trees[i].rootDensity);
		}

		playerTrees[0].drawTree();
		playerTrees[1].drawTree();
		playerTrees[2].drawTree();
		playerTrees[3].drawTree();

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
					$('#tileWrapper').append('<div style="top:'+y*60+'px; left:'+x*60+ 'px;" class="rootD'+(rootStrength - 1)+'B'+(rootDensity - 1)+ '"></div>')
					console.log('root at x: %s, y: %s', x, y)
				}
			}
		}
	})

	socket.on('updatePlayerResources', function(data) {
		console.log(data)
		$('#health').html('Health: ' + data.healthPoints)
		$('#sun').html('Sun: ' +  Math.floor(data.sun))
		$('#water').html('Water: ' + Math.floor(data.water))
		$('#nutrients').html('Nutrients: ' + Math.floor(data.nutrients))
	})

	// TODO: implement weather icons
	socket.on('updateCurrentEnvironment', function(data) {
		console.log(data)
		tw.states = data.states
		for (var i = 0; i < data.states.length; i++) {
			var state = data.states[i]
			$('#uiWrapper #weather .weather.' + state.name).html(state.ticks > 0 ? state.ticks : '')
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