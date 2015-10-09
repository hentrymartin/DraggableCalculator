//Controller for the whole calcuator functionality
angular.module('gieom').controller('GieomCalculatorController', gieomCalculator);

gieomCalculator.$inject = ['$scope', 'toaster', 'localStorageService', '$timeout']; //Dependency injection

function gieomCalculator($scope, toaster, localStorageService, $timeout) {
	
	//This removes the active classes that added in all the keys
	var removeActiveClass = function() {
		$('.each-key').removeClass('active');;
	};

	//Clear previous value function
	var clearPreviousValue = function() {
		var currentValue = angular.copy($scope.inputNumber).toString();
		if (currentValue.length == 0) return;
		$scope.inputNumber = currentValue.substring(0, currentValue.length - 1);
	};

	//This is to calculate the total calculations that need to be
	//displayed in the header
	var calculateTotalCalculations = function() {
		var total = 0;
		angular.forEach($scope.history, function(item) {
			if (isNaN(item.result)) return;
			total = total + parseInt(item.result);
		});

		$scope.totalCalculations = total;
	};

	//This function deals with calculating history whenever '=' or enter key is pressed
	var calculateHistory = function(expression, result) {
		var temp = {
			expression : expression,
			result : angular.copy(result)
		}
		$scope.history.push(temp);
		localStorageService.set('gieom-history', $scope.history);
	};

	//Calulate the given expression
	var calculateExpression = function() {
		var expression = angular.copy($scope.inputNumber);
		try {
			$scope.inputNumber = eval(expression);
			if ($scope.isHistory) calculateHistory(expression, $scope.inputNumber);
			if (isFinite($scope.inputNumber)) {
				calculateTotalCalculations();
			} else {
				$scope.inputNumber = '';
				toaster.pop('error', 'give proper input values');
			}
		} catch(err) {
			toaster.pop('error', 'give proper input values');
		}
	};


	//This function is called whenever the values are entered[To calculate the arithmetic operations]
	$scope.enterValue = function(value, type, $event) {

		if (value == '+/-') return; 
		removeActiveClass();
		if ($event) $($event.target).closest('.each-key').addClass('active');

		//Clear function implementation
		if (value == 'C') {
			clearPreviousValue();
			return;
		}

		if (value != '=')  {
			$scope.inputNumber = $scope.inputNumber + value;
		} else {
			calculateExpression();
		}

	};

	//This binds the keys event for the respective key codes
	var bindKeyPressEvents = function() {

		var keyCodes =  [{
			keyCode : 48,
			value : 0,
			type : 'operand',
			isShift : false
		},{
			keyCode : 49,
			value : 1,
			type : 'operand',
			isShift : false
		},{
			keyCode : 50,
			value : 2,
			type : 'operand',
			isShift : false
		},{
			keyCode : 51,
			value : 3,
			type : 'operand',
			isShift : false
		},{
			keyCode : 52,
			value : 4,
			type : 'operand',
			isShift : false
		},{
			keyCode : 53,
			value : 5,
			type : 'operand',
			isShift : false
		},{
			keyCode : 53,
			value : '%',
			type : 'operator',
			isShift : true
		},{
			keyCode : 54,
			value : 6,
			type : 'operand',
			isShift : false
		},{
			keyCode : 55,
			value : 7,
			type : 'operand',
			isShift : false
		},{
			keyCode : 56,
			value : 8,
			type : 'operand',
			isShift : false
		},{
			keyCode : 56,
			value : '*',
			type : 'operator',
			isShift : true
		},{
			keyCode : 57,
			value : 9,
			type : 'operand',
			isShift : false
		},{
			keyCode : 106,
			value : '*',
			type : 'operator',
			isShift : false
		},{
			keyCode : 107,
			value : '+',
			type : 'operator',
			isShift : false
		},{
			keyCode : 109,
			value : '-',
			type : 'operator',
			isShift : false
		},{
			keyCode : 189,
			value : '-',
			type : 'operator',
			isShift : false
		},{
			keyCode : 111,
			value : '/',
			type : 'operator',
			isShift : false
		},{
			keyCode : 110,
			value : '.',
			type : 'separator',
			isShift : false
		},{
			keyCode : 190,
			value : '.',
			type : 'separator',
			isShift : false
		},{
			keyCode : 13,
			value : '=',
			type : 'operator',
			isShift : false
		},{
			keyCode : 46,
			value : 'C',
			type : 'clear',
			isShift : false
		},{
			keyCode : 187,
			value : '+',
			type : 'operator',
			isShift : true
		},{
			keyCode : 45,
			value : '-',
			type : 'operator',
			isShift : false
		},{
			keyCode : 187,
			value : '=',
			type : 'operator',
			isShift : false
		},{
			keyCode : 42,
			value : '*',
			type : 'operator',
			isShift : false
		},{
			keyCode : 47,
			value : '/',
			type : 'operator',
			isShift : false
		},{
			keyCode : 191,
			value : '/',
			type : 'operator',
			isShift : false
		},{
			keyCode : 96,
			value : 0,
			type : 'operand',
			isShift : false
		},{
			keyCode : 97,
			value : 1,
			type : 'operand',
			isShift : false
		},{
			keyCode : 98,
			value : 2,
			type : 'operand',
			isShift : false
		},{
			keyCode : 99,
			value : 3,
			type : 'operand',
			isShift : false
		},{
			keyCode : 100,
			value : 4,
			type : 'operand',
			isShift : false
		},{
			keyCode : 101,
			value : 5,
			type : 'operand',
			isShift : false
		},{
			keyCode : 102,
			value : 6,
			type : 'operand',
			isShift : false
		},{
			keyCode : 103,
			value : 7,
			type : 'operand',
			isShift : false
		},{
			keyCode : 104,
			value : 8,
			type : 'operand',
			isShift : false
		},{
			keyCode : 105,
			value : 9,
			type : 'operand',
			isShift : false
		}];

		//Checks whether the pressed is valid key for the application
		var isValidKey = function(event) {
			var found = undefined;
			for (var index = 0; index < keyCodes.length; index++) {
				var val = keyCodes[index];
				if (event.keyCode == val.keyCode && (val.isShift == event.shiftKey)) {
					found = val;
					break;
				}
			}
			return found;
		};

		//Binds keypress to the body
		$('body').keydown(function(event) {
			var isValid = isValidKey(event);
			if (isValid) {

				$scope.enterValue(isValid.value, isValid.type);
			}
			if (!$scope.$$phase) {
				$scope.$apply();
			}
		});
	};

	//This is called whenever the toggle switch in the header is changed
	$scope.onChangeState = function(value) {
		if (!value)  {
			toaster.pop('info', 'This action will not track the history');
			if (!$scope.$$phase) $scope.$apply();
		}
		$scope.isHistory = value;
	};

	//This loads the expression in the history so that the calculation can be done again
	$scope.loadFromHistory = function(history) {
		$scope.inputNumber = history.expression;
	};


	//Initialize the controller functionality
	$scope.init = function() {

		//Variable declarations
		$scope.values = [];
		$scope.inputNumber = '';
		$scope.history = [];
		$scope.totalCalculations = 0;
		$scope.isHistory = true;

		//Gets the history from the localstorage
		if (localStorageService.get('gieom-history')) $scope.history = localStorageService.get('gieom-history');

		calculateTotalCalculations(); // Calculate the total from the stored history
		bindKeyPressEvents();	//Binding key press events

		$timeout(function() {
			NProgress.done();
		}, 200);

	};

	$scope.init(); // Starts the controller

}