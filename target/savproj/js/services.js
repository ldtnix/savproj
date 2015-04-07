'use strict';

var savServices = angular.module('savServices',[]);

savServices.factory('CodeGeneration', function() {
	return function() {
			var str = new Array(5).join().replace(/(.|$)/g, function() {
				return ((Math.random() * 36) | 0).toString(36);
			});
			return str;
		};
});