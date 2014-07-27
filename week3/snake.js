
var s = snake();
var g = game();

function snake() {
	var direction = 'r';
	var coordinates = [ {x: 1, y: 20}, {x: 1, y:21}, {x:1, y:22} ];

	function move() {
		var oldPoint = coordinates.pop();
		var point = coordinates[0];

		var newPoint = { 
			x: point.x, 
			y: point.y 
		};

		switch (direction) {
			case 'd': 
				newPoint.y++;
				break;
			case 'u': 
				newPoint.y--;
				break;
			case 'l':
				newPoint.x--;
				break;
			case 'r': 
				newPoint.x++;
				break;
		}

		coordinates.unshift(newPoint);

		return {
			oldPoint: oldPoint,
			newPoint: newPoint
		}
	}

	function changeDirection(newDirection) {
		direction = newDirection[0].toLowerCase();
	}

	return {
		coordinates: coordinates,
		symbol: 'o',
		move: move,
		changeDirection: changeDirection
	}
}

function handleArrowKey(newDirection) {
	s.changeDirection(newDirection);
	move();
}

function move(){
	var moves = s.move();
	g.updateGridSquare(moves.oldPoint, ' ');
	g.updateGridSquare(moves.newPoint, s.symbol);
}

$(document).ready(function() {
	g.setup(s.coordinates, s.symbol);
	g.subscribeToArrowKeys(handleArrowKey);
	setInterval(move, 1000);
})