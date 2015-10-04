(function(){
	"use strict";

	angular
		.module('tifo')
		.factory('Player', PlayerFactory);

	PlayerFactory.$inject = ['$resource'];

	function PlayerFactory($resource){

		var PlayerResource = $resource(
			'/players/:player_id',
			{player_id:'@_id'},
			{
				query : {
					isArray : false
				}
			}
		);

		return PlayerResource;
	}
})();