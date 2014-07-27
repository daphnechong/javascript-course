var grid = [];
var gridSize = 40;
var s = snake();
// var snake = { 
// 	direction: 'r',
// 	coordinates: [ {x: 1, y: 20}, {x: 1, y:21}, {x:1, y:22} ],
// 	symbol: 'o'
// }

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

function game() {

	function isArrowKey(e) {
		return e.keyCode >= 37 && e.keyCode <= 40
	}

	function subscribe(handler) {
		$( 'body' ).keydown(function(e) {
			if (isArrowKey(e)) {
				handler(e.originalEvent.keyIdentifier);	  	
		  	}
		});
	}	

	return {
		subscribeToArrowKeys : subscribe
	}
}

function handleArrowKey(newDirection) {
	s.changeDirection(newDirection);
	move();
}

function setupGrid() {
	for (var i = 0; i < gridSize; i++) {
		grid[i] = [];
		for (var j = 0; j < gridSize; j++) {
			grid[i][j] = ' ';
		}
	}
}

function placeSnakeOnGrid() {
	for (var i = 0; i < s.coordinates.length; i++) {
		var point = s.coordinates[i];
		setGridSquare(point.x, point.y, s.symbol);
	}
}

function render() { 
	for (var i = 0; i < grid.length; i++) {
		var row = $('<div>').addClass('row');
		$('#container').append(row);
		for (var j = 0; j < grid[i].length; j++) {
			var cell = $('<div>').addClass('cell').text(grid[j][i]);
			row.append(cell);
		}
	}
}

function setGridSquare(x, y, value) {
	grid[x][y] = value;
	var row = $('.row').eq(y);
	var cell = row.find('.cell').eq(x);
	cell.text(value);
}
 

function move(){
	var movements = s.move();
	setGridSquare(movements.oldPoint.x, movements.oldPoint.y, ' ');
	setGridSquare(movements.newPoint.x, movements.newPoint.y, s.symbol);
}


$(document).ready(function() {
	var g = game();
	setupGrid();
	placeSnakeOnGrid();
	g.subscribeToArrowKeys(handleArrowKey);
	render();
	setInterval(move, 1000);
})