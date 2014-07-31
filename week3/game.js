function Game(snake, board) {
	this.snake = snake;
	this.board = board;
}

Game.prototype.placeSnakeOnGrid = function() {
	for (var i = 0; i < this.snake.coordinates.length; i++) {
		this.board.setCell(this.snake.coordinates[i], this.snake.symbol);
	}
}

Game.prototype.setup = function() {
	this.board.setupGrid();
	this.board.render();
	this.placeSnakeOnGrid();
	this.subscribeArrowKeys();
	this.placeNewFood();
}

Game.prototype.end = function() {
	$('.cell').addClass('endgame');
}

Game.prototype.isArrowKey = function(e) {
	return e.keyCode >= 37 && e.keyCode <= 40
}

Game.prototype.subscribeArrowKeys = function(handler) {
	var self = this;
	$('body').keydown(function(e) {
		if (!self.isArrowKey(e)) return;

		var newDirection = e.originalEvent.keyIdentifier.toLowerCase();
		if (snake.isDirectionAllowed(newDirection)) {
			snake.changeDirection(newDirection);
		}
	});
}	

Game.prototype.isLegalMove = function(point) {
	return this.board.getCell(point) !== this.snake.symbol;
}

Game.prototype.isFoodCell = function(point) {
	return this.board.getCell(point) === 'x'
}

Game.prototype.placeNewFood = function() {
	var suitableCoordinate = false, randomX, randomY;
	
	while (!suitableCoordinate) {
		randomX = Math.round(Math.random() * (gridSize-1));
		randomY = Math.round(Math.random() * (gridSize-1));
		var point = { x: randomX, y: randomY };
		if (this.board.getCell(point) == ' ') {
			this.board.setCell(point, 'x');
			suitableCoordinate = true;
		}
	}
}
