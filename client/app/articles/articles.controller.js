(function(){
	'use strict';

	angular
		.module('app')
		.controller('Articles', Articles);

	Articles.$inject = ['$rootScope', '$sce'];

	function Articles($rootScope, $sce){

		var vm = this;
	}
})();
