(function(){
	"use strict";

	angular
		.module('app')
		.config(AppConfiguration);

	AppConfiguration.$inject = ['$stateProvider', '$urlRouterProvider', 'ContestConfig', 'EntryConfig'];

	function AppConfiguration($stateProvider, $urlRouterProvider, ContestConfig, EntryConfig){
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state('index', {
				url: "/",
				templateUrl: "/views/lobby.html",
				controller : 'lobbyController as lobby',
				resolve: {
					League : 'League',
					Match : 'Match',
					Contest : 'Contest',
					User : 'User',
					leagues : function(League){
						return League.query().$promise;
					},
					preMatches : function(Match){
						return Match.query().$promise;
					},
					contests : function(Contest){
						return Contest.query({limit : ContestConfig.contestsPerPage}).$promise;
					},
					user : function(User){
						return User.get({user_id : window.user_id}).$promise;
					}
				}
			})
			.state('entry', {
				url : '/entry/:contest_id/',
				templateUrl: '/views/entry.html',
				controller: 'entryController as entry',
				resolve : {
					Contest : 'Contest',
					Player : 'Player',
					User : 'User',
					contest : [
						'$stateParams',
						'Contest',
						function($stateParams, Contest){
							return Contest.get({contest_id : $stateParams.contest_id}).$promise;
						}
					],
					players : [
						'Player',
						'contest',
						function(Player, contest){
							return Player.get({contest_id : contest.id, limit : EntryConfig.playersPerPage}).$promise;
						}
					],
					user : function(User){
						return User.get({user_id : window.user_id}).$promise;
					}
				}

			});
	}
})();
