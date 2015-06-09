/**
 * Primitives types
 */
jsonEditor.factory('string', [function() {
	var type = 'string';
	var defaultValue = '';

	var getHtml = function(key, data) {
		var html = '<li type="string">'+key+' : '+data+'<button ng-click="deleteItem(\''+key+'\')">Delete</button></li>';
		return html;
	}

	var needKey = true;
	var needValue = true;

	return {
		type,
		getHtml,
		needKey,
		needValue,
		defaultValue
	};
}]);

jsonEditor.factory('boolean', [function() {
	var type = 'boolean';
	var defaultValue = true;

	var getHtml = function(key, data) {
		var html = '<li type="boolean">'+key+' : '+data+'<button ng-click="deleteItem(\''+key+'\')">Delete</button></li>';
		return html;
	}

	var needKey = true;
	var needValue = true;

	return {
		type,
		getHtml,
		needKey,
		needValue,
		defaultValue
	};
}]);

jsonEditor.factory('object', [function() {
	var type = 'object';
	var defaultValue = {};

	var getHtml = function(key, data) {
		var html = '<li>'+key+' : <button ng-click="deleteItem(\''+key+'\')">Delete</button><ul jsontree="" data="data[\''+key+'\']" type="'+type+'"></ul></li>';
		return html;
	}

	var needKey = true;
	var needValue = false;

	return {
		type,
		getHtml,
		needKey,
		needValue,
		defaultValue
	};
}]);

jsonEditor.factory('array', [function() {
	var type = 'array';
	var defaultValue = [];

	var getHtml = function(key, data) {
		var html = '<li>'+key+' : <button ng-click="deleteItem(\''+key+'\')">Delete</button><ul jsontree="" data="data[\''+key+'\']" type="'+type+'"></ul></li>';
		return html;
	}

	var needKey = false;
	var needValue = false;

	return {
		type,
		getHtml,
		needKey,
		needValue,
		defaultValue
	};
}]);

/**
 * Personnals types
 */
jsonEditor.factory('step', ['object', function(object) {
	var type = 'step';
	var defaultValue = object.defaultValue;
	var getHtml = object.getHtml;
	var needKey = object.needKey;
	var needValue = object.needValue;


	return {
		type,
		getHtml,
		needKey,
		needValue,
		defaultValue
	};
}]);

jsonEditor.factory('path', ['object', function(object) {
	var type = 'path';
	var defaultValue = object.defaultValue;
	var getHtml = object.getHtml;
	var needKey = object.needKey;
	var needValue = object.needValue;

	return {
		type,
		getHtml,
		needKey,
		needValue,
		defaultValue
	};
}])
