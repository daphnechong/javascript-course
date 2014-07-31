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
}


Board.prototype.render = function() { 
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
	cell.text(value);
}

Board.prototype.getCell = function(point) {
	return this.grid[point.x][point.y];
}