function Missile(origin, destination, endTarget) {
	this.origin = origin;
	this.endTarget = endTarget;
	this.destination = destination;
	this.location = new Coordinate(origin.x, origin.y);
	this.dx = destination.x - origin.x;
	this.dy = destination.y - origin.y;
	this.isAlive = true;
	this.segmentX = this.dx / destination.distanceFrom(origin);
	this.segmentY = this.dy / destination.distanceFrom(origin);
	this.totalDistance = Math.abs(destination.distanceFrom(origin));
}

Missile.prototype.move = function() {
	this.location.y += this.segmentY;
	this.location.x += this.segmentX;
}

Missile.prototype.hasReachedTarget = function() {
	var distanceTravelled = Math.abs(this.location.distanceFrom(this.origin));
	return distanceTravelled > this.totalDistance;
}