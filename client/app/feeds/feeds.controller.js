(function(){
	'use strict';

	angular
		.module('app')
		.controller('Feeds', Feeds);

	Feeds.$inject = ['$rootScope', '$compile'];

	function Feeds($rootScope, $compile){

		var vm = this;

		$rootScope.$on('feedsLoaded', formatFeeds);

		vm.changePage = function(pageSelected){

			_.forEach(vm.pagination, function(page){
				page.active = false;

				_.forEach(page, function(item){ item.active = false;});
			});

			pageSelected.active = true;

			_.forEach(pageSelected, function(item){ item.active = true; });
		};

		function formatFeeds(){

			_.forEach($rootScope.feeds, function(item, index){

				item.active = index < 3;

				var html = $compile(item.description)(vm);

				var $img = angular.element(html[0]);

				var $readMore = angular.element('<a>Leer más...</a>');
				$readMore
					.attr('href', item.link)
					.attr('target', '_blank');

				var $cardSection = angular.element('<div class="card-section"></div>');
				$cardSection
					.append('<p>' + item.title + '</p>')
					.append($readMore);

				item.description = [$img.prop('outerHTML'), $cardSection.prop('outerHTML')].join('');
			});

			vm.pagination = _.chunk($rootScope.feeds, 3);

			vm.pagination[0].active = true;
		}
	}
})();
