function Explosion(coordinate) {
	this.location = coordinate;
	this.radius = 10;
	this.isAlive = true;
}

Explosion.prototype.move = function move(){
	this.radius++;
}

Explosion.prototype.hasReachedTarget = function hasReachedTarget() {
	return this.radius > 30;
}