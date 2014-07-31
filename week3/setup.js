
var gridSize = 20;
var initialCell = Math.round(gridSize/2);
var snake = new Snake('right', [ { x: initialCell, y: initialCell } ], gridSize);
var board = new Board(gridSize);
var game = new Game(snake, board);
var interval;

function move() {
	var nextCoordinate = snake.getNextCoordinate();
	
	if (!game.isLegalMove(nextCoordinate)) { 
		game.end();
		clearInterval(interval);
		return;
	}

	var isFoodCell = game.isFoodCell(nextCoordinate);
	
	if (isFoodCell) { 
		game.placeNewFood();
	}

	var moves = snake.move(isFoodCell);
	board.setCell(moves.oldPoint, isFoodCell ? snake.symbol : ' ');
	board.setCell(moves.newPoint, snake.symbol);	
}

$(document).ready(function() {
	game.setup();
	interval = setInterval(move, 100);
})
