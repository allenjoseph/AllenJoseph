var request = require('request');

module.exports = mainController;

function mainController (app) {

	app.get('/*', function(req, res){
		res.redirect('/');
	});

	app.get('/currentTrack', function(req, res){
		request.post({
			url: 'http://www.shoutcast.com/Player/GetCurrentTrack',
			form: { stationID: 8318 }
		}, function(error, response, body){
			if (!error && response.statusCode == 200) {
				res.json(JSON.parse(body));
			}else{
				res.status(500).send('Error :(')
			}
		});
	});
};

