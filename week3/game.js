function game() {
	var grid = [];

	function setupGrid(gridSize) {
		for (var i = 0; i < gridSize; i++) {
			grid[i] = [];
			for (var j = 0; j < gridSize; j++) {
				grid[i][j] = ' ';
			}
		}
	}

	function render() { 
		for (var i = 0; i < grid.length; i++) {
			var row = $('<div>').addClass('row');
			$('#container').append(row);
			for (var j = 0; j < grid[i].length; j++) {
				var cell = $('<div>').addClass('cell').text(grid[j][i]);
				row.append(cell);
			}
		}
	}

	function placeSnakeOnGrid(snakeCoords, snakeSymbol) {
		for (var i = 0; i < snakeCoords.length; i++) {
			setCell(snakeCoords[i], snakeSymbol);
		}
	}

	function setup(params) {
		setupGrid(params.gridSize);
		render();
		placeSnakeOnGrid(params.snakeCoords, params.symbol);
		subscribeArrowKeys(params.arrowKeyHandler);
	}

	function isArrowKey(e) {
		return e.keyCode >= 37 && e.keyCode <= 40
	}

	function subscribeArrowKeys(handler) {
		$('body').keydown(function(e) {
			if (isArrowKey(e)) {
				handler(e.originalEvent.keyIdentifier);	  	
		  	}
		});
	}	

	function setCell(point, value) {
		grid[point.x][point.y] = value;
		var row = $('.row').eq(point.y);
		var cell = row.find('.cell').eq(point.x);
		cell.text(value);
	}

	return {
		setCell: setCell,
		setup : setup
	}
}