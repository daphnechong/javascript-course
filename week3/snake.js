

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

	return {
		oldPoint: oldPoint,
		newPoint: newPoint
	}
}

Snake.prototype.changeDirection = function(newDirection) {		
	this.direction = newDirection;
}

Snake.prototype.isDirectionAllowed = function(newDirection) {
	return !(
		newDirection == 'down' && this.direction == 'up' ||
		newDirection == 'up' && this.direction == 'down' ||
		newDirection == 'left' && this.direction == 'right' ||
		newDirection == 'right' && this.direction == 'left');
}
