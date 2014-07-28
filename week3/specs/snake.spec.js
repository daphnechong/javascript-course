describe('Snake', function() {

	it('should be one block in the middle of the grid to start', function() {
		var mockHandler = jasmine.createSpy('handler');
	    var s = snake();	
	    
	    expect(s.coordinates.length).toBe(1);
	    expect(s.coordinates).toEqual([{x: 20, y:20}]);
	});

	it('should move one square in the appropriate direction when move is called', function() {
		var mockHandler = jasmine.createSpy('handler');
	    var s = snake();	
	    var moves = s.move(40);

	    expect(moves.oldPoint).toEqual({ x: 20, y: 20}); 
	    expect(moves.newPoint).toEqual({ x: 21, y: 20});

	    expect(s.coordinates.length).toBe(1);
	    expect(s.coordinates).toEqual( [{ x: 21, y: 20 }] );
	});

	it('should wrap coordinates around to zero when a top boundary is reached on x-coordinate', function() {
		var mockHandler = jasmine.createSpy('handler');
	    var s = snake();
	    var moves = s.move(21);

	    expect(moves.oldPoint).toEqual({ x: 20, y: 20}); 
	    expect(moves.newPoint).toEqual({ x: 0, y: 20});
	    
	    expect(s.coordinates.length).toBe(1);
	    expect(s.coordinates).toEqual( [{ x: 0, y: 20 }] );
	});

	it('should wrap coordinates around to zero when a top boundary is reached on y-coordinate', function() {
		var mockHandler = jasmine.createSpy('handler');
	    var s = snake();	
	    s.changeDirection('down')
	    var moves = s.move(21);

	    expect(moves.oldPoint).toEqual({ x: 20, y: 20}); 
	    expect(moves.newPoint).toEqual({ x: 20, y: 0});
	    
	    expect(s.coordinates.length).toBe(1);
	    expect(s.coordinates).toEqual( [{ x: 20, y: 0 }] );
	});
});
