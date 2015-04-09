'use strict';

var savControllers = angular.module('savControllers', [ 'savServices',
		'ngCookies' ]);

// HomeController
savControllers.controller('HomeCtrl', [ '$scope', '$rootScope',
		'CodeGeneration', '$state', 'CookieTackle',
		function($scope, $rootScope, CodeGeneration, $state, CookieTackle) {
			// Create Secret Code
			// This code will be used to access vote or generate Vote URL
			$rootScope.secretCode = CodeGeneration();

			$scope.taoVote = function() {
				// Put this secretCode into cookie
				CookieTackle.store('secretCode', $rootScope.secretCode);
				$state.transitionTo('step1');
			};
		} ]);

// CreateVoteController
savControllers.controller('CreateVoteCtrl', [
		'$scope',
		'$rootScope',
		'ActionURL',
		'$http',
		'$state',
		'CookieTackle',
		function($scope, $rootScope, ActionURL, $http, $state, CookieTackle) {

			$rootScope.vote = {};
			$scope.options = [];
			$scope.form = {};
			$scope.title = "";
			if (CookieTackle.isExist('secretCode')) {
				// There is data input
				$rootScope.secretCode = CookieTackle.retriever('secretCode');
				if (CookieTackle.isExist($rootScope.secretCode)) {
					$rootScope.vote = CookieTackle
							.retriever($rootScope.secretCode);
					$scope.options = $rootScope.vote.options;
					$scope.title = $rootScope.vote.title;
				}
			}

			var returnMsg = "";
			var number = 0;

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
				// Put this secretCode into cookie
				CookieTackle.store($rootScope.secretCode, $rootScope.vote);
				$state.transitionTo('step2');
			}

		} ]);

savControllers
		.controller(
				'ConfigVoteCtrl',
				[
						'$scope',
						'$rootScope',
						'$state',
						'CookieTackle',
						function($scope, $rootScope, $state, CookieTackle) {
							$scope.myForm = {};
							$scope.closeDuration = 0;
							$scope.closeTick = false;
							$scope.emails = [];
							$scope.period = $scope.type = $scope.publicity = "";
							if (CookieTackle.isExist('secretCode')) {
								// There is data input
								$rootScope.secretCode = CookieTackle
										.retriever('secretCode');
								if (CookieTackle.isExist($rootScope.secretCode)) {
									$rootScope.vote = CookieTackle
											.retriever($rootScope.secretCode);
									if ($rootScope.vote.config !== undefined) {
										$scope.publicity = $rootScope.vote.config.publicity;
										$scope.type = $rootScope.vote.config.type;
										$scope.closeDuration = $rootScope.vote.config.closeDuration;
										$scope.period = $rootScope.vote.config.period;
										$scope.emails = $rootScope.vote.config.emails;
									}
								}
							}
							$scope.addEmail = function(email) {

								var emailList = $scope.emails;
								emailList.push(email);
								$scope.emails = angular.copy(emailList);

							};

							$scope.goNext = function() {
								$rootScope.vote.config = {};
								$rootScope.vote.config.publicity = $scope.publicity;
								$rootScope.vote.config.type = $scope.type;
								$rootScope.vote.config.closeDuration = $scope.closeDuration;
								$rootScope.vote.config.period = $scope.period;
								$rootScope.vote.config.emails = $scope.emails;
								console.log($rootScope.vote);
								// Put this secretCode into cookie
								CookieTackle.store($rootScope.secretCode,
										$rootScope.vote);
								$state.transitionTo('step3');
							}

						} ]);

savControllers.controller('CompleteVoteCtrl', [
		'$scope',
		'$rootScope',
		'$location',
		'CookieTackle',
		function($scope, $rootScope, $location, CookieTackle) {
			$scope.secretCode = $rootScope.secretCode;

			if (CookieTackle.isExist('secretCode')) {
				// There is data input
				$rootScope.secretCode = CookieTackle.retriever('secretCode');
				if (CookieTackle.isExist($rootScope.secretCode)) {
					$rootScope.vote = CookieTackle
							.retriever($rootScope.secretCode);
				}
			}

			$scope.destLink = "http://" + $location.host() + "/show/"
					+ $scope.secretCode;
			$scope.done = function() {
				// call API
				// Put this secretCode into cookie
				CookieTackle.store($rootScope.secretCode, $rootScope.vote);
			}

		} ]);

savControllers
		.controller(
				'ShowVoteCtrl',
				[
						'$scope',
						'$http',
						function($scope, $http) {
							$scope.voteDone = false;

							// TODO: load from back-end
							$http.get('/dump/vote.json').success(
									function(data) {
										$scope.vote = data;
										var polls = $scope.vote.polls;

										initVoteSum(polls);
										addNewVote2Polls();
									});

							function addNewVote2Polls() {
								var opts = [];
								for (var i = 0; i < $scope.vote.options.length; i++) {
									opts.push({
										"opt" : false
									});
								}
								;

								$scope.vote.polls.push({
									"name" : "",
									"result" : opts,
									"voted" : false
								});
							}

							function initVoteSum(polls) {
								$scope.voteSum = {};
								for (var i = 0; i < polls.length; i++) {
									for (var y = 0; y < polls[i].result.length; y++) {
										if (!$scope.voteSum
												.hasOwnProperty("opt_" + y)) {
											$scope.voteSum["opt_" + y] = 0;
										}

										$scope.voteSum["opt_" + y] = (polls[i].result[y].opt === true) ? ($scope.voteSum["opt_"
												+ y] + 1)
												: $scope.voteSum["opt_" + y];
									}
								}
								;
							}

							$scope.countVote = function(idx, isVote) {
								$scope.voteSum["opt_" + idx] = (isVote === true) ? ($scope.voteSum["opt_"
										+ idx] + 1)
										: $scope.voteSum["opt_" + idx] - 1;
							}

							$scope.submitVote = function() {
								for (var i = 0; i < $scope.vote.polls.length; i++) {
									$scope.vote.polls[i].voted = true
								}
								;

								// TODO: Save into DB

								$scope.voteDone = true;
							}
						} ]);

// Directive Attribute to display array elements on seperated lines
savControllers.directive('splitArray', function() {
	return {
		restrict : 'A',
		require : 'ngModel',
		link : function(scope, element, attr, ngModel) {

			function fromArray(text) {
				return text.split(", ");
			}

			function toLine(array) {
				return array.join("\n");
			}

			ngModel.$parsers.push(fromArray);
			ngModel.$formatters.push(toLine);
		}
	};
});