jsonEditor.controller('editorController', ['$scope', function($scope) {
	// example JSON
    $scope.jsonData = {
        "steps": {
        	"step1": {
        		"string1" : "toto"
        	},
        	"step2": {
        		"bool1" : true
        	}
        },
        "paths": [
        	{
        		"string2" : "titi"
        	}
        ]
    };

    $scope.$watch('jsonData', function(jsonData) {
        $scope.jsonString = JSON.stringify(jsonData);
    }, true);
    $scope.$watch('jsonString', function(jsonString) {
        try {
            $scope.jsonData = JSON.parse(jsonString);
            $scope.wellFormed = true;
        } catch(e) {
            $scope.wellFormed = false;
        }
    }, true);
}]);