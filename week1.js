(function() {
	function calculator() {
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

		return {
			add: add,
			subtract: subtract,
			multiply: multiply,
			divide: divide
		};
	}

	var calculator = calculator();
	var currentNumber = ''
	var numbers = [];
	var operators = [];
	
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
		currentNumber = '';
		operators = [];
		updateResultWindow('');
	}

	function equals() {
		numbers.push(parseInt(currentNumber));

		var total = numbers[0];
		for(var i = 1; i < numbers.length; i++) {
			var operator = operators.shift();
			total = calculator[operator](total, numbers[i]);
		}

		clearCalculations();
		return total;
	}
	
	function updateResultWindow(result) {
		document.getElementById("result").innerHTML = result;
	}

	function subscribeClickEvents(className, func) {
		var buttons = document.getElementsByClassName(className);
		for(var i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener('click', function(e) { func(e.target.id)});
		}
	}

	subscribeClickEvents("operator", appendOperator);
	subscribeClickEvents("number", function(id) { 
		appendNumber(id); 
		updateResultWindow(currentNumber);
	});

	document.getElementById("equals").addEventListener('click', function() { 
		updateResultWindow(equals());
	});

	document.getElementById("clear").addEventListener('click', function() { 
		clearCalculations();
	});

}());

