
function Game(snake, board) {
	this.snake = snake;
	this.board = board;
	this.interval;
}

Game.prototype.setup = function() {
	var self = this;

	function placeSnakeOnGrid() {
			for (var i = 0; i < this.snake.coordinates.length; i++) {
			this.board.setCell(this.snake.coordinates[i], this.snake.symbol);
		}
	}

	function arrowKeyHandler(newDirection) {
		var newDirection = newDirection.toLowerCase();
		if (snake.isDirectionAllowed(newDirection)) {
			snake.changeDirection(newDirection);
		}
	}

	function isArrowKey(e) {
		return e.keyCode >= 37 && e.keyCode <= 40
	}

	function subscribeArrowKeys() {
		$('body').keydown(function(e) {
			if (!isArrowKey(e)) return;
			arrowKeyHandler(e.originalEvent.keyIdentifier);
		});
	}

	this.board.setupGrid();
	this.board.render();
	this.placeNewFood();
	
	subscribeArrowKeys();
	placeSnakeOnGrid();

	var moveGame = this.move.bind(self);
	this.interval = setInterval(moveGame, 100);
}

Game.prototype.move = function() {
	var self = this;
	function isFoodCell(point) {
		return this.board.getCell(point) === 'x';	
	}

	function endGameIfSnakeRunsIntoItself(point) {
		if (this.board.getCell(point) == this.snake.symbol) {
			$('.cell').addClass('endgame');
			clearInterval(self.interval);
		}
	}

	var nextPoint = this.snake.getNextCoordinate();
	endGameIfSnakeRunsIntoItself(nextPoint);
	var isFoodCell = isFoodCell(nextPoint);
	if (isFoodCell) { 
		this.placeNewFood();
	}

	var oldPoint = this.snake.move(isFoodCell);
	this.board.setCell(oldPoint, isFoodCell ? snake.symbol : ' ');
	this.board.setCell(nextPoint, snake.symbol);	
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
