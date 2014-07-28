
var gridSize = 40;
var s = snake('right', [ { x: 20, y: 20 } ], gridSize);
var g = game();

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
		return;
	}

	var isFoodCell = g.isFoodCell(nextCoordinate);
	if (isFoodCell) g.placeNewFood();
	var moves = s.move(isFoodCell);
	g.setCell(moves.oldPoint, isFoodCell ? s.symbol : ' ');
	g.setCell(moves.newPoint, s.symbol);	
}

$(document).ready(function() {
	g.setup({ 
		gridSize: gridSize, 
		snakeCoords: s.coordinates, 
		symbol: s.symbol,
		arrowKeyHandler: handleArrowKey
	});
	g.placeNewFood();
	setInterval(move, 300);
})


// var q = snake('right', [{x:1, y:1}]);
// q.coordinates = [{x:3, y:3}];
// q.move(5);
// q.coordinates are x:2, y:1 it hasn't kept the new assignment
