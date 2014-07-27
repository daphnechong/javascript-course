
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

function game() {
	var grid = [];
	var gridSize = 40;
	
	function setupGrid() {
		for (var i = 0; i < gridSize; i++) {
			grid[i] = [];
			for (var j = 0; j < gridSize; j++) {
				grid[i][j] = ' ';
			}
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

	function setup(initialSnake, symbol) {
		setupGrid();
		
		for (var i = 0; i < initialSnake.length; i++) {
			updateGridSquare(initialSnake[i], symbol);
		}

		render();
	}

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

	function updateGridSquare(point, value) {
		grid[point.x][point.y] = value;
		var row = $('.row').eq(point.y);
		var cell = row.find('.cell').eq(point.x);
		cell.text(value);
	}

	return {
		subscribeToArrowKeys : subscribe,
		updateGridSquare: updateGridSquare,
		setup : setup
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