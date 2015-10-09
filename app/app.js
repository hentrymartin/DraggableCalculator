//Start of Application
//Application context
(function() {
	angular.module('gieom', ['ui.router', 'toaster', 'LocalStorageModule'])
//Configuration for the whole application goes here
	.config(configuration);

	configuration.$inject = ['localStorageServiceProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider']; // Dependency injection

	function configuration(localStorageServiceProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
		localStorageServiceProvider.setPrefix('gieom').setStorageType('sessionStorage');

		$stateProvider
			.state('calculator', {
				url : '/calculator',
				templateUrl : 'app/partials/gieomCalculator.html',
				controller : 'GieomCalculatorController'
			});

		$urlRouterProvider.otherwise('/calculator');
	}
})();