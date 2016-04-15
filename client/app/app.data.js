(function(){
	'use strict';

	angular
		.module('app.data', [])
		.run(run);

	run.$inject = ['$http', '$rootScope'];

	function run($http, $rootScope){

		$http
			.get('data')
			.then(setData);

		$http
			.get( 'feeds')
			.then(setFeeds);

		function setData(rpta){
			$rootScope.data = rpta.data;
		}

		function setFeeds(rpta){
			$rootScope.feeds = rpta.data.items;
			$rootScope.$emit('feedsLoaded');
		}
	}
})();
