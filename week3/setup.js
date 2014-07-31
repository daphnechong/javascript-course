
var gridSize = 20;
var initialCell = Math.round(gridSize/2);
var snake = new Snake('right', [ { x: initialCell, y: initialCell } ], gridSize);
var board = new Board(gridSize);
var game = new Game(snake, board);

$(document).ready(function() {
	game.setup();
})
