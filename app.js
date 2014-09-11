var express = require('express'),
    swig = require('swig'),
    fs = require('fs');
 

var app = express(),
	baseData = fs.readFileSync('./base-data.json').toString(),
	feed_gizmodo = 'http://es.gizmodo.com/rss';

var data = JSON.parse(baseData);

/* CONFIGURACION DE LAS VISTAS */
app.engine( 'html', swig.renderFile );
app.set( 'view engine', 'html' );
app.set( 'views', __dirname + '/views' );  

/* CONFIGURACION DEL app */
app.use( express.static(__dirname + '/public') );

var env = process.env.NODE_ENV || 'development';
app.set('env', env);

/* Controller INDEX ------------------------------------*/
var indexController = require('./controllers/index');
indexController(app, data);

/*-------------------------------------------------*/
app.listen(3030,function(){
    console.log("AllenJoseph running on port : 3030");
});