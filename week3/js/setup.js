var gridSize = 20;
var middle = Math.round(gridSize/2);
var snake = new Snake('right', [ { x: middle, y: middle } ], gridSize);
var board = new Board(gridSize);
var game = new Game(snake, board);

$(document).ready(function() {
	game.setup();
})
