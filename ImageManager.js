var ImageManager = function()
{
	var that = this;
	
	/*
	 * preloaded images
	 */
	var images = [];
	
	/*
	 * Imagepositions in playerCoordinates
	 */
	var imagePositions = [];
	
	this.preloadImage =  function(imageUrl, identifier, position)
	{
		images[identifier].src = "" + imageUrl;	
		imagePositions[identifier] = position;
	} 
	
	this.accessImage = function(identifier)
	{
		return image[identifier];
	}
	
	this.getImagePosition = function(identifier)
	{
		
	}
	
	
}
