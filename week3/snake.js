var grid;

function setupGrid() {
	grid = [];
	
	for (var i = 0; i < 40; i++) {
		grid[i] = [];
		for (var j = 0; j < 40; j++) {
			grid[i][j] = ' ';
		}
	}
}

function render() { 

	for (var i = 0; i < grid.length; i++) {
		var row = $('<div>').addClass('row');
		$('#container').append(row);
		for (var j = 0; j < grid[i].length; j++) {
			var cell = $('<div>').addClass('cell').text(grid[i][j]);
			row.append(cell);
			//$('.cell').css(' border', '1px solid black')
		}
	}
}
function setSquare(row, column, value){
	grid[row][column] = value;
}
function initialPosition(valueX, valueY) {
	var positionX = valueX;
	var positionY = valueY;
	return [[positionX,positionY]];
}

var snake = { 
	direction: 'r',
	coordinates: initialPosition(20, 20),
	symbol: 'o'
} 
	/* Create a Javascript object to represent your snake. Give it an initial position of [20,20] 
	and an initial direction to the right (r). Also include a variable to represent the current snake, 
	which will be an array of coordinate pairs (so an array of arrays, e.g. [[20,20]] to start)*/
function changeDirection(directionValue) {
	var newDirection = null;
	if(directionValue==="Down"){
		newDirection = 'd';
	}
	else if(directionValue==="Up"){
		newDirection = 'u';
	}
	else if(directionValue==="Left"){
		newDirection = 'l';
	}
	else if(directionValue==="Right"){
		newDirection = 'r';
	}
	snake.direction=newDirection;
	console.log(snake.direction)
}


$(document).ready(function() {
	setupGrid();
	// [20, 20]
	$( 'body' ).keydown(function(e) {
  		console.log(e.originalEvent.keyIdentifier);
  		changeDirection(e.originalEvent.keyIdentifier);
	});
	var snakeStart = snake.coordinates[0];
	setSquare(snakeStart[0],snakeStart[1],snake.symbol);
	render();
})