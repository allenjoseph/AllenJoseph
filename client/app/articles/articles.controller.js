(function(){
	'use strict';

	angular
		.module('app')
		.controller('Articles', Articles);

	Articles.$inject = ['$rootScope', '$sce'];

	function Articles($rootScope, $sce){

		var vm = this;

		vm.selectVideo = function(video){

			video.url = $sce.trustAsResourceUrl(video.url);

			$rootScope.videoSelected = video;
		};
	}
})();
