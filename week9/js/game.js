
var canvas = document.getElementById('canvas'); 
var context = canvas.getContext('2d');

drawRepeatingImage('images/ground.png', 0, 495, 800, 105);

drawImage('images/bunker.png', 80, 490);
drawImage('images/bunker.png', 320, 480);
drawImage('images/bunker.png', 600, 510);
drawImage('images/city.png', 200, 490);
drawImage('images/city.png', 450, 500);
drawImage('images/city.png', 700, 490);


function drawImage(src, x, y) {
	var img = new Image();
	img.src = src;
	img.onload = function() {
		context.drawImage(img, x, y);
	}
}

function drawRepeatingImage(src, x, y, width, height) {
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