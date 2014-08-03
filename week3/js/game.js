
function Game(snake, board) {
	this.snake = snake;
	this.board = board;
	this.food;
	this.interval;
}

Game.prototype.setup = function() {
	var self = this;

	function placeSnakeOnGrid() {
		for (var i = 0; i < self.snake.coordinates.length; i++) {
			self.board.setCell(self.snake.coordinates[i], self.snake.symbol);
		}
	}

	function isArrowKey(e) {
		return e.keyCode >= 37 && e.keyCode <= 40
	}

	function subscribeArrowKeys() {
		$('body').keydown(function(e) {
			if (!isArrowKey(e)) return;

			var newDirection = e.originalEvent.keyIdentifier.toLowerCase();
			self.snake.changeDirection(newDirection);
		});
	}

	this.board.setupGrid();
	this.board.render();
	this.placeNewFood();
	
	subscribeArrowKeys();
	placeSnakeOnGrid();

	var gameTick = this.nextGameTick.bind(self);
	this.interval = setInterval(gameTick, 100);
}

Game.prototype.nextGameTick = function() {
	var self = this;

	function isFood(point) {
		return _.isEqual(point, self.food.point);	
	}

	function endGameIfSnakeRunsIntoItself(point) {
		if (this.board.getCell(point) == this.snake.symbol) {
			$('.cell').addClass('endgame');
			clearInterval(self.interval); // this doesn't work when it is this.interval
		}
	}

	var nextPoint = self.snake.getNextCoordinate();

	endGameIfSnakeRunsIntoItself(nextPoint);

	var isFoodEaten = isFood(nextPoint);
	if (isFoodEaten) { 
		self.placeNewFood();
	}

	var oldTail = self.snake.move(isFoodEaten);
	var oldSymbol = isFoodEaten ? self.snake.symbol : ' ';

	self.board.setCell(oldTail, oldSymbol);
	self.board.setCell(nextPoint, self.snake.symbol);	
}

Game.prototype.placeNewFood = function() {
	var point = this.board.getRandomEmptyCell();
	this.food = new Food(point);
	this.board.setCell(point, this.food.symbol);
}
