var PlayerRoots = function() {

	var that = this

	this.fieldLength = 20
	this.airHeight = 10
	this.groundDepth = 4

	this.initGrid = function() {
		for (var x = 0; x < that.fieldLength; x++) {
			for (var y = that.airHeight; y < (that.airHeight + that.groundDepth); y++) {
				$('<div class="rootsGrid" style="top: ' + (y * 60) + 'px; left: ' + (x * 60) + 'px;" grid-pos-x="' + x + '" grid-pos-y="' + y + '"></div>')
				.appendTo('#gameWrapper')
			}
		}

		$('#gameWrapper .rootsGrid').click(function() {
			var x = $(this).attr('grid-pos-x')
			var y = $(this).attr('grid-pos-y')
			build.growRoot(x, y)
		})
	}
}