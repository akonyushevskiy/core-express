(function(){
	"use strict";

	angular
		.module('tifo')
		.factory('Contest', ContestFactory);

	ContestFactory.$inject = ['$resource'];

	function ContestFactory($resource){

		var ContestResource = $resource(
			'/contests/:contest_id',
			{contest_id:'@_id'},
			{
				query : {
					isArray : false
				}
			}
		);

		return ContestResource;
	}
})();