

var canvas = document.getElementById('canvas'); 
var context = canvas.getContext('2d');

function Renderer(game) {
	this.game = game;
}

function loadImage(filename) {
	var img = new Image();
	img.src = filename;
	return img;
}

var images = {
	ground: loadImage('images/ground.png'),
	bunker: loadImage('images/bunker.png'),
	city: loadImage('images/city.png')
}

Renderer.prototype.draw = function() {
	var self = this;
	context.clearRect(0,0, canvas.width, canvas.height);

	this.drawRepeatingImage(images['ground'], 0, 495, 800, 105);

	_.each(this.game.cities, function(item) {
		self.drawImage(images['city'], item.location);
	});

	_.each(this.game.bunkers, function(item) {
		self.drawImage(images['bunker'], item.location);
	});

	_.each(this.game.explosions, function(item) {
		self.drawExplosion(item);
	});

	_.each(this.game.defenceMissiles.concat(this.game.enemyMissiles), function(item) {
		self.drawMissile(item.location);
		self.drawLine(item.origin, item.location);
	});
}

Renderer.prototype.drawLine = function drawLine(origin, destination) {
	context.save();
	context.beginPath();
  context.moveTo(origin.x, origin.y);
  context.lineTo(destination.x, destination.y);
  context.stroke();
  context.restore();
}

Renderer.prototype.drawRepeatingImage = function drawRepeatingImage(img, x, y, width, height) {
	context.save()
	var pattern = context.createPattern(img, 'repeat-x');
	context.fillStyle = pattern;
	context.translate(x, y);
	context.fillRect(0, 0, width, height);
	context.restore();
}

Renderer.prototype.drawImage = function drawImage(img, coordinate, movement) {
	context.drawImage(img, coordinate.x, coordinate.y);
	if (movement) {
		movement(context);
	}
};

Renderer.prototype.drawMissile = function drawMissile(coordinate) {
	context.save();
	context.beginPath();
  context.arc(coordinate.x, coordinate.y, 3, 0, 2 * Math.PI, false);
  context.fillStyle = 'red';
  context.fill();
  context.restore();
}

Renderer.prototype.drawExplosion = function drawExplosion(explosion) {
	context.save();
	context.beginPath();
  context.arc(explosion.location.x, explosion.location.y, explosion.radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'red';
  context.fill();
  context.restore();
}