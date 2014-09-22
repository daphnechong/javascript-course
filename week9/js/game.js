


function Game() {
 	this.bunkers = [];
 	this.cities = [];
 	this.defenceMissiles = [];
 	this.enemyMissiles = [];
 	this.explosions = [];
 	this.enemyMissileCount = 10;
}


Game.prototype.initialize = function() {
	this.bunkers.push(new Bunker(5, 80, 490));
	this.bunkers.push(new Bunker(5, 320, 480));
	this.bunkers.push(new Bunker(5, 600, 510));
	this.cities.push(new City(200, 490));
	this.cities.push(new City(450, 500));
	this.cities.push(new City(700, 490));

	this.defenceMissiles.push(new Missile(80, 490, 50, 80))
	this.step();
}

Game.prototype.step = function() {
	var self = this;
	var renderer = new Renderer(this);
	renderer.draw();
	// requestAnimationFrame(self.step);
}

var game = new Game();
game.initialize();

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