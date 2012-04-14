var ImageManager = function()
{
	var that = this;
	
	/*
	 * preloaded images
	 */
	var images = [];	
	
	var backgroundImage = null;
	
	this.preloadAllImages = function()
	{
		
	}
	
	
	this.preloadImage =  function(imageUrl, identifier, position, width, height)
	{
		//images[identifier] = new Image();
		images[identifier].src = "" + imageUrl;	
		images[identifier].positions = position;
		images[identifier].width = width;
		images[identifier].height = height;
		images[identifier].id = identifier;
	} 
	
	this.preloadBackgroundImage = function(imageUrl, width, height, identifier)
	{
		backgroundImage.src = "" + imageUrl;
		backgroundImage.width = width;
		backgroundImage.height = height;
		backgroundImage.id = identifier;
	}
	
	this.accessImage = function(identifier)
	{
		return images[identifier];
	}
	
	this.getImagePositions = function(identifier)
	{
		return images[identifier].positions;
	}
	
	this.setImagePositions = function(identifier, positions)
	{
		images[identifier].positions = positions;
	}
	
	this.addImagePosition = function(identifier, position)
	{
		images[identifier].positions[positions.length] = position;
	}
	
	this.removeImagePosition = function(identifier, position)
	{
		for (positionIndex = 0; positionIndex < images[i].positions.length; positionIndex = positionIndex + 1)
		{
			if(images[i].positions[positionIndex].x)
			{
				if(images[i].positions[positionIndex].y)
				{
					images[i].positions.splice(positionIndex, 1);
					break;	
				}	
			}				
		}
	}	
	
	
	this.drawImages = function()
	{		
		$(document).ready(function()
		{
			$('#'+ backgroundImage.id).animate(
			{
				height: "" + backgroundImage.height,
				width: "" + backgroundImage.width
			})
						
			jQuery.each(images, function(i)
			{
				var positionIndex = 0;
				for (positionIndex = 0; positionIndex < images[i].positions.length; positionIndex = positionIndex + 1)
				{	
					$('<img id="'+ images[i].id+'" src="' +	 images[i].src + 
					'" style="position:absolute; top:' + images[i].positions[positionIndex].y+
					'; left: '+images[i].positions[positionIndex].x+';" />').appendTo('#gameWrapper');								
				} 
					//$('#' + images[i].id).animate
					
			})
		})
	}
	
	module.exports.ImageManager = function() {
	return new ImageManager();
}
	
}
