

function snake(initialDirection, initialCoordinates) {
	var direction = initialDirection;
	var coordinates = initialCoordinates;

	function move(boundary) {
		var oldPoint = coordinates.pop();
		var point = coordinates.length ? coordinates[0] : oldPoint;
		var newPoint = { 
			x: point.x, 
			y: point.y 
		};

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
		coordinates.unshift(newPoint);

		return {
			oldPoint: oldPoint,
			newPoint: newPoint
		}
	}

	function changeDirection(newDirection) {
		direction = newDirection.toLowerCase();
	}

	return {
		coordinates: coordinates,
		symbol: 'o',
		move: move,
		changeDirection: changeDirection
	}
}