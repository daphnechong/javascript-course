function Missile(x, y, dx, dy, isMovingUpward) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.isMovingUpward = isMovingUpward;
}

Missile.prototype.move = function() {
	var newX = this.isMovingUpward ? this.x - this.dx : this.x + this.dx;
	var newY = this.isMovingUpward ? this.y - this.dy : this.y + this.dy;

	return {
		x: newX,
		y: newY
	}
}
