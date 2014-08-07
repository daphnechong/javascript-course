describe('Game', function() {
	var snake, board, game;

	beforeEach(function() {
		snake = jasmine.createSpyObj('snake', ['changeDirection', 'coordinates', 'symbol', 'getNextCoordinate', 'move']);
		board = jasmine.createSpyObj('board', ['setupGrid', 'getRandomEmptyCell', 'setCell', 'getCell']);
	  game = new Game(snake, board);
	});

	describe('setup', function() {

		describe('arrow keys', function() {
			function triggerKeyDownWithCodeAndIdentifier(keyCode, identifier) {
				var e = $.Event('keydown');
				e.keyCode = keyCode;
				e.originalEvent = { keyIdentifier: identifier };
				$('body').trigger(e);
			}

			it('should listen to left arrow key presses', function() {
			  game.setup();	
				
				triggerKeyDownWithCodeAndIdentifier(37, 'left');

				expect(snake.changeDirection).toHaveBeenCalledWith('left');
			});

			it('should listen to right arrow key presses', function() {
				game.setup();	

				triggerKeyDownWithCodeAndIdentifier(39, 'right');

				expect(snake.changeDirection).toHaveBeenCalledWith('right');
			});

			it('should listen to up arrow key presses', function() {
				game.setup();

				triggerKeyDownWithCodeAndIdentifier(38, 'up');

				expect(snake.changeDirection).toHaveBeenCalledWith('up');
			});

			it('should listen to down arrow key presses', function() {
				game.setup();

				triggerKeyDownWithCodeAndIdentifier(40, 'down');

				expect(snake.changeDirection).toHaveBeenCalledWith('down');
			});

			it('should ignore other keys being pressed', function() {
				game.setup();

				triggerKeyDownWithCodeAndIdentifier(86, 'a');

				expect(snake.changeDirection).not.toHaveBeenCalled();
			});
		});

		it('should set up board', function() {
			game.setup();

			expect(board.setupGrid).toHaveBeenCalled();
		});

		it('should put the first piece of food on the grid', function() {
			spyOn(game, 'placeNewFood').and.callThrough();
			game.setup();

			expect(game.placeNewFood).toHaveBeenCalled();
		});

		it('should put the snake on the grid', function() {
			snake.coordinates = [{x:2, y:2}, {x:2, y:1}];
			snake.symbol = 's';
			game.setup();

			expect(board.setCell).toHaveBeenCalledWith({x:2, y:2}, 's');
			expect(board.setCell).toHaveBeenCalledWith({x:2, y:1}, 's');
		});
	});

	describe('next game tick -- THIS FUNCTION DOES TOO MUCH :P -- ', function() {

		beforeEach(function() {
			snake = new Snake('up', [{x:1, y:1}], 3);
			board = new Board(3);
		  game = new Game(snake, board);
		});

		it('should move the snake and update the board', function() {
			spyOn(snake, 'getNextCoordinate').and.callThrough();
			spyOn(snake, 'move').and.callThrough();
			game.setup();
			game.nextGameTick();
			expect(snake.getNextCoordinate).toHaveBeenCalled();
			expect(snake.move).toHaveBeenCalled();
		});

		it('should place new food if food is eaten', function() {
			spyOn(board, 'getRandomEmptyCell').and.returnValue({x:1, y:0});
			spyOn(game, 'placeNewFood').and.callThrough();

			game.setup();
			game.nextGameTick();
			
			expect(game.placeNewFood.calls.count()).toEqual(2);
		});

		it('should set the old cell to be empty', function() {
			var tail = snake.coordinates[snake.coordinates.length-1];
			spyOn(board, 'setCell').and.callThrough();
			game.setup();
			game.nextGameTick();

			expect(board.setCell).toHaveBeenCalledWith(tail, ' ');
		});

		it('should set the old cell to be snake if it ate food', function() {
			var nextFood = {x:1, y:0}
			spyOn(board, 'setCell').and.callThrough();
			spyOn(board, 'getRandomEmptyCell').and.returnValue(nextFood);

			game.setup();
			game.nextGameTick();

			expect(board.setCell).toHaveBeenCalledWith(nextFood, 'o');
		});

		it('should set the new cell to be snake', function() {
			spyOn(board, 'setCell').and.callThrough();
			
			game.setup();
			game.nextGameTick();

			expect(board.setCell).toHaveBeenCalledWith({x:1, y:0}, 'o');
		});

		xit('should end the game if the snake runs into itself', function() {			
			snake = new Snake('up', [{x:1, y:1}, {x:1, y:0}], 3);
			board = new Board(3);
		  game = new Game(snake, board);
			game.setup();

			spyOn(jQuery, 'addClass').and.callThrough();

			game.nextGameTick();

			expect(jQuery.addClass).toHaveBeenCalledWith('endgame');
		});
	});

	describe('place new food', function() {
		it('should find an empty cell to put the food on', function() {
			game.placeNewFood();

			expect(board.getRandomEmptyCell).toHaveBeenCalled();
		});

		it('should update the board cell with the food', function() {
			board.getRandomEmptyCell.and.returnValue({x:1, y:1});
			game.placeNewFood();

			expect(board.setCell).toHaveBeenCalledWith({x:1, y:1}, 'x');
			
		});
	});
});
