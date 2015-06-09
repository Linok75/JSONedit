jsonEditor.directive('jsontree', ['$compile', 'typeFactory', function($compile, typeFactory) {
	return {
		restrict: 'A',
		scope: {
			data: '=',
			type: '@'
		},
		link: function(scope, element, attributes) {
			var template = '';
			scope.showAddForm = false;
			scope.newChildType = 'string';
			scope.allowedTypes = typeFactory.getArray;
			scope.needKey = typeFactory.types[scope.type].needKey;

			scope.$watch('newChildType', function(newChildType) {
        		scope.needValue = typeFactory.types[scope.newChildType].needValue;
    		}, true);

    		scope.deleteItem = function(key) {
    			if(confirm('Delete '+key+' and his content ?')) {
	    			if(scope.needKey) {
	    				delete scope.data[key];
	    			} else {
	    				scope.data.splice(key,1);
	    			}
    			}
    		};

    		scope.addItem = function() {
    			if(scope.newChildValue !== undefined) {
	   				scope.newChildValue = scope.newChildValue.trim();
    			} else {
    				scope.newChildValue = '';
    			}

    			if(scope.needKey) {
    				if(scope.newChildKey !== undefined && scope.newChildKey !== "") {
    					scope.newChildKey = scope.newChildKey.trim();
    					if(scope.needValue) {
    						scope.data[scope.newChildKey] = scope.newChildValue;
    					} else {
    						scope.data[scope.newChildKey] = typeFactory.types[scope.newChildType].defaultValue;
    					}
    				} else {
    					throw "You need to specifie a key !";
    				}
    			} else {
    				if(scope.needValue) {
    					scope.data.push(scope.newChildValue);
    				} else {
    					scope.data.push(typeFactory.types[scope.newChildType].defaultValue);
    				}
    			}
    		};
			
			var getAddTemplate = function() {

				var addTemplate = '<button ng-show="!showAddForm" ng-click="showAddForm = true">Add</button>';
				addTemplate += '<div ng-show="showAddForm">';
				addTemplate += '<input ng-model="newChildKey" ng-show="needKey" name="key" type="text" value=""/>';
				addTemplate += '<select ng-model="newChildType" ng-options="option for option in allowedTypes" ng-init="newChildType=\''+scope.allowedTypes[0]+'\'"></select>';
				addTemplate += '<input ng-model="newChildValue" ng-show="needValue" name="value" type="text" value=""/>';
				addTemplate += '<button ng-click="addItem()">Add</button>';
				addTemplate += '<button ng-click="showAddForm = false">Cancel</button>';
				addTemplate += '</div>';

				return addTemplate;
			};

			var parsingData = function(data) {
				for(key in data) {
					var type = getRealType(data[key]);
					template += typeFactory.types[type].getHtml(key, data[key]);
				}
				template += getAddTemplate();
			};

			var getRealType = function(obj) {
				return Object.prototype.toString.call(obj).match(/[A-Z][a-z]+/g)[0].toLowerCase();
			};

			var update = function(data) {
				parsingData(data);

				var tree = angular.element(template);
				$compile(tree)(scope);
				element.empty();
				element.append(tree);
				template = '';
			};

			scope.$watch('data', function(data) {
        		update(data);
    		}, true);
		}
	};
}]);