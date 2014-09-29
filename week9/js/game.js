


function Game() {
 	this.bunkers = [];
 	this.cities = [];
 	this.defenceMissiles = [];
 	this.enemyMissiles = [];
 	this.explosions = [];
 	this.enemyMissileCount = 10;
 	this.renderer = new Renderer(this);
 	this.start = null;
}

Game.prototype.selectRandomTarget = function() {
	var targets = this.bunkers.concat(this.cities);
	var item = targets[Math.floor(Math.random()*targets.length)];
	return item.location;
}

Game.prototype.initialize = function() {
	this.bunkers.push(new Bunker(5, new Coordinate(80, 490)));
	this.bunkers.push(new Bunker(5, new Coordinate(320, 480)));
	this.bunkers.push(new Bunker(5, new Coordinate(600, 510)));
	this.cities.push(new City(new Coordinate(200, 490)));
	this.cities.push(new City(new Coordinate(450, 500)));
	this.cities.push(new City(new Coordinate(700, 490)));

	this.enemyMissiles.push(new Missile(new Coordinate(0, 0), this.selectRandomTarget()));
	this.enemyMissiles.push(new Missile(new Coordinate(0, 0), this.selectRandomTarget()));
	this.enemyMissiles.push(new Missile(new Coordinate(0, 0), this.selectRandomTarget()));
}

Game.prototype.animate = function() {
	var self = this;

	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;

	function step(timestamp) {
	  var progress;
	  if (self.start === null) self.start = timestamp;
	  progress = timestamp - self.start;

	  _.each(self.enemyMissiles.concat(self.defenceMissiles), function(item) {
	  	if (!item.hasReachedTarget()) {
		  	item.move();
		  }
	  });

	  self.renderer.draw();
	  // if (progress < 3000) {
	  requestAnimationFrame(step);
	  // }
	}

	requestAnimationFrame(step);
}

var game = new Game();
game.initialize();
game.animate();

// game.js
// initialize()  { 
	// create models
	// step();
// }


// step() {
// 	update models
// 	if (renderer.draw(this))
// 		requestAnimationFrame(step);
// }