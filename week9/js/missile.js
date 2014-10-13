function Missile(origin, endTarget) {
	this.origin = origin;
	this.endTarget = endTarget;
	this.destination = endTarget.location;
	this.currentPosition = new Coordinate(origin.x, origin.y);
	this.dx = this.destination.x - origin.x;
	this.dy = this.destination.y - origin.y;
	this.isAlive = true;
	this.segmentX = this.dx / this.destination.distanceFrom(origin);
	this.segmentY = this.dy / this.destination.distanceFrom(origin);
	this.totalDistance = Math.abs(this.destination.distanceFrom(origin));
}

Missile.prototype.move = function() {
	this.currentPosition.y += this.segmentY;
	this.currentPosition.x += this.segmentX;
}

Missile.prototype.hasReachedTarget = function() {
	var distanceTravelled = Math.abs(this.currentPosition.distanceFrom(this.origin));
	return distanceTravelled > this.totalDistance;
}