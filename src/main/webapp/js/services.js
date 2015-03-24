'use strict';

SAVProject.factory('CodeGeneration', function() {
	return {
		generate : function() {
			var str = new Array(5).join().replace(/(.|$)/g, function() {
				return ((Math.random() * 36) | 0).toString(36);
			});
			return str;
		}

	};
});