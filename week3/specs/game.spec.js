describe('Game', function() {
	var snake, board, game;

	beforeEach(function() {
		snake = jasmine.createSpyObj('snake', ['changeDirection', 'coordinates']);
		board = jasmine.createSpyObj('board', ['setupGrid', 'render', 'getRandomEmptyCell', 'setCell']);
	  game = new Game(snake, board);
	});

	describe('setup', function() {

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
});
