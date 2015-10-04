(function(){
	"use strict";

	angular
		.module('tifo')
		.factory('League', LeagueFactory);

	LeagueFactory.$inject = ['$resource'];

	function LeagueFactory($resource){

		var LeagueResource = $resource(
			'/leagues/:league_id',
			{league_id:'@_id'},
			{
				query : {
					isArray : false
				}
			}
		);

		return LeagueResource;
	}
})();