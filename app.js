var express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

/* CONFIGURACION DE LA APP */
app.use( express.static(__dirname + '/dist') );
app.use( bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() );
app.rootPath = __dirname;

/* CONTROLLERS */
var mainController = require('./controllers/main'),
	messageController = require('./controllers/message');

mainController(app);
messageController(app);

/* SERVER */
var port = process.env.PORT || 3030,
	host = process.env.IP || 'localhost';

app.listen(port, host, function(){
	console.log('Running App : AllenJoseph');
	console.log('Listen in :', host + ':' + port);
});
