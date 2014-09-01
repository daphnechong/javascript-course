
var canvas = document.getElementById('canvas'); 
var context = canvas.getContext('2d');


var img = new Image();
img.src = 'images/ground.png';
img.onload = function() {
	// context.drawImage(img, , 0);	
	context.save()
	var groundPattern = context.createPattern(img, 'repeat-x');
	context.fillStyle = groundPattern;
	context.translate(0, 495);
	context.fillRect(0, 0, 800, 105);

	context.restore();
}

