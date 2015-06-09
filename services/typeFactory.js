jsonEditor.service('typeFactory', 
	[
		'string',
		'boolean',
		'object',
		'array',
		'step', 
		'path', 
		function(string, boolean, object, array, step, path) {
			this.types = {
				'string': string,
				'boolean': boolean,
				'object': object,
				'array': array,
				'step': step, 
				'path': path
			};

			this.getArray = [
				'string',
				'boolean',
				'object',
				'array',
				'step', 
				'path'
			];
		}
	]
);