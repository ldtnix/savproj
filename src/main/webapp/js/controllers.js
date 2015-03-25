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
		$scope.voteDone = false;

		// TODO: load from back-end
		$http.get('/dump/vote.json').success(function(data){
			$scope.vote = data;
			var polls = $scope.vote.polls;

			initVoteSum(polls);
			addNewVote2Polls();
		});

		function addNewVote2Polls() {
			var opts = [];
			for (var i = 0; i < $scope.vote.options.length; i++) {
				opts.push({"opt":false});
			};

			$scope.vote.polls.push({"name": "", "result":opts, "voted": false});
		}

		function initVoteSum(polls) {
			$scope.voteSum = {};
			for (var i = 0; i < polls.length; i++) {
				for (var y = 0; y < polls[i].result.length; y++) {
					if (!$scope.voteSum.hasOwnProperty("opt_" + y)) {
						$scope.voteSum["opt_" + y] = 0;
					}

					$scope.voteSum["opt_" + y] = (polls[i].result[y].opt === true) ? ($scope.voteSum["opt_" + y] + 1) : $scope.voteSum["opt_" + y];
				}
			};
		}

		$scope.countVote = function(idx, isVote) {
			$scope.voteSum["opt_" + idx] = (isVote === true) ? ($scope.voteSum["opt_" + idx] + 1) : $scope.voteSum["opt_" + idx] - 1;
		}		

		$scope.submitVote = function() {
			for (var i = 0; i < $scope.vote.polls.length; i++) {
				$scope.vote.polls[i].voted = true
			};

			// TODO: Save into DB

			$scope.voteDone = true;
		}
	}]);
