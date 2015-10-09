//This factory is for interpretting the http calls 
//so that Nprogress bar is added for each service call globally
//throughout the application

(function() {

	angular.module('gieom').factory('GieomInterceptor', gieomInterceptor);

	function gieomInterceptor() {
		    var requestInterceptor = {
	        request: function(config) {
	        	NProgress.start();
	        },
	        response: function() {
	        	NProgress.done();
	        }
	    };

	    return requestInterceptor;
	}
})();