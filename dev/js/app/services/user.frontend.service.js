(function(){
	"use strict";

	angular
		.module('tifo')
		.factory('User', UserFactory);

	UserFactory.$inject = ['$resource'];

	function UserFactory($resource){

		var UserResource = $resource(
			'/users/:user_id',
			{
				user_id : '@_id'
			},
			{
				query : {
					isArray : false
				}
			}
		);

		return UserResource;
	}
})();