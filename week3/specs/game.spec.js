describe('Game', function() {
	it('should listen to left arrow key presses', function() {
		var mockHandler = jasmine.createSpy('handler');
	    var g = game();
	    g.setup({ 
	    	gridSize: 3,
	    	snakeCoords: [],
	    	symbol: 'o',
	    	arrowKeyHandler: mockHandler
	    });	

		var e = $.Event('keydown');
		e.keyCode = 37;
		e.originalEvent = { keyIdentifier: "identifier" };
		$('body').trigger(e);

		expect(mockHandler).toHaveBeenCalledWith("identifier");
	});

	it('should listen to right arrow key presses', function() {
		var mockHandler = jasmine.createSpy('handler');
	    var g = game();
	    g.setup({ 
	    	gridSize: 3,
	    	snakeCoords: [],
	    	symbol: 'o',
	    	arrowKeyHandler: mockHandler
	    });	

		var e = $.Event('keydown');
		e.keyCode = 39;
		e.originalEvent = { keyIdentifier: "identifier" };
		$('body').trigger(e);

		expect(mockHandler).toHaveBeenCalledWith("identifier");
	});

	it('should listen to up arrow key presses', function() {
		var mockHandler = jasmine.createSpy('handler');
	    var g = game();	
		g.setup({ 
	    	gridSize: 3,
	    	snakeCoords: [],
	    	symbol: 'o',
	    	arrowKeyHandler: mockHandler
	    });	

		var e = $.Event('keydown');
		e.keyCode = 38;
		e.originalEvent = { keyIdentifier: "identifier" };
		$('body').trigger(e);

		expect(mockHandler).toHaveBeenCalledWith("identifier");
	});

	it('should listen to down arrow key presses', function() {
		var mockHandler = jasmine.createSpy('handler');
	    var g = game();	
		g.setup({ 
	    	gridSize: 3,
	    	snakeCoords: [],
	    	symbol: 'o',
	    	arrowKeyHandler: mockHandler
	    });	

		var e = $.Event('keydown');
		e.keyCode = 40;
		e.originalEvent = { keyIdentifier: "identifier" };
		$('body').trigger(e);

		expect(mockHandler).toHaveBeenCalledWith("identifier");
	});

	it('should ignore other keys being pressed', function() {
		var mockHandler = jasmine.createSpy('handler');
	    var g = game();	
		g.setup({ 
	    	gridSize: 3,
	    	snakeCoords: [],
	    	symbol: 'o',
	    	arrowKeyHandler: mockHandler
	    });	

		var e = $.Event('keydown');
		e.keyCode = 86;
		$('body').trigger(e);

		expect(mockHandler).not.toHaveBeenCalled();
	});
});
