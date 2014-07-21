(function() {
	function calculator() {
		var currentNumber = ''
		var numbers = [];
		var operators = [];

		function add(a, b) {
			return a + b;
		}

		function subtract(a, b) {
			return a - b;
		}

		function multiply(a, b) {
			return a * b;
		}

		function divide(a, b) {
			return a / b;
		}

		function appendNumber(n) {
			currentNumber += n;
			console.log(currentNumber);
		}

		function appendOperator(o) {
			console.log(o);
			operators.push(o);
			numbers.push(parseInt(currentNumber));
			currentNumber = '';
		}

		function clearCalculations() {
			numbers = [];
			operators = [];
			currentNumber = '';
		}

		function equals() {
			numbers.push(parseInt(currentNumber));

			var total = numbers[0];
			for(var i = 1; i < numbers.length; i++) {
				var operator = operators.shift();

				// not sure how to just execute operator(total, numbers[i]) without having to qualify "this"? I get a "string is not a function" error
				// i also had to expose add/subtract/divide/multiply to get this line to work. Is there a way you can call "private" functions
				total = this[operator](total, numbers[i]); 
			}

			clearCalculations();
			return total;
		}

		return {
			appendNumber: appendNumber,
			appendOperator: appendOperator,
			clear: clearCalculations,
			equals: equals,
			currentValue: function() { return currentNumber; },
			add: add,
			subtract: subtract,
			divide: divide,
			multiply: multiply
		};
	}

	var calculator = calculator();

	
	function updateResultWindow(result) {
		document.getElementById("result").innerHTML = result;
	}

	function subscribeClickEvents(className, func) {
		var buttons = document.getElementsByClassName(className);
		for(var i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener('click', function(e) { func(e.target.id)});
		}
	}

	subscribeClickEvents("operator", calculator.appendOperator);

	subscribeClickEvents("number", function(id) { 
		calculator.appendNumber(id);
		updateResultWindow(calculator.currentValue());
	});

	document.getElementById("equals").addEventListener('click', function() { 
		updateResultWindow(calculator.equals());
	});

	document.getElementById("clear").addEventListener('click', function() { 
		calculator.clear();
		updateResultWindow('');
	});

}());

