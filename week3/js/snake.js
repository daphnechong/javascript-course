

function Snake(initialDirection, initialCoordinates, initialBoundary) {
	this.direction = initialDirection;
	this.coordinates = initialCoordinates;
	this.boundary = initialBoundary;
	this.symbol = 'o';
}

Snake.prototype.getNextCoordinate = function() {
	var head = this.coordinates[0];
	var newPoint = {
		x: head.x,
		y: head.y
	}

	switch (this.direction) {
		case 'down': 
			newPoint.y++;
			break;
		case 'up': 
			newPoint.y--;
			break;
		case 'left':
			newPoint.x--;
			break;
		case 'right': 
			newPoint.x++;
			break;
	}

	newPoint.y = (newPoint.y + this.boundary) % this.boundary;
	newPoint.x = (newPoint.x + this.boundary) % this.boundary;

	return newPoint;
}

Snake.prototype.move = function(isGrowing) {
	var newPoint = this.getNextCoordinate();
	var oldPoint = this.coordinates[this.coordinates.length - 1]; 
	if (!isGrowing) this.coordinates.pop();
	this.coordinates.unshift(newPoint);
	return oldPoint;
}

Snake.prototype.changeDirection = function(newDirection) {

	var isDirectionAllowed = !(
		newDirection == 'arrowdown' && this.direction == 'up' ||
		newDirection == 'arrowup' && this.direction == 'down' ||
		newDirection == 'arrowleft' && this.direction == 'right' ||
		newDirection == 'arrowright' && this.direction == 'left');

	if (isDirectionAllowed) {
		this.direction = newDirection.replace("arrow", "");
	}
}