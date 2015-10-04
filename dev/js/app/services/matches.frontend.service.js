(function(){
	"use strict";

	angular
		.module('tifo')
		.factory('Match', MatchFactory);

	MatchFactory.$inject = ['$resource'];

	function MatchFactory($resource){

		var MatchResource = $resource(
			'/matches/:match_id',
			{match_id:'@_id'},
			{
				query : {
					isArray : false
				}
			}
		);

		return MatchResource;
	}
})();