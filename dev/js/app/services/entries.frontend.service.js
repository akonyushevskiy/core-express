(function(){
	"use strict";

	angular
		.module('tifo')
		.factory('Entry', EntryFactory);

	function EntryFactory(){

		var EntryResource = {
			getByUser : function(){},
			getByContest : function(){},
			create : function(){}
		};

		return EntryResource;
	}
})();