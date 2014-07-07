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
	}

	function appendOperator(o) {
		operators.push(o);
		numbers.push(parseInt(currentNumber));
		currentNumber = '';
	}

	function equals() {
		numbers.push(parseInt(currentNumber));

		var total = numbers[0];
		for(var i = 1; i < numbers.length; i++) {
			var operator = operators.shift();
			total = calculator[operator](total, numbers[i]);
		}
		return total;
	}

	appendNumber(5);
	appendNumber(5);
	appendOperator('add');
	appendNumber(4)
	appendNumber(5)
	appendOperator('add');
	appendNumber(1);
	appendOperator('subtract');
	appendNumber(2);
	appendOperator('multiply');
	appendNumber(3);
	appendNumber(1);
	appendOperator('divide');
	appendNumber(2);
	appendNumber(5);
	var total = equals();
	console.log(total)
//	document.getElementById("add").addEventListener('click', add);
}());

