var grid = [];

var snake = { 
	direction: 'r',
	coordinates: [[20,20]],
	symbol: 'o'
}

function subscribeToArrowKeys() {
	$( 'body' ).keydown(function(e) {
  		console.log(e.originalEvent.keyIdentifier);
  		changeDirection(e.originalEvent.keyIdentifier);
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
	move();
	console.log(snake.direction)
}

function move(){
	switch (snake.direction) {
		case 'd': 
			snake.coordinates[0][0] = snake.coordinates[0][0]+1;
			break;
		case 'u': 
			snake.coordinates[0][0] = snake.coordinates[0][0]-1;
			break;
		case 'l': 
			snake.coordinates[0][1] = snake.coordinates[0][1]-1;
			break;
		case 'r': 
			snake.coordinates[0][1] = snake.coordinates[0][1]+1;
			break;
	}
	var point = snake.coordinates[0];
	setGridSquare(point[0],point[1],snake.symbol);

	render();
}


$(document).ready(function() {
	setupGrid();
	subscribeToArrowKeys();
	render();
})