var images = ['image1.jpeg', 'image2.jpeg', 'image3.jpeg', 'image4.jpeg', 'image5.jpeg'];
var currentIndex = 0;

function slideImage(nextSlide) {
	var img = $('<img>').attr('src', images[currentIndex + nextSlide]);
	var imgDiv = $('<div>').append(img);
	$('#carousel').append(imgDiv);

	img.css({left:"-100px", position:"relative"});
	// setTimeout(function(){
		// img.effect('slide', 5000)
		img.animate({left:"0px"})
	// }, 100);
}

$(function() {

	slideImage(0);
	$('#rightArrow').click(function () { slideImage(1) });
});