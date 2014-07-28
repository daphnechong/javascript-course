
var s = snake('right', [ { x: 20, y: 20 } ]);
var g = game();

function handleArrowKey(newDirection) {
	s.changeDirection(newDirection);
	move();
}

function move() {
	var moves = s.move(g.gridSize);
	g.setCell(moves.oldPoint, ' ');
	g.setCell(moves.newPoint, s.symbol);
}

$(document).ready(function() {
	g.setup(s.coordinates, s.symbol);
	g.subscribeToArrowKeys(handleArrowKey);
	//setInterval(move, 1000);
})