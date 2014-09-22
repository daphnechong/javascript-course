function Missile(origin, destination) {
	this.origin = origin;
	this.currentPosition = new Coordinate(origin.x, origin.y);
	this.destination = destination;
	this.dx = destination.x - origin.x;
	this.dy = destination.y - origin.y;
	this.segmentX = this.dx / destination.distanceFrom(origin);
	this.segmentY = this.dy / destination.distanceFrom(origin);
}

Missile.prototype.move = function() {
	this.currentPosition.y += this.segmentY;
	this.currentPosition.x += this.segmentX;
}
