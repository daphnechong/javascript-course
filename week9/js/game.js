
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
	return item;
}

Game.prototype.initialize = function() {
	var self = this;
	this.bunkers.push(new Bunker(5, new Coordinate(80, 490)));
	this.bunkers.push(new Bunker(5, new Coordinate(320, 480)));
	this.bunkers.push(new Bunker(5, new Coordinate(600, 510)));
	this.cities.push(new City(new Coordinate(200, 490)));
	this.cities.push(new City(new Coordinate(450, 500)));
	this.cities.push(new City(new Coordinate(700, 490)));

	Rx.Observable.interval(2000).subscribe(function() { 
		var x = Math.floor(Math.random() * 800);
		self.enemyMissiles.push(new Missile(new Coordinate(x, 0), self.selectRandomTarget()));
	});
}

Game.prototype.animate = function() {
	var self = this;

	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;

	function step(timestamp) {
	  var progress;
	  if (self.start === null) self.start = timestamp;
	  progress = timestamp - self.start;

	  self.moveAll(self.enemyMissiles, function(item) { 
	  	self.explosions.push(new Explosion(item.currentPosition)); 
	  	item.endTarget.isAlive = false;
	  })
	  self.moveAll(self.explosions);


	  self.updateAll(self.explosions);
	  self.updateAll(self.enemyMissiles);
	  self.updateAll(self.defenceMissiles);
	  self.updateAll(self.bunkers);
	  self.updateAll(self.cities);

	  self.renderer.draw();
	  requestAnimationFrame(step);
	}

	requestAnimationFrame(step);
}

Game.prototype.moveAll = function moveAll(collection, additionalStep) {
 	for (var i = 0; i < collection.length; i++) {
		var item = collection[i];

		if (!item.hasReachedTarget()) {
	  	item.move();
	  } 
	  else {
	  	item.isAlive = false;
	  	if (additionalStep) {
	  		additionalStep(item);
	  	}
  	}
	}
}

Game.prototype.updateAll = function updateAll(collection) {
	 for (var i = 0; i < collection.length; i++) {
  	var item = collection[i];

  	if (!item.isAlive) {
	 	 	var index = collection.indexOf(item);
  		collection.splice(index, 1);
	  	i--;
  	}
  }
}

var game = new Game();
game.initialize();
game.animate();
