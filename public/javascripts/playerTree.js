var PlayerTree = function(startPosition, positionChangeToScreenPosition, associatedPlayer)
{
	this.LeafDensity = 2;
	this.RootDensity = 2;

	this.worldPosition = startPosition;
	/*
	 * tree position in screen coords is based on the position of the playerstree (playertree is in center (x= 15))
	 */
	this.positionChangeToScreenPosition = positionChangeToScreenPosition;
	this.width = 3;
	this.height = 4;
	this.PlayerName = associatedPlayer;
	this.rootPositions = {};

	/*
	 * adds root position in worldCoordinates (converted to screen coords)
	 */
	this.addRootPosition = function(x,y)
	{
		rootPositions[rootPositions.length] = new Array(x + posititionChangeToScreenPosition.x, y + posititionChangeToScreenPosition.y);
	}

	this.changeRootDensity = function(value)
	{
		this.RootDensity = value;
	}

	this.changeLeafDensity = function(value)
	{
		this.LeafDensity = value;
	}

	this.setValues = function(playerName, treeHeight, treeWidth, leafDensity, rootDensity)
	{
		this.LeafDensity = leafDensity;
		this.RootDensity = rootDensity;
		this.width = treeWidth;
		this.height = treeHeight;
		this.PlayerName = playerName;
	}

	this.drawTree = function()
	{
		that = this;

		if(typeof tw.states != "undefinded")
		{
			$('#gameWrapper').css('background-image', 'url(/images/background/normal.jpg)')
			$('#tileWrapper').css('background-image', 'none')

			for (var i = 0; i < tw.states.length; i++) {
				var state = tw.states[i]

				if(state.name == "ColdSnap" && state.ticks > 0)
					$('#gameWrapper').css('background-image', 'url(/images/background/snow.jpg)')
				else if(state.name == "Drought" && state.ticks > 0)
					$('#gameWrapper').css('background-image', 'url(/images/background/drought.jpg)')
				else if(state.name == "Spring" && state.ticks > 0)
					$('#gameWrapper').css('background-image', 'url(/images/background/spring.jpg)')
				if(state.name == "Rain" && state.ticks > 0)
					$('#tileWrapper').css('background-image', 'url(/images/background/rain.png)')
				else if(state.name == "Sunshine" && state.ticks > 0)
					$('#tileWrapper').css('background-image', 'url(/images/background/sun.png)')
			}
		}

		//draw trunk position y-2
		$('#tileWrapper').append('<div style="top:480px; left:'+ (that.worldPosition + that.positionChangeToScreenPosition) * 60 + 'px;" class="tree'+that.LeafDensity+'Trunk'+Math.ceil(that.width/2)+ '"></div>')
		//start&draw at left2 go right
		$('#tileWrapper').append('<div style="top:480px; left:'
		+ ((that.worldPosition + that.positionChangeToScreenPosition)- Math.floor(that.width/2)) * 60 + 'px;" class="tree'
		+that.LeafDensity+'Left'+2+ '"></div>')
		for(var bottomLeftIndex = 1; bottomLeftIndex < Math.floor(that.width/2); bottomLeftIndex++)
		{
			$('#tileWrapper').append('<div style="top:480px; left:'
			+ ((that.worldPosition + that.positionChangeToScreenPosition)- Math.floor(that.width/2)+bottomLeftIndex) * 60 + 'px;" class="tree'
			+that.LeafDensity+'Bottom'+0+ '"></div>')
		}

		for(var bottomRightIndex = 1; bottomRightIndex < Math.floor(that.width/2); bottomRightIndex++)
		{
			$('#tileWrapper').append('<div style="top:480px; left:'
			+ ((that.worldPosition + that.positionChangeToScreenPosition)+ bottomRightIndex) * 60 + 'px;" class="tree'
			+that.LeafDensity+'Bottom'+1+ '"></div>')
		}

		$('#tileWrapper').append('<div style="top:480px; left:'
		+ ((that.worldPosition + that.positionChangeToScreenPosition)+ Math.floor(that.width/2)) * 60 + 'px;" class="tree'
		+that.LeafDensity+'Right'+2+ '"></div>')


		//repeat if(width == 3) until height-1
		//else until height -2
		var heightModifier = 2;
		if(that.width == 3)
		{
			heightModifier = 1;
		}


		for(var heightIndex =1; heightIndex < that.height - heightModifier; heightIndex++)
		{
			//draw left1
			$('#tileWrapper').append('<div style="top:'+ (480 - (heightIndex * 60))+'px; left:'
		+ ((that.worldPosition + that.positionChangeToScreenPosition)- Math.floor(that.width/2)) * 60 + 'px;" class="tree'
		+that.LeafDensity+'Left'+1+ '"></div>')

			//draw centerpieces
			for(var centerIndex = 1; centerIndex < that.width -1; centerIndex++)
			{
			$('#tileWrapper').append('<div style="top:'+ (480 - (heightIndex * 60))+'px; left:'
		+ ((that.worldPosition + that.positionChangeToScreenPosition)- Math.floor(that.width/2)+centerIndex) * 60 + 'px;" class="tree'
		+that.LeafDensity+'Center'+Math.floor(Math.random()*6)+ '"></div>')
			}


			$('#tileWrapper').append('<div style="top:'+ (480 - (heightIndex * 60))+'px; left:'
		+ ((that.worldPosition + that.positionChangeToScreenPosition)+ Math.floor(that.width/2)) * 60 + 'px;" class="tree'
		+that.LeafDensity+'Right'+1+ '"></div>')

		}

			for(var specialIndex = 1; specialIndex<heightModifier; specialIndex++)
		{
			//draw left0
			$('#tileWrapper').append('<div style="top:'+ (480 - (1) * 60)+'px; left:'
		+ ((that.worldPosition + that.positionChangeToScreenPosition)- Math.floor(that.width/2)) * 60 + 'px;" class="tree'
		+that.LeafDensity+'Left'+0+ '"></div>')

			//draw centerpieces
			for(var centerIndex = 1; centerIndex < that.width -1; centerIndex++)
			{
			$('#tileWrapper').append('<div style="top:'+ (480 - ((that.height)* 60))+'px; left:'
		+ ((that.worldPosition + that.positionChangeToScreenPosition)- Math.floor(that.width/2)+centerIndex) * 60 + 'px;" class="tree'
		+that.LeafDensity+'Center'+/*Math.floor(Math.random()*6)*/ 3+ '"></div>')
			}

			$('#tileWrapper').append('<div style="top:'+ (480 - ((1)*60))+'px; left:'
		+ ((that.worldPosition + that.positionChangeToScreenPosition)+ Math.floor(that.width/2)) * 60 + 'px;" class="tree'
		+that.LeafDensity+'Right'+0+ '"></div>')
		}



		var xPositionmodifier = 0;
		if(that.width != 3)
		{
			xPositionmodifier = 1;
		}

		if(xPositionmodifier == 0)
		{
			$('#tileWrapper').append('<div style="top:'+ (480 - (that.height- heightModifier) * 60)+'px; left:'
		+ ((that.worldPosition + that.positionChangeToScreenPosition)- Math.floor(that.width/2)+ xPositionmodifier) * 60 + 'px;" class="tree'
		+that.LeafDensity+'Left'+0+ '"></div>')

		}
		else
		{
		$('#tileWrapper').append('<div style="top:'+ (480 - (that.height- heightModifier) * 60)+'px; left:'
		+ ((that.worldPosition + that.positionChangeToScreenPosition)- Math.floor(that.width/2)+ xPositionmodifier) * 60 + 'px;" class="tree'
		+that.LeafDensity+'Top'+0+ '"></div>')
		}

		for(var topIndex = 1 + xPositionmodifier; topIndex < that.width - xPositionmodifier*2; topIndex++)
		{
				$('#tileWrapper').append('<div style="top:'+ (480 - (that.height- heightModifier) * 60)+'px; left:'
		+ ((that.worldPosition + that.positionChangeToScreenPosition)- Math.floor(that.width/2)+ topIndex) * 60 + 'px;" class="tree'
		+that.LeafDensity+'Top'+1+ '"></div>')

		}

		if(xPositionmodifier == 0)
		{
				$('#tileWrapper').append('<div style="top:'+ (480 - (that.height- heightModifier) * 60)+'px; left:'
		+ ((that.worldPosition + that.positionChangeToScreenPosition)+ Math.floor(that.width/2)- xPositionmodifier) * 60 + 'px;" class="tree'
		+that.LeafDensity+'Right'+0+ '"></div>')
			}
			else
			{
			$('#tileWrapper').append('<div style="top:'+ (480 - (that.height- heightModifier) * 60)+'px; left:'
		+ ((that.worldPosition + that.positionChangeToScreenPosition)+ Math.floor(that.width/2)- xPositionmodifier) * 60 + 'px;" class="tree'
		+that.LeafDensity+'Top'+2+ '"></div>')
		}


		//if(width!=3) go right one
		//start&draw at top0 go right
		//repeat if(width==3) go to last right else go to last.previous right
		//draw top1
		//end&draw at top2 end all

	}

	this.clearTree = function() {
		$('#tileWrapper').empty();
	}
}
