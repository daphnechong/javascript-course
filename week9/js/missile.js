function Missile(origin, destination) {
	this.origin = origin;
	this.destination = destination;
	this.currentPosition = new Coordinate(origin.x, origin.y);
	this.dx = destination.x - origin.x;
	this.dy = destination.y - origin.y;
	this.segmentX = this.dx / destination.distanceFrom(origin);
	this.segmentY = this.dy / destination.distanceFrom(origin);
	this.totalDistance = Math.abs(destination.distanceFrom(origin));
}

Missile.prototype.move = function() {
	this.currentPosition.y += this.segmentY;
	this.currentPosition.x += this.segmentX;
}

Missile.prototype.hasReachedTarget = function() {
	var distanceTravelled = Math.abs(this.currentPosition.distanceFrom(this.origin));
	return distanceTravelled > this.totalDistance;
}