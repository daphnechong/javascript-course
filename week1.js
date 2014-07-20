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

	function equals() {
		numbers.push(parseInt(currentNumber));
		console.log(numbers)
		var total = numbers[0];
		for(var i = 1; i < numbers.length; i++) {
			var operator = operators.shift();
			total = calculator[operator](total, numbers[i]);
		}

		numbers = [];
		console.log(total);
		return total;
	}

	// appendNumber(5);
	// appendOperator('add');
	// appendNumber(4)
	// appendNumber(5)
	// appendOperator('add');
	// appendNumber(1);
	// appendOperator('subtract');
	// appendNumber(2);
	// appendOperator('multiply');
	// appendNumber(3);
	// appendNumber(1);
	// appendOperator('divide');
	// appendNumber(2);
	// appendNumber(5);
	// var total = equals();
	// console.log(total)

	function subscribeClickEvents(className, func) {
		var buttons = document.getElementsByClassName(className);
		for(var i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener('click', function(e) { func(e.target.id)});
		}
	}

	subscribeClickEvents("operator", appendOperator);
	subscribeClickEvents("number", appendNumber);
	// var opButtons = document.getElementsByClassName("operator");
	// for(var i = 0; i < opButtons.length; i++) {
	// 	console.log('subscribing ' + opButtons[i])
	// 	opButtons[i].addEventListener('click', function(e) { appendOperator(e.target.id)});
	// }

	var numButtons = document.getElementsByClassName("number");
	for(var i = 0; i < numButtons.length; i++) {
		numButtons[i].addEventListener('click', function(e) { appendNumber(e.target.id)});
	}
	// document.getElementById("add").addEventListener('click', function(e) { console.log(e); appendOperator("add") });
	// document.getElementById("divide").addEventListener('click', function() { appendOperator("divide")});
	// document.getElementById("multiply").addEventListener('click', function() { appendOperator("multiply")});
	// document.getElementById("subtract").addEventListener('click', function() { appendOperator("subtract") });

	// document.getElementById("1").addEventListener('click', function() { appendNumber("1") });
	// document.getElementById("2").addEventListener('click', function() { appendNumber("2") });
	// document.getElementById("3").addEventListener('click', function() { appendNumber("3") });
	// document.getElementById("4").addEventListener('click', function() { appendNumber("4") });
	// document.getElementById("5").addEventListener('click', function() { appendNumber("5") });
	// document.getElementById("6").addEventListener('click', function() { appendNumber("6") });
	// document.getElementById("7").addEventListener('click', function() { appendNumber("7") });
	// document.getElementById("8").addEventListener('click', function() { appendNumber("8") });
	// document.getElementById("9").addEventListener('click', function() { appendNumber("9") });
	// document.getElementById("0").addEventListener('click', function() { appendNumber("0") });
	document.getElementById("equals").addEventListener('click', function() { 
		document.getElementById("result").value = equals();
	});

}());

