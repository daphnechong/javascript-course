
var gridSize = 20;
var initialCell = Math.round(gridSize/2);
var s = new Snake('right', [ { x: initialCell, y: initialCell } ], gridSize);
var board = new Board(gridSize);
var g = new Game(s, board);
var interval;

function handleArrowKey(newDirection) {
	newDirection = newDirection.toLowerCase();
	if (s.isDirectionAllowed(newDirection)) {
		s.changeDirection(newDirection);
		move();
	}
}

function move() {
	var nextCoordinate = s.getNextCoordinate();
	
	if (!g.isLegalMove(nextCoordinate)) { 
		g.end();
		clearInterval(interval);
		return;
	}

	var isFoodCell = g.isFoodCell(nextCoordinate);
	
	if (isFoodCell) { 
		g.placeNewFood();
	}

	var moves = s.move(isFoodCell);
	board.setCell(moves.oldPoint, isFoodCell ? s.symbol : ' ');
	board.setCell(moves.newPoint, s.symbol);	
}

$(document).ready(function() {
	g.setup({ 
		gridSize: gridSize, 
		snakeCoords: s.coordinates, 
		symbol: s.symbol,
		arrowKeyHandler: handleArrowKey
	});
	g.placeNewFood();
	interval = setInterval(move, 100);
})
