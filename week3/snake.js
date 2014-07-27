var grid = [];
var gridSize = 40;

var snake = { 
	direction: 'r',
	coordinates: [ {x: 1, y: 20}, {x: 1, y:21}, {x:1, y:22} ],
	symbol: 'o'
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
	changeDirection(newDirection);
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
	for (var i = 0; i < snake.coordinates.length; i++) {
		var point = snake.coordinates[i];
		setGridSquare(point.x, point.y, snake.symbol);
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
 

function changeDirection(direction) {
	snake.direction = direction[0].toLowerCase();
}

function move(){
	var oldPoint = snake.coordinates.pop();
	var point = snake.coordinates[0];

	var newPoint = { 
		x: point.x, 
		y: point.y 
	};

	switch (snake.direction) {
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

	snake.coordinates.unshift(newPoint);
	setGridSquare(oldPoint.x, oldPoint.y, ' ');
	setGridSquare(newPoint.x, newPoint.y, snake.symbol);
}


$(document).ready(function() {
	var g = game();
	setupGrid();
	placeSnakeOnGrid();
	g.subscribeToArrowKeys(handleArrowKey);
	render();
	setInterval(move, 1000);
})