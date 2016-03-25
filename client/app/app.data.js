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
			.get( 'http://rss2json.com/api.json?rss_url=http%3A%2F%2Fes.gizmodo.com%2Frss')
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
