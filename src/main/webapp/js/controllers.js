'use strict';

var savControllers = angular.module('savControllers', ['savServices']);

// HomeController
savControllers.controller('HomeCtrl', ['$scope','$rootScope','CodeGeneration','$state',function($scope,$rootScope,CodeGeneration,$state) {
	// Create Secret Code
	// This code will be used to access vote or generate Vote URL
	$rootScope.secretCode = CodeGeneration();
	 console.log($rootScope.secretCode);
	 console.log("home");
	$scope.$state = $state;
    $scope.taoVote = function() {
    	$state.transitionTo('step1');
    };
}]);

// CreateVoteController
savControllers.controller('CreateVoteCtrl', ['$scope','$rootScope','ActionURL','$http','$state', function($scope,$rootScope,ActionURL,$http,$state) {
	var returnMsg = "";
	$rootScope.vote = {};
	$scope.options = [];
	$scope.form = {};
	$scope.title = "";
	var number = 0;
	console.log("create");
	// Post the request to back-end API
	/*$http.post(ActionURL, { secret : $rootScope.secretCode }).
	  success(function(data) {
		  returnMsg = "Vót được tạo thành công.";
	  }).
	  error(function(data, status, headers, config) {
		  returnMsg = "Đã có lỗi khi tạo Vót.";
	  });*/
	
	$scope.addMoreOption = function() {
		number += 1;
		$scope.options.push(
				{'id' : number ,
				 'value' : ''}
		);
		console.log(number);
	}
	
	$scope.goNext = function() {
		$rootScope.vote.options = $scope.options;
		$rootScope.vote.title = $scope.title;
		console.log($scope.options);
		$state.transitionTo('step2');
	}
	
	
	
	
}]);

savControllers.controller('ConfigVoteCtrl', ['$scope', 
	function($scope) {
	
	}]);

savControllers.controller('CompleteVoteCtrl', ['$scope', 
	function($scope) {
	
	}]);

savControllers.controller('ShowVoteCtrl', ['$scope', '$http',
	function($scope, $http) {

		// TODO: load from back-end
		$http.get('/dump/vote.json').success(function(data){
			$scope.vote = data;

			var opts = [];
			for (var i = 0; i < $scope.vote.options.length; i++) {
				opts.push({"opt":false});
			};

			$scope.vote.polls.push({"name": "", "result":opts, "voted": false});
		});

		$scope.submitVote = function() {
			for (var i = 0; i < $scope.vote.polls.length; i++) {
				$scope.vote.polls[i].voted = true
			};

			// TODO: Save into DB
		}
	}]);
