'use strict';

var savControllers = angular.module('savControllers', []);

// HomeController
savControllers.controller('HomeCtrl', ['$scope', 'CodeGeneration', '$state',
	function($scope,CodeGeneration,$state) {
		// Create Secret Code
		// This code will be used to access vote or generate Vote URL
		$scope.secretCode = CodeGeneration.generate();
		$scope.$state = $state;
	    $scope.taoVote = function() {
	    	$scope.$state.transitionTo('step1');
	    };
	}]);

// CreateVoteController
savControllers.controller('CreateVoteCtrl', ['$scope', 'ActionURL', '$http', 
	function($scope,ActionURL,$http,CodeGeneration) {
    
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

savControllers.controller('ConfigVoteCtrl', ['$scope', 
	function($scope) {
	
	}]);

savControllers.controller('CompleteVoteCtrl', ['$scope', 
	function($scope) {
	
	}]);

savControllers.controller('ShowVoteCtrl', ['$scope', 
	function($scope) {
	
	}]);
