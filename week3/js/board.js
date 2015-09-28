function Board(size) {
	this.grid = [];
	this.gridSize = size;
}

Board.prototype.setupGrid = function() {
	for (var i = 0; i < this.gridSize; i++) {
		this.grid[i] = [];
		for (var j = 0; j < this.gridSize; j++) {
			this.grid[i][j] = ' ';
		}
	}

	//render
	for (var i = 0; i < this.grid.length; i++) {
		var row = $('<div>').addClass('row');
		$('#container').append(row);
		for (var j = 0; j < this.grid[i].length; j++) {
			var cell = $('<div>').addClass('cell').text(this.grid[j][i]);
			row.append(cell);
		}
	}
}

Board.prototype.setCell = function(point, value) {
	this.grid[point.x][point.y] = value;
	var row = $('.row').eq(point.y);
	var cell = row.find('.cell').eq(point.x);
	cell.addClass(value);
}

Board.prototype.getCell = function(point) {
	return this.grid[point.x][point.y];
}

Board.prototype.clearCell = function(point){
	this.grid[point.x][point.y] = ' ';
	var row = $('.row').eq(point.y);
	var cell = row.find('.cell').eq(point.x);
	cell.removeClass('x');
	cell.removeClass('o');
}

Board.prototype.getRandomEmptyCell = function() {
	var randomX, randomY;
	
	while (true) {
		randomX = Math.round(Math.random() * (this.gridSize-1));
		randomY = Math.round(Math.random() * (this.gridSize-1));

		if (this.grid[randomX][randomY] == ' ')
		{
			return { x: randomX, y: randomY };
		}
	}
}