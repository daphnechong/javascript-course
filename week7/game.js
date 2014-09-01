var Game = function(board, bombCount) {
	var self = this;
	var flaggedCount = 0;
	this.bombCount = bombCount;
	this.board = board;


	this.board.setupGrid();
	this.board.setupBombs(bombCount);
	this.board.renderGrid();
	
	// need to extract the render into a different presentaiton layer.

	var extractCoordinates = function(elementId) {
		var coords = elementId.split('-');
			var x = parseFloat(coords[0]);
			var y = parseFloat(coords[1]);
			return {x: x, y:y}
	}

	$('.cell').on('mousedown', function(e) {
		if (e.which === 1) {
			var coords = extractCoordinates(e.target.id);
			self.board.reveal(coords.x, coords.y);
		}
	});

	$('.cell').on('contextmenu', function(e) {
		var coords = extractCoordinates(e.target.id);
		var cell = self.board.getCell(coords.x, coords.y);
		cell.isFlagged = !cell.isFlagged;
		flaggedCount = flaggedCount + (cell.isFlagged ? 1 : -1);

		console.log('flagged', flaggedCount)
		if (flaggedCount === bombCount) {
			console.log('you win!');
		}
		return false;
	})
	// subscribe to click events on the grid cells
	// on click, 
	// 		if it's an empty cell, you want to expose all the others in the immediate region
	// 		if it's a number cell, you only expose that cell
	// 		if it's a bomb, it's game over


	// for empty cell 
}

