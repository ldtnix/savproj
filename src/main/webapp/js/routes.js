savApp.config(['$routeProvider', 
	function($routeProvider){
		$routeProvider.
			when('/home', {
				templateUrl: 'partials/home.html',
				controller: 'HomeCtrl'
			}).
			when('/create/step1', {
				templateUrl: 'partials/create-vote.html',
				controller: 'CreateVoteCtrl'
			}).
			when('/create/step2', {
				templateUrl: 'partials/config-vote.html'
				controller: 'ConfigVoteCtrl'
			}).
			when('/create/step3', {
				templateUrl: 'partials/complete-vote.html'
				controller: 'CompleteVoteCtrl'
			}).
			when('/show/:voteURL', {
				templateUrl: 'partials/show-vote.html'
				controller: 'ShowVoteCtrl'
			}).
			otherwise({
				redirectTo: '/home'
			});

}]);