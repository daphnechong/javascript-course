

function snake(initialDirection, initialCoordinates, initialBoundary) {
	var direction = initialDirection;
	var coords = initialCoordinates;
	var boundary = initialBoundary;

	function getNextCoordinate() {
		var head = coords[0];
		var newPoint = {
			x: head.x,
			y: head.y
		}
		
		switch (direction) {
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

		newPoint.y = (newPoint.y + boundary) % boundary;
		newPoint.x = (newPoint.x + boundary) % boundary;

		return newPoint;
	}

	function move(isGrowing) {
		var newPoint = getNextCoordinate();
		var oldPoint = coords[coords.length - 1]; 
		if (!isGrowing) coords.pop();
		coords.unshift(newPoint);

		return {
			oldPoint: oldPoint,
			newPoint: newPoint
		}
	}

	function changeDirection(newDirection) {		
			direction = newDirection;
	}

	function isDirectionAllowed(newDirection) {
		return !(
			newDirection == 'down' && direction == 'up' ||
			newDirection == 'up' && direction == 'down' ||
			newDirection == 'left' && direction == 'right' ||
			newDirection == 'right' && direction == 'left');
	}

	return {
		coordinates: coords,
		symbol: 'o',
		move: move,
		getNextCoordinate: getNextCoordinate,
		changeDirection: changeDirection,
		isDirectionAllowed: isDirectionAllowed
	}
}