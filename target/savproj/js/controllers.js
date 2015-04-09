'use strict';

var savControllers = angular.module('savControllers', [ 'savServices' ]);


// HomeController
savControllers.controller('HomeCtrl', [ '$scope', '$rootScope',
		'CodeGeneration', '$state',
		function($scope, $rootScope, CodeGeneration, $state) {
			// Create Secret Code
			// This code will be used to access vote or generate Vote URL
			$rootScope.secretCode = CodeGeneration();
			$scope.$state = $state;
			$scope.taoVote = function() {
				$state.transitionTo('step1');
			};


			$scope.carName = "";
		} ]);

// CreateVoteController
savControllers.controller('CreateVoteCtrl', [ '$scope', '$rootScope',
		'ActionURL', '$http', '$state',
		function($scope, $rootScope, ActionURL, $http, $state) {
			var returnMsg = "";
			$rootScope.vote = {};
			$scope.options = [];
			$scope.form = {};
			$scope.title = "";
			var number = 0;
			// Post the request to back-end API
			/*
			 * $http.post(ActionURL, { secret : $rootScope.secretCode }).
			 * success(function(data) { returnMsg = "Vót được tạo thành công.";
			 * }). error(function(data, status, headers, config) { returnMsg =
			 * "Đã có lỗi khi tạo Vót."; });
			 */

			$scope.addMoreOption = function() {
				number += 1;
				$scope.options.push({
					'id' : number,
					'value' : ''
				});
			}

			$scope.goNext = function() {
				$rootScope.vote.options = $scope.options;
				$rootScope.vote.title = $scope.title;
				console.log($rootScope.vote);
				$state.transitionTo('step2');
			}

		} ]);

savControllers.controller('ConfigVoteCtrl', [ '$scope','$rootScope','$state', function($scope,$rootScope,$state) {
	$scope.myForm = {};
	$scope.closeDuration = 0;
	$scope.closeTick = false;
	console.log($rootScope.vote);
	$scope.emails = [];
	$scope.period = $scope.type = $scope.publicity = "";
	$rootScope.vote.config = {};

	$scope.$watch(function(scope){return scope.emails}, function(newValue, oldValue) {
		console.log("go to watch");
		if (newValue !== oldValue) {
			console.log("waching emails");

			var ctrl = angular.element(document.querySelector("#emails_ta")).controller("ngModel");

			// Invoke formatter
			var formatters = ctrl.$formatters,
		          idx = formatters.length;
		    
		    while(idx--) {
		        newValue = formatters[idx](newValue);
		    }

		    // Update viewValue and invoke render
		    if (ctrl.$viewValue !== newValue) {
		    	ctrl.$viewValue = newValue;
		        ctrl.$render();
		    }
		}
	}, true);

	$scope.addEmail = function(email) {
		/*
		var emailList = $scope.emails;
		emailList.push(email);
		$scope.emails = angular.copy(emailList);
		*/

		$scope.emails.push(email);
	}

	$scope.goNext = function() {
		$rootScope.vote.config.publicity = $scope.publicity;
		$rootScope.vote.config.type = $scope.type;
		$rootScope.vote.config.closeDuration = $scope.closeDuration;
		$rootScope.vote.config.period = $scope.period;
		$rootScope.vote.config.emails = $scope.emails;
		console.log($rootScope.vote);
		$state.transitionTo('step3');
	}



} ]);

savControllers.controller('CompleteVoteCtrl', [ '$scope','$rootScope', '$location', function($scope,$rootScope,$location) {
				$scope.secretCode = $rootScope.secretCode;
				$scope.destLink = "http://" + $location.host() + "/show/" + $scope.secretCode;
				$scope.done = function() {
					//call API
				}
	
	
} ]);


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

