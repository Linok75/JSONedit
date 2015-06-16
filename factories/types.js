/**
 * Primitives types
 */
jsonEditor.factory('string', [function() {
	function String() {
		this.type = 'string';
		this.defaultValue = '';
		this.needKey = true;
		this.needValue = true;
	}

	String.prototype.getHtml = function(key, data) {
		var html = '<li type="'+this.type+'">'+key+' : '+data+'<button ng-click="deleteItem(\''+key+'\')">Delete</button></li>';
		return html;
	};

	return String;
}]);

jsonEditor.factory('boolean', [function() {
	function Boolean() {
		this.type = 'boolean';
		this.defaultValue = true;
		this.needKey = true;
		this.needValue = true;
	}

	Boolean.prototype.getHtml = function(key, data) {
		var html = '<li type="'+this.type+'">'+key+' : '+data+'<button ng-click="deleteItem(\''+key+'\')">Delete</button></li>';
		return html;
	};

	return Boolean;
}]);

jsonEditor.factory('object', [function() {
	function Object() {
		this.type = 'object';
		this.defaultValue = {};
		this.needKey = true;
		this.needValue = false;
	}

	Object.prototype.getHtml = function(key, data) {
		var html = '<li>'+key+' : <button ng-click="deleteItem(\''+key+'\')">Delete</button><ul jsontree="" data="data[\''+key+'\']" type="'+this.type+'"></ul></li>';
		return html;
	};

	return Object;
}]);

jsonEditor.factory('array', [function() {
	function Array() {
		this.type = 'array';
		this.defaultValue = [];
		this.needKey = false;
		this.needValue = false;
	}

	Array.prototype.getHtml = function(key, data) {
		var html = '<li>'+key+' : <button ng-click="deleteItem(\''+key+'\')">Delete</button><ul jsontree="" data="data[\''+key+'\']" type="'+this.type+'"></ul></li>';
		return html;
	};

	return Array;
}]);

/**
 * Personnals types
 */
jsonEditor.factory('step', ['object', function(object) {
	function Step() {
		this.type = 'step';
	}
	Step.prototype = new object();

	return Step;
}]);

jsonEditor.factory('path', ['object', function(object) {
	function Path() {
		this.type = 'path';
	}
	Path.prototype = new object();

	return Path;
}])
