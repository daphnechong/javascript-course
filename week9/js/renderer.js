

var canvas = document.getElementById('canvas'); 
var context = canvas.getContext('2d');

function Renderer(game) {
	this.game = game;
}

var images = {
	ground: 'images/ground.png',
	bunker: 'images/bunker.png',
	city: 'images/city.png',
	missile: 'images/missile.png'
}

Renderer.prototype.draw = function() {
	var self = this;
	this.drawRepeatingImage(images['ground'], 0, 495, 800, 105);

	_.each(this.game.cities, function(item) {
		self.drawImage(images['city'], item.x, item.y);
	});

	_.each(this.game.bunkers, function(item) {
		self.drawImage(images['bunker'], item.x, item.y);
	});

	_.each(this.game.defenceMissiles, function(item) {
		self.drawImage(images['missile'], item.x, item.y, function(context) {
			context.save();
			context.beginPath();
      context.moveTo(item.x, item.y);
      context.lineTo(item.dx, item.dy);
      context.stroke();
      context.restore();
		})
	})
}

Renderer.prototype.drawRepeatingImage = function drawRepeatingImage(src, x, y, width, height) {
	var img = new Image();
	img.src = src;
	img.onload = function() {
		context.save()
		var pattern = context.createPattern(img, 'repeat-x');
		context.fillStyle = pattern;
		context.translate(x, y);
		context.fillRect(0, 0, width, height);
		context.restore();
	}
}

Renderer.prototype.drawImage = function drawImage(src, x, y, movement) {
	var img = new Image();
	img.src = src;
	img.onload = function() {
		context.drawImage(img, x, y);
	}
	if (movement) {
		movement(context);
	}
};