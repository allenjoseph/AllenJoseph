var request = require('request'),
	path = require('path');

module.exports = mainController;

function mainController (app) {

	app.get('/data', function(req, res){
		res.sendFile(path.normalize(app.rootPath + '/data/data.json'));
	});

	app.get('/feeds', function(req, res){
		request.get({
			url: 'http://rss2json.com/api.json?rss_url=http%3A%2F%2Fes.gizmodo.com%2Frss'
		}, function(error, response, body){
			if (!error && response.statusCode == 200) {
				res.json(JSON.parse(body));
			}else{
				res.status(500).send('Error :(')
			}
		});
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

	app.get('/*', function(req, res){
		res.redirect('/');
	});
};

