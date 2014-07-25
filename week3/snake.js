var grid = [];

var snake = { 
	direction: 'r',
	coordinates: [ {x: 1, y: 20}, {x: 1, y:21}, {x:1, y:22} ],
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

function placeSnakeOnGrid() {
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
			var cell = $('<div>').addClass('cell').text(grid[j][i]);
			row.append(cell);
		}
	}
}

function setGridSquare(x, y, value){
	grid[x][y] = value;
}
 

function changeDirection(direction) {
	snake.direction = direction[0].toLowerCase();
}

function move(){
	var oldPoint = snake.coordinates.pop();
	setGridSquare(oldPoint.x, oldPoint.y, ' ');
	
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
	placeSnakeOnGrid();
	render();
}


$(document).ready(function() {
	setupGrid();
	placeSnakeOnGrid();
	subscribeToArrowKeys();
	render();
})