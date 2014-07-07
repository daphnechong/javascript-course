(function() {
	function myMax(numbers) {
		var maximum = numbers[0];

		for (var i = 1; i < numbers.length; i++) {
			if (numbers[i] > maximum) {
				maximum = numbers[i];
			}
		}
		return maximum;
	}

	function vowel_count(input) {
		var count = 0;
		var vowels = ['a', 'e', 'i', 'o', 'u'];

		for (var i = 0; i < input.length; i++) {
			if (vowels.indexOf(input[i].toLowerCase()) > -1) count++; 
		}

		return count;
	}

	function reverse(input) {
		var reversed = '';

		for (var i = input.length - 1; i >= 0; i--) {
			reversed += input[i];
		}
		return reversed;
	}

	console.log(myMax([4,1,2,3,-5]));
	console.log(myMax([]));
	console.log(vowel_count("awio"));
	console.log(vowel_count(""));
	console.log(reverse("abc"));
	console.log(reverse("this is a horse"));
}());

