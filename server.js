var express = require('express'),
    swig = require('swig'),
    fs = require('fs');
 

var server = express(),
	baseData = fs.readFileSync('./base-data.json').toString(),
	feed_gizmodo = 'http://es.gizmodo.com/rss';

var data = JSON.parse(baseData);

/* CONFIGURACION DE LAS VISTAS */
server.engine( 'html', swig.renderFile );
server.set( 'view engine', 'html' );
server.set( 'views', __dirname + '/views' );  

/* CONFIGURACION DEL SERVER */
server.configure(function(){
    server.use( express.static(__dirname + '/public') );

    server.use( express.json() );
    server.use( express.urlencoded() );
    server.use( express.methodOverride() );

    server.use( server.router );  
});

/* Controller INDEX ------------------------------------*/
var indexController = require('./controllers/index');
indexController(server, data);

/*-------------------------------------------------*/
server.listen(3030,function(){
    console.log("AllenJoseph running on port : 3030");
});