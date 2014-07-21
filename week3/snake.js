var grid = [];

var snake = { 
	direction: 'r',
	coordinates: [{ x:20, y:20 }, { x:20, y:21}],
	symbol: 'o'
}

function subscribeToArrowKeys() {
	$( 'body' ).keydown(function(e) {
  		changeDirection(e.originalEvent.keyIdentifier);
  		move();
	});
}

function setupGrid() {
	for (var i = 0; i < 40; i++) {
		grid[i] = [];
		for (var j = 0; j < 40; j++) {
			grid[i][j] = ' ';
		}
	}
}

function setupSnake() {
	for (var i = 0; i < snake.coordinates.length; i++) {
		var point = snake.coordinates[i];
		setGridSquare(point.x, point.y, snake.symbol);
	}
}

function render() { 
	$('#container').empty();
	for (var i = 0; i < grid.length; i++) {
		var row = $('<div>').addClass('row');
		$('#container').append(row);
		for (var j = 0; j < grid[i].length; j++) {
			var cell = $('<div>').addClass('cell').text(grid[i][j]);
			row.append(cell);
		}
	}
}

function setGridSquare(row, column, value){
	grid[row][column] = value;
}
 

function changeDirection(direction) {
	snake.direction = direction[0].toLowerCase();
}

function move(){
	var oldPoint = snake.coordinates.shift();
	point = snake.coordinates[0];
	setGridSquare(oldPoint.x, oldPoint.y, ' ');

	var newPoint = { 
		x: point.x, 
		y: point.y 
	};

	switch (snake.direction) {
		case 'd': 
			newPoint.x++;
			break;
		case 'u': 
			newPoint.x--;
			break;
		case 'l':
			newPoint.y--;
			break;
		case 'r': 
			newPoint.y++;
			break;
	}

	snake.coordinates.push(newPoint);
	console.log(snake.coordinates[0], snake.coordinates[1])

	setupSnake();
	render();
}


$(document).ready(function() {
	setupGrid();
	setupSnake();
	subscribeToArrowKeys();
	render();
})