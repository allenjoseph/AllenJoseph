(function() {
	'use strict';

	angular
		.module('app.widgets')
		.directive('jPlayer', jPlayer);

	jPlayer.$inject = ['$http', '$interval'];

	function jPlayer($http, $interval){

		var urls = {
			currentTrack: 'http://www.shoutcast.com/Player/GetCurrentTrack'
		};

		var station = {
			ID: 8318,
			name: 'HOT 108 JAMZ',
			mp3: 'http://108.61.30.179:4000/;?icy=http'
		};

		var directive = {
			link: link,
			templateUrl: 'widgets/jplayer.html',
			restrict: 'EA'
		};

		return directive;

		function link(scope, element, attrs){

			var trackInteval;
			var $player = $(element).find('div.player');
			var $track = $(element).find('label');

			var player = $player.jPlayer({
				error: onError,
				preload: 'none',
				ready: startStream,
				solution: 'html',
				supplied: 'mp3',
				volume: 1,
				wmode: 'window'
			});

			element.on('$destroy', function() {
				$interval.cancel(trackInteval);
			});

			scope.mute = function(){
				player.jPlayer("mute");
				scope.muted = true;
			};

			scope.unmute = function(){
				player.jPlayer("unmute");
				scope.muted = false;
			};

			function onError(event){
				console.log(event);
			}

			function startStream(){

				player.jPlayer('setMedia', station).jPlayer('play');

				getCurrentTrack();

				trackInteval = $interval(getCurrentTrack, 60000);
			}

			function getCurrentTrack() {

				$http
					.post(urls.currentTrack, { stationID: station.ID })
					.then(function(data) {

						scope.currentTrack = data.CurrentTrack;
					})
					.catch(function(){

						scope.currentTrack = station.name;
					});
			}
		}
	}
})();
