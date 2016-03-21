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
			.state('layout.home', {
				url: '/home',
				views: {
					'' : {
						templateUrl: 'home/home.html',
						controller: 'Home as vm'
					}
				}
			});
	}
})();
