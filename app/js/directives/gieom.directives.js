/**
*	This file contains the list of directives used in the applications
*/

(function() {
	
	angular.module('gieom').directive('toolTip', toolTip)
	//This is the toggle switch directive written over bootstrap switch
	.directive('gieomSwitch', gieomSwitch)
	//This is the dragging directive written over Jquery UI draggable
	.directive('gieomDraggable', gieomDraggable);

	//This is the tooltip directive function
	function toolTip() {
		return {
			retrict : 'A',
			scope : {
				value : '='
			},
			link : function(scope, elem, attr) {
				//Initializes the directive
				scope.init = function() {
					$(elem).tooltip().attr('data-original-title', scope.value)
	          .tooltip('fixTitle');
				};

				scope.init();
			}
		}
	}

	//This is the gieomSwitch directive function
	function gieomSwitch() {
		return {
			retrict : 'A',
			scope : {
				value : '=',
				changeFunction : '&'
			},
			link : function(scope, elem, attr) {

				//This is the onSwitchChange event
				var stateChanger = function(event, state) {
					scope.changeFunction({value : state});
				};

				//Initializes the directive
				scope.init = function() {
					$(elem).bootstrapSwitch({size : 'small', onColor : 'info', state : scope.value, onSwitchChange : stateChanger });
				};

				scope.init(); //Starts the directive
			}
		}
	}

	//This is the gieomDraggable directive function
	function gieomDraggable() {
		return {
			restrict : 'A',
			link : function(scope, elem, attr) {

				scope.init = function() {
					$(elem).draggable();
				};

				scope.init();
			}
		};
	}
})();