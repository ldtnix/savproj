'use strict';

// HomeController
SAVProj.controller('HomeCtrl', ['$scope',function($scope) {
    
    
}]);


// CreateVoteController
angular.module('SAVProject.Create', ['ngRoute','CodeGeneration'])

.controller('CreateVoteCtrl', ['$scope','ActionURL','$http','CodeGeneration', function($scope,ActionURL,$http,CodeGeneration) {
    
	// Create Secret Code
	// This code will be used to access vote or generate Vote URL
	var secretCode = CodeGeneration.generate();
	var returnMsg = "";
	// Post the request to back-end API
	$http.post(ActionURL, { secret : secretCode }).
	  success(function(data) {
		  returnMsg = "Vót được tạo thành công.";
	  }).
	  error(function(data, status, headers, config) {
		  returnMsg = "Đã có lỗi khi tạo Vót.";
	  });
    
}]);

