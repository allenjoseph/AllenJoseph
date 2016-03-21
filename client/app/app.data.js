(function(){
	'use strict';

	angular
		.module('app.data', [])
		.run(run);

	run.$inject = ['$http', '$rootScope'];

	function run($http, $rootScope){

		$http
			.get('/assets/data/data.json')
			.then(setData);

		$http
			.get( 'http://es.gizmodo.com/rss')
			.then(setFeeds);

		function setData(rpta){
			$rootScope.data = rpta.data;
		}

		function setFeeds(rpta){
			$rootScope.feeds = rpta.data;
		}
	}
})();
