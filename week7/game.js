var Game = function(board, bombCount) {
	this.bombCount = bombCount;
	this.board = board;


	this.board.setupGrid();
	this.board.setupBombs(bombCount);
	this.board.renderGrid();
	// initialise the bomb locations in the board

	// need an object to save the state of the 

	// subscribe to click events on the grid cells
	// on click, 
	// 		if it's an empty cell, you want to expose all the others in the immediate region
	// 		if it's a number cell, you only expose that cell
	// 		if it's a bomb, it's game over


	// for empty cell 
}

