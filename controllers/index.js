var http = require('http'),
	feedParser = require('feedparser');

var indexController = function(server, data){

	var feed_gizmodo = 'http://es.gizmodo.com/rss';

	server.get('/', function(req, res){
		var feeds = [];
		var request = http.get(feed_gizmodo, function(response){
			response.pipe(new feedParser())
			.on('error', function (error) { console.error('FEED error : ',error); })
			.on('meta', function (meta) { console.log('FEED : ', meta.title); })
			.on('readable', function() {
				var stream = this, item;
				while (item = stream.read()) {		
					var item_url = item.description
									.substr(item.description.lastIndexOf('src='))
									.split('"',2)[1];
					var item_description = item.description
											.substr(item.description.lastIndexOf('<p class="first-text">'));

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
				res.render('index', { 
					app : data , 
					feeds : JSON.parse(JSON.stringify(feeds)),
					env : server.get('env')
				});		
			});
		});
		
		request.on('error', function(){
			res.render('index', { 
				app : data , 
				feeds : "",
				env : server.get('env')
			});
		});		
	});
};

module.exports = indexController;