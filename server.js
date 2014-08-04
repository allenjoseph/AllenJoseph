var express = require('express'),
    swig = require('swig'),
    fs = require('fs'),
	feedParser = require('feedparser'),
	http = require('http');
 

var server = express(),
	baseData = fs.readFileSync('./base-data.json').toString(),
	feed_gizmodo = 'http://es.gizmodo.com/rss';

var data = JSON.parse(baseData);
var feeds = [];

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
})

/*Feed---------------------------------------------*/
	http.get(feed_gizmodo, function(res) {
		res.pipe(new feedParser())
		.on('error', function (error) {
			console.error('FEED error : ',error);
		})
		.on('meta', function (meta) {
			console.log('FEED : ', meta.title);
		})
		.on('readable', function() {
			var stream = this, item;
			while (item = stream.read()) {		
				var item_url = item.description.substr(item.description.lastIndexOf('src=')).split('"',2)[1];
				var item_description = item.description.substr(item.description.lastIndexOf('<p class="first-text">'));
				feed_item = {
					'id' : item.guid,
					'title' : item.title,
					'link' : item.link,
					'image' : item_url,
					'description' : item_description
				}
				feeds.push(feed_item);
			}
		})
		.on('end', function() {

			/* Controller INDEX ------------------------------------*/
			var indexController = require('./controllers/index');
			// var data_feeds = feeds.length == 0 ? '' : JSON.parse();
			indexController(server, data, JSON.stringify(feeds));

		});
	});

/*-------------------------------------------------*/
server.listen(3030,function(){
    console.log("AllenJoseph running on port : 3030");
});