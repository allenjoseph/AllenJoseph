var express = require('express'),
swig = require('swig'),
bodyParser = require('body-parser'),
request = require('request'),
app = express();

/* CONFIGURACION DE LAS VISTAS */
app.engine( 'html', swig.renderFile );
app.set( 'view engine', 'html' );
app.set( 'views', __dirname + '/views' );

/* CONFIGURACION DEL app */
app.use( express.static(__dirname + '/dist') );
app.use( bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() );

var enviroment = process.env.NODE_ENV || 'development';
app.set('enviroment', enviroment);

app.get('/currentTrack', function(req, res){
	request.post({
		url: 'http://www.shoutcast.com/Player/GetCurrentTrack',
		form: { stationID: 8318 }
	}, function(error, response, body){
		if (!error && response.statusCode == 200) {
			res.json(JSON.parse(body));
		}
	});
});


/* Controllers ------------------------------------*/
/*var indexController = require('./controllers/index');
var messageController = require('./controllers/message');
indexController(app);
messageController(app);*/

/*-------------------------------------------------*/
app.listen(3030,function(){
	console.log("Running App : AllenJoseph");
	console.log("Listen in port : 3030");
	console.log("Enviroment : ",app.get('enviroment'));
});
