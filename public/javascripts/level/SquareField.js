function SquareField (width, height, squareSideLength)
{
	this.width = width;
	this.height = height;
	this.squareSideLength= squareSideLength;
	this.Squares = {};
	
	var that = this;
	var emptyImage = null;
	
	function createSquareField()
	{
		var indexX = 0;
		var indexY = 0;
		for(indexX=0; indexX * squareSideLength < width; indexX = indexX + 1)
		{
			for(indexY=0; indexY * squareSideLength < height; indexY = indexY + 1)
			{	
				var newSquare =	new Square(indexX * squareSideLength, indexY * squareSideLength, squareSideLength, emptyImage);		
				Squares[indexX + ',' + indexY] = newSquare;
			}			
		}
	}
	
	this.Square = function(x,y,sideLength, image)
	{
		this.image = image;
		this.sideLength = sideLength;
		this.position = new Array(x,y);
		
	}
	
	this.Square.prototype.drawSquare = function()
	{
		//draw image belonging to square
		//jQuery.animate()	
	}
	
	this.Square.prototype.changeImage = function(image)
	{
		this.image = image;
	}
	
	function drawField()
	{
		var fieldXIndex = 0;
		var fieldYIndex = 0;
		for(fieldXIndex = 0; fieldXIndex < width; fieldXIndex = fieldXindex + 1)
		{
			for(fieldYIndex = 0; fieldYIndex < height; fieldYIndex = fieldYindex + 1)
			{
				that.Squares[fieldXIndex + ',' + fieldYIndex].drawSquare();
			}
		}
	}
	
}
