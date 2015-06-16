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
			scope.typeObject = new typeFactory.types[scope.type]();

			scope.$watch('newChildType', function(newChildType) {
        		scope.newChildTypeObject = new typeFactory.types[scope.newChildType]();
    		}, true);

    		scope.deleteItem = function(key) {
    			if(confirm('Delete '+key+' and his content ?')) {
	    			if(scope.typeObject.needKey) {
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

    			if(scope.typeObject.needKey) {
    				if(scope.newChildKey !== undefined && scope.newChildKey.trim() !== "") {
    					scope.newChildKey = scope.newChildKey.trim();
    					if(scope.newChildTypeObject.needValue) {
    						scope.data[scope.newChildKey] = scope.newChildValue;
    					} else {
    						scope.data[scope.newChildKey] = scope.newChildTypeObject.defaultValue;
    					}
    				} else {
    					throw "You need to specifie a key !";
    				}
    			} else {
    				if(scope.newChildTypeObject.needValue) {
    					scope.data.push(scope.newChildValue);
    				} else {
    					scope.data.push(scope.newChildTypeObject.defaultValue);
    				}
    			}
    		};
			
			var getAddTemplate = function() {

				var addTemplate = '<button ng-show="!showAddForm" ng-click="showAddForm = true">Add</button>';
				addTemplate += '<div ng-show="showAddForm">';
				addTemplate += '<input ng-model="newChildKey" ng-show="typeObject.needKey" name="key" type="text" value=""/>';
				addTemplate += '<select ng-model="newChildType" ng-options="option for option in allowedTypes" ng-init="newChildType=\''+scope.allowedTypes[0]+'\'"></select>';
				addTemplate += '<input ng-model="newChildValue" ng-show="newChildTypeObject.needValue" name="value" type="text" value=""/>';
				addTemplate += '<button ng-click="addItem()">Add</button>';
				addTemplate += '<button ng-click="showAddForm = false">Cancel</button>';
				addTemplate += '</div>';

				return addTemplate;
			};

			var parsingData = function(data) {
				for(key in data) {
					var type = new typeFactory.types[getRealType(data[key])]();
					template += type.getHtml(key, data[key]);
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