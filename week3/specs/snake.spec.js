describe('Snake', function() {

	it('should use initial coordinates to set up initial position', function() {
		var gridSize = 5;
		var mockHandler = jasmine.createSpy('handler');
    var s = new Snake('right', [ {x: 1, y: 2}], gridSize);	
    
    expect(s.coordinates.length).toBe(1);
    expect(s.coordinates).toEqual([{ x: 1, y: 2 }]);
	});

	describe('getNextCoordinate', function() {

	});

	describe('move', function() {

		describe('simple movement', function() {
			it('should increment the x-coordinate if the snake is moving right', function() {
				var gridSize = 40;
				var s = new Snake('right', [{x: 20, y: 20}], gridSize);	
		    s.move(false);

		    expect(s.coordinates).toEqual([{ x: 21, y: 20 }]);
			});

			it('should decrement the x-coordinate if the snake is moving left', function() {
				var gridSize = 40;
				var s = new Snake('left', [{x: 20, y: 20}], gridSize);	
		    s.move(false);

		    expect(s.coordinates).toEqual([{ x: 19, y: 20 }]);
			});

			it('should decrement the y-coordinate if the snake is moving up', function() {
				var gridSize = 40;
				var s = new Snake('up', [{x: 20, y: 20}], gridSize);	
			  s.move(false);

			  expect(s.coordinates).toEqual([{ x: 20, y: 19 }]);
			});

			it('should increment the y-coordinate if the snake is moving down', function() {
				var gridSize = 40;
				var s = new Snake('down', [{x: 20, y: 20}], gridSize);	
		    s.move(false);

		    expect(s.coordinates).toEqual([{ x: 20, y: 21 }]);
			});
		});

		describe('wrapping movement', function() {
			it('should wrap coordinates around to zero when a top boundary is reached on x-coordinate', function() {
				var gridSize = 5;
				var s = new Snake('right', [ {x: 4, y: 4}], gridSize);
			  s.move(false);

		    expect(s.coordinates[0]).toEqual({ x: 0, y: 4});
			});

			it('should wrap coordinates around to top boundary when bottom of coordinate grid is reached on x-coordinate', function() {
				var gridSize = 5;
				var s = new Snake('left', [ {x: 0, y: 0}], gridSize);
		    s.move(false);

		    expect(s.coordinates[0]).toEqual({ x: 4, y: 0});
			});

			it('should wrap coordinates around to zero when a top boundary is reached on y-coordinate', function() {
				var gridSize = 5;
				var s = new Snake('down', [ {x: 4, y: 4}], gridSize);	
		    s.move(false);

		    expect(s.coordinates[0]).toEqual({ x: 4, y: 0});
			});

			it('should wrap coordinates around to top boundary when bottom of coordinate grid is reached on y-coordinate', function() {
				var gridSize = 5;
				var s = new Snake('up', [ {x: 0, y: 0}], gridSize);
		    s.move(false);

		    expect(s.coordinates[0]).toEqual({ x: 0, y: 4});
			});
		})

		it('should return the last tail coordinate of the snake after movement', function() {
			var gridSize = 5;
			var s = new Snake('up', [ { x: 2, y: 2 }, { x: 2, y: 3 }], gridSize);
	    var oldPoint = s.move(false);

	    expect(oldPoint).toEqual({ x: 2, y: 3}); 
		});

		it('should increase the number of snake coordinates if snake is growing', function() {
			var gridSize = 5;
			var s = new Snake('up', [ { x: 2, y: 2 }, { x: 2, y: 3 }], gridSize);
	    s.move(true);

	    expect(s.coordinates.length).toEqual(3); 
		});

		it('should set the new coordinates of the snake', function() {
			var gridSize = 5;
			var s = new Snake('up', [ { x: 2, y: 2 }, { x: 2, y: 3 }], gridSize);
	    s.move(false);

	    expect(s.coordinates).toEqual([ { x: 2, y: 1}, { x: 2, y: 2} ]); 
		});
	});
});
