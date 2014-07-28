
var gridSize = 40;
var s = snake('right', [ { x: 20, y: 20 } ]);
var g = game();

function handleArrowKey(newDirection) {
	s.changeDirection(newDirection);
	move();
}

function move() {
	var moves = s.move(gridSize);
	g.setCell(moves.oldPoint, ' ');
	g.setCell(moves.newPoint, s.symbol);
}

$(document).ready(function() {
	g.setup({ 
		gridSize: gridSize, 
		snakeCoords: s.coordinates, 
		symbol: s.symbol,
		arrowKeyHandler: handleArrowKey
	});
	//setInterval(move, 1000);
})