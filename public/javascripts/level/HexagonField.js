function HexagonField(width, height, hexagonSize, hexagonRatio)
{	
	this.width = width;
	this.height = height;
	this.hexSize = hexagonSize;
	this.hexRatio = hexagonRatio;
	
	var that = this;
	
	this.Point = function(x, y) 
	{
		this.X = x;
		this.Y = y;
	};

	/*
	 * not sure if this needs to be used
	 */
	this.Rectangle = function(x, y, width, height) {
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
};
	
	/*
	 * not sure if this needs to be used
	 */
	this.Line = function(x1, y1, x2, y2) {
	this.X1 = x1;
	this.Y1 = y1;
	this.X2 = x2;
	this.Y2 = y2;
};
	
	this.findHexWithSideLengthAndRatio = function ()
	{
		var sideLength = this.hexSize;
		var ratio = this.hexRatio;
	
		//solve quadratic
		var ratioSquare = Math.pow(ratio, 2);
		var a = (1 + ratioSquare)/ratioSquare;
		var b = sideLength/ratio;
		var c = ((1-4.0*ratioSquare)/(4.0*ratioSquare)) * (Math.pow(sideLength, 2));
	
		var x = (-b + Math.sqrt(Math.pow(b,2)-(4.0*a*c)))/(2.0*a);
	
		var y = ((2.0 * x) + z)/(2.0 * r);
	
		var contentDiv = document.getElementById("hexStatus");

		var width = ((2.0*x)+sideLength);
		var height = (2.0*y);
		
		this.Hexagon.Static.WIDTH = width;
		this.Hexagon.Static.HEIGHT = height;
		this.Hexagon.Static.SIDE = sideLength;
	}
	
	this.Grid = function()
	{
		width = that.width;
		height = that.height;
		that.Hexes = [];
		//setup a dictionary for use later for assigning the Y CoOrd
		var HexagonsByXCoOrd = {}; //Dictionary<int, List<Hexagon>>

		var row = 0;
		var y = 0.0;
		while (y + that.Hexagon.Static.HEIGHT <= height)
		{
			var col = 0;

			var offset = 0.0;
			if (row % 2 == 1)
			{
				if(that.Hexagon.Static.ORIENTATION == that.Hexagon.Orientation.Normal)
					offset = (that.Hexagon.Static.WIDTH - that.Hexagon.Static.SIDE)/2 + that.Hexagon.Static.SIDE;
				else
					offset = that.Hexagon.Static.WIDTH / 2;
				col = 1;
			}
		
			var x = offset;
			while (x + that.Hexagon.Static.WIDTH <= width)
			{
		    	var hexId = that.GetHexId(row, col);
				var h = new HT.Hexagon(hexId, x, y);
				h.PathCoOrdX = col;//the column is the x coordinate of the hex, for the y coordinate we need to get more fancy
				that.Hexes.push(h);
			
				if (!HexagonsByXCoOrd[col])
					HexagonsByXCoOrd[col] = [];
				HexagonsByXCoOrd[col].push(h);

				col+=2;
				if(that.Hexagon.Static.ORIENTATION == that.Hexagon.Orientation.Normal)
					x += that.Hexagon.Static.WIDTH + that.Hexagon.Static.SIDE;
				else
					x += that.Hexagon.Static.WIDTH;
			}
			row++;
			if(that.Hexagon.Static.ORIENTATION == that.Hexagon.Orientation.Normal)
				y += that.Hexagon.Static.HEIGHT / 2;
			else
				y += (that.Hexagon.Static.HEIGHT - that.Hexagon.Static.SIDE)/2 + that.Hexagon.Static.SIDE;
		}

		//finally go through our list of hexagons by their x co-ordinate to assign the y co-ordinate
		for (var x in HexagonsByXCoOrd)
		{
			var hexagonsByX = HexagonsByXCoOrd[x];
			var yCoOrd = Math.floor(x / 2) + (x % 2);
			for (var y in hexagonsByX)
			{
				var h = hexagonsByX[y];//Hexagon
				h.PathCoOrdY = yCoOrd++;
			}
		}
	}

	this.Grid.prototype.GetHexAt = function(/*Point*/ p) {
	//find the hex that contains this point
	for (var h in that.Hexes)
	{
		if (that.Hexes[h].Contains(p))
		{
			return that.Hexes[h];
		}
	}

	return null;
};

	this.Grid.prototype.GetHexDistance = function(/*Hexagon*/ h1, /*Hexagon*/ h2) {
	//a good explanation of this calc can be found here:
	//http://playtechs.blogspot.com/2007/04/hex-grids.html
	var deltaX = h1.PathCoOrdX - h2.PathCoOrdX;
	var deltaY = h1.PathCoOrdY - h2.PathCoOrdY;
	return ((Math.abs(deltaX) + Math.abs(deltaY) + Math.abs(deltaX - deltaY)) / 2);
};

 	this.Grid.prototype.GetHexById = function(id) {
	for(var i in that.Hexes)
	{
		if(that.Hexes[i].Id == id)
		{
			return that.Hexes[i];
		}
	}
	return null;
};

	this.Hexagon = function(id, x, y) 
	{
		that.Points = [];//Polygon Base
		var x1 = null;
		var y1 = null;
		if(that.Hexagon.Static.ORIENTATION == that.Hexagon.Orientation.Normal)
		 {
			x1 = (that.Hexagon.Static.WIDTH - that.Hexagon.Static.SIDE)/2;
			y1 = (that.Hexagon.Static.HEIGHT / 2);
			that.Points.push(new that.Point(x1 + x, y));
			that.Points.push(new that.Point(x1 + that.Hexagon.Static.SIDE + x, y));
			that.Points.push(new that.Point(that.Hexagon.Static.WIDTH + x, y1 + y));
			that.Points.push(new that.Point(x1 + that.Hexagon.Static.SIDE + x, that.Hexagon.Static.HEIGHT + y));
			that.Points.push(new that.Point(x1 + x, that.Hexagon.Static.HEIGHT + y));
			that.Points.push(new that.Point(x, y1 + y));
		}
		else 
		{
			x1 = (that.Hexagon.Static.WIDTH / 2);
			y1 = (that.Hexagon.Static.HEIGHT - HT.Hexagon.Static.SIDE)/2;
			that.Points.push(new that.Point(x1 + x, y));
			that.Points.push(new that.Point(that.Hexagon.Static.WIDTH + x, y1 + y));
			that.Points.push(new that.Point(that.Hexagon.Static.WIDTH + x, y1 + that.Hexagon.Static.SIDE + y));
			that.Points.push(new that.Point(x1 + x, that.Hexagon.Static.HEIGHT + y));
			that.Points.push(new that.Point(x, y1 + that.Hexagon.Static.SIDE + y));
			that.Points.push(new that.Point(x, y1 + y));
		}
	
		this.Id = id;
	
		this.x = x;
		this.y = y;
		this.x1 = x1;
		this.y1 = y1;
	
		this.TopLeftPoint = new that.Point(this.x, this.y);
		this.BottomRightPoint = new that.Point(this.x + that.Hexagon.Static.WIDTH, this.y + that.Hexagon.Static.HEIGHT);
		this.MidPoint = new that.Point(this.x + (that.Hexagon.Static.WIDTH / 2), this.y + (that.Hexagon.Static.HEIGHT / 2));
	
		this.P1 = new that.Point(x + x1, y + y1);
	
		this.selected = false;
	};

	this.Hexagon.prototype.isInBounds = function(x, y) 
	{
		return this.Contains(new that.Point(x, y));
	};
	
	this.Hexagon.prototype.isInHexBounds = function(/*Point*/ p) {
	if(this.TopLeftPoint.X < p.X && this.TopLeftPoint.Y < p.Y &&
	   p.X < this.BottomRightPoint.X && p.Y < this.BottomRightPoint.Y)
		return true;
	return false;
};

	this.Hexagon.prototype.draw = function(ctx) 
	{

	if(!this.selected)
		ctx.strokeStyle = "grey";
	else
		ctx.strokeStyle = "black";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(that.Points[0].X, that.Points[0].Y);
	for(var i = 1; i < that.Points.length; i++)
	{
		var p = that.Points[i];
		ctx.lineTo(p.X, p.Y);
	}
	ctx.closePath();
	ctx.stroke();
	
	if(this.Id)
	{
		//draw text for debugging
		ctx.fillStyle = "black"
		ctx.font = "bolder 8pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = 'middle';
		//var textWidth = ctx.measureText(this.Planet.BoundingHex.Id);
		ctx.fillText(this.Id, this.MidPoint.X, this.MidPoint.Y);
	}
	
	if(this.PathCoOrdX !== null && this.PathCoOrdY !== null && typeof(this.PathCoOrdX) != "undefined" && typeof(this.PathCoOrdY) != "undefined")
	{
		//draw co-ordinates for debugging
		ctx.fillStyle = "black"
		ctx.font = "bolder 8pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = 'middle';
		//var textWidth = ctx.measureText(this.Planet.BoundingHex.Id);
		ctx.fillText("("+this.PathCoOrdX+","+this.PathCoOrdY+")", this.MidPoint.X, this.MidPoint.Y + 10);
	}
	
	if(that.Hexagon.Static.DRAWSTATS)
	{
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		//draw our x1, y1, and z
		ctx.beginPath();
		ctx.moveTo(this.P1.X, this.y);
		ctx.lineTo(this.P1.X, this.P1.Y);
		ctx.lineTo(this.x, this.P1.Y);
		ctx.closePath();
		ctx.stroke();
		
		ctx.fillStyle = "black"
		ctx.font = "bolder 8pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
		ctx.textAlign = "left";
		ctx.textBaseline = 'middle';
		//var textWidth = ctx.measureText(this.Planet.BoundingHex.Id);
		ctx.fillText("z", this.x + this.x1/2 - 8, this.y + this.y1/2);
		ctx.fillText("x", this.x + this.x1/2, this.P1.Y + 10);
		ctx.fillText("y", this.P1.X + 2, this.y + this.y1/2);
		ctx.fillText("z = " + that.Hexagon.Static.SIDE, this.P1.X, this.P1.Y + this.y1 + 10);
		ctx.fillText("(" + this.x1.toFixed(2) + "," + this.y1.toFixed(2) + ")", this.P1.X, this.P1.Y + 10);
	}
};
	
	this.Hexagon.prototype.Contains = function(/*Point*/ p) {
	var isIn = false;
	if (that.isInHexBounds(p))
	{
		//turn our absolute point into a relative point for comparing with the polygon's points
		//var pRel = new HT.Point(p.X - this.x, p.Y - this.y);
		var i, j = 0;
		for (i = 0, j = this.Points.length - 1; i < this.Points.length; j = i++)
		{
			var iP = this.Points[i];
			var jP = this.Points[j];
			if (
				(
				 ((iP.Y <= p.Y) && (p.Y < jP.Y)) ||
				 ((jP.Y <= p.Y) && (p.Y < iP.Y))
				//((iP.Y > p.Y) != (jP.Y > p.Y))
				) &&
				(p.X < (jP.X - iP.X) * (p.Y - iP.Y) / (jP.Y - iP.Y) + iP.X)
			   )
			{
				isIn = !isIn;
			}
		}
	}
	return isIn;
};

	this.Hexagon.Static = {
					HEIGHT:91.14378277661477
					, WIDTH:91.14378277661477
					, SIDE:50.0
					, ORIENTATION:0
					, DRAWSTATS: false};//hexagons will have 25 unit sides for now

}
