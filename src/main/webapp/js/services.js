'use strict';

var savServices = angular.module('savServices',['ngCookies']);

savServices.factory('CodeGeneration', function() {
	return function() {
			var str = new Array(5).join().replace(/(.|$)/g, function() {
				return ((Math.random() * 36) | 0).toString(36);
			});
			return str;
		};
});

savServices.factory('CookieTackle',['$cookieStore', function($cookieStore) {
		var cookieCooker = {};
		cookieCooker.store = function(secretCode, storee) {
			$cookieStore.put(secretCode,storee);
		};
		cookieCooker.retriever = function(secretCode) {
			return $cookieStore.get(secretCode);
		};
		
		cookieCooker.isExist = function(secretCode) {
			var storee = $cookieStore.get(secretCode);
			if(storee == null || storee == undefined) {
				return false;
			}
			else { return true; }
		};
	return cookieCooker;
}]);