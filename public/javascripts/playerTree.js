var PlayerTree = function(startLeafDensity, startRootDensity, startPosition, positionChangeToScreenPosition, startWidth, startHeight, associatedPlayer)
{
	this.LeafDensity = startLeafDensity;
	this.RootDensity = startRootDensity;
	
	this.worldPosition = startPosition;
	/*
	 * tree position in screen coords is based on the position of the playerstree (playertree is in center (x= 15))
	 */
	this.positionChangeToScreenPosition = positionChangeToScreenPosition;	
	this.width = startWidth;
	this.height = startHeight;
	this.PlayerName = associatedPlayer;
	this.rootPositions = {};
	
	that = this;
		
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
	
	this.drawTree = function()
	{
		//draw trunk position y-2
		$('#tileWrapper').append('<div style="top:480px; left:'+ (that.worldPosition + that.positionChangeToScreenPosition) * 60 + 'px;" class="tree'+that.LeafDensity+'Trunk'+Math.ceil(that.width/2)+ '"></div>')
		//start&draw at left2 go right
		$('#gameWrapper').append('<div style="top:420px; left:'
		+ (that.worldPosition + that.positionChangeToScreenPosition) * 60 + 'px;" class="tree'
		+that.LeafDensity+'Left'+2+ '"></div>')
		
		
		//draw bottom0 until reaching trunk-position
		//draw bottom1 after reaching trunk-position
		//or randombottom
		//end&draw at right2 go 1 up		
		
		
		
		//repeat if(width == 3) until height-1
		//else until height -2
				
		//start&draw at left1 go right
		//draw random center		
		//end&draw at right1 go 1 up		
		//repeat end
		
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
