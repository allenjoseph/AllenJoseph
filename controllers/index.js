var http = require('http'),
	feedParser = require('feedparser'),
    Section = require('../models/section'),
    SocialLink = require('../models/social'),
    Menu = require('../models/menu'),
    Article = require('../models/article'),
    App = require('../models/app'),
    Skill = require('../models/skill');

var indexController = function(app){

    app.get('/data', function(req, res){
        App
        .findOne( { name : 'home' } )
        .populate( 'menus socials sections' )
        .exec(function( err, app ){
            if(!err){
                Article
                .populate( app, { path : 'sections.articles' }, function( err, data ){
                    if(!err){
                        res.json(data);
                    }
                });
            }
        });
    });

	app.get('/feeds', function(req, res){
		var feeds = [];
		var request = http.get( 'http://es.gizmodo.com/rss', function(response){
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
				res.json(feeds);
			});
		});
        request.on('error', function(){
            res.json({});
        });
	});

	app.get('/home', function(req, res){
        var params = {
            'app' : {
                'name' : 'Allen Joseph',
                'enviroment' : app.get('enviroment')
            }
        };
		res.render('home',params);
	});

    app.get('/skills', function(req, res){
        Skill.find({}).exec(function(err, data){
            if(!err){
                res.json(data);
            }
        });
    });
};

module.exports = indexController;
