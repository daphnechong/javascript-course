


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


Game.prototype.initialize = function() {
	this.bunkers.push(new Bunker(5, 80, 490));
	this.bunkers.push(new Bunker(5, 320, 480));
	this.bunkers.push(new Bunker(5, 600, 510));
	this.cities.push(new City(200, 490));
	this.cities.push(new City(450, 500));
	this.cities.push(new City(700, 490));

	this.defenceMissiles.push(new Missile(new Coordinate(100, 100), new Coordinate(200, 200)));
	this.defenceMissiles.push(new Missile(new Coordinate(100, 100), new Coordinate(300, 300)));
	this.defenceMissiles.push(new Missile(new Coordinate(100, 100), new Coordinate(500, 500)));
}

Game.prototype.animate = function() {
	var self = this;

	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;

	function step(timestamp) {
	  var progress;
	  if (self.start === null) self.start = timestamp;
	  progress = timestamp - self.start;
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