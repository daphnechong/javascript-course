function Coordinate(x, y) {
	this.x = x;
	this.y = y;
}

function distanceFrom(otherPoint) {
	var dx = Math.abs(this.x - otherPoint.x);
	var dy = Math.abs(this.y - otherPoint.y);
	return Math.sqrt(dx * dx + dy * dy);
}

Coordinate.prototype.distanceFrom = distanceFrom;