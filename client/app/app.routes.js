(function(){
	'use strict';

	angular
		.module('app.routes', ['ui.router'])
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider){
		$urlRouterProvider
			.otherwise('/home');

		$stateProvider
			.state('layout', {
				abstract: true,
				templateUrl: 'layout/body.html'
			})
			.state('body', {
				parent: 'layout',
				views: {
					'header': {
						templateUrl: 'layout/header.html'
					},
					'footer': {
						templateUrl: 'layout/footer.html'
					},
					'' : {
						templateUrl: 'home/home.html'
					}
				}
			})
			.state('body.home', {
				url: '/home',
				views: {
					'feeds': {
						controller: 'Feeds as vm',
						templateUrl: 'feeds/feeds.html'
					},
					'articles': {
						controller: 'Articles as vm',
						templateUrl: 'articles/articles.html'
					},
					'skills': {
						templateUrl: 'skills/skills.html'
					}
				}
			});
	}
})();
