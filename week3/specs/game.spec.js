describe('Game', function() {
	var snake, board, game;

	beforeEach(function() {
		snake = jasmine.createSpyObj('snake', ['changeDirection', 'coordinates', 'symbol']);
		board = jasmine.createSpyObj('board', ['setupGrid', 'getRandomEmptyCell', 'setCell']);
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
			board.getRandomEmptyCell.and.returnValue({x:1, y:1});
			game.setup();

			expect(board.setCell).toHaveBeenCalledWith({x:1, y:1}, 'x');
		});

		it('should put the snake on the grid', function() {
			snake.coordinates = [{x:2, y:2}, {x:2, y:1}];
			snake.symbol = 's';
			game.setup();

			expect(board.setCell).toHaveBeenCalledWith({x:2, y:2}, 's');
			expect(board.setCell).toHaveBeenCalledWith({x:2, y:1}, 's');
		});
	});

});
