var Game = function(board, bombCount) {
	var self = this;
	this.bombCount = bombCount;
	this.board = board;


	this.board.setupGrid();
	this.board.setupBombs(bombCount);
	this.board.renderGrid();
	
	// need to extract the render into a different presentaiton layer.

	$('.cell').click(function(e) {
		var coords = e.target.id.split('-');
		var x = parseFloat(coords[0]);
		var y = parseFloat(coords[1]);
		self.board.reveal(x, y);
	});
	// subscribe to click events on the grid cells
	// on click, 
	// 		if it's an empty cell, you want to expose all the others in the immediate region
	// 		if it's a number cell, you only expose that cell
	// 		if it's a bomb, it's game over


	// for empty cell 
}

