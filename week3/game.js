function game() {
	var grid = [];
	var gridSize;
	var snakeSymbol;

	function setupGrid() {
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

	function placeSnakeOnGrid(snakeCoords) {
		for (var i = 0; i < snakeCoords.length; i++) {
			setCell(snakeCoords[i], snakeSymbol);
		}
	}

	function setup(params) {
		gridSize = params.gridSize;
		snakeSymbol = params.symbol;

		setupGrid();
		render();
		placeSnakeOnGrid(params.snakeCoords);
		subscribeArrowKeys(params.arrowKeyHandler);
	}

	function end() {
		$('.cell').addClass('endgame');
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

	function isLegalMove(point) {
		return grid[point.x][point.y] != snakeSymbol;
	}

	function isFoodCell(point) {
		return grid[point.x][point.y] == 'x'
	}

	function placeNewFood() {
		var suitableCoordinate = false, randomX, randomY;
		
		while (!suitableCoordinate) {
			randomX = Math.round(Math.random() * (gridSize-1));
			randomY = Math.round(Math.random() * (gridSize-1));

			if (grid[randomX][randomY] == ' ') {
				setCell({ x: randomX, y: randomY }, 'x');
				suitableCoordinate = true;
			}
		}
	}

	return {
		setup : setup,
		end: end,
		setCell: setCell,
		isFoodCell: isFoodCell,
		isLegalMove: isLegalMove,
		placeNewFood: placeNewFood
	}
}