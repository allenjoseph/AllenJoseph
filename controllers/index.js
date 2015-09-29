var http = require('http'),
    feedParser = require('feedparser'),
    SocialLink = require('../models/social'),
    Article = require('../models/article'),
    Skill = require('../models/skill'),
    Menu = require('../models/menu'),
    Section = require('../models/section'),
    App = require('../models/app');

var indexController = function(app){

    app.use( function (req, res, next) {
        res.status(404)
        res.redirect('/home');
    })

    app.get('/', function(req, res){
        res.redirect('/home');
    });

    app.all('/home/*', function(req, res){
        res.redirect('/home');
    })

    app.get('/home', function(req, res){
        var params = {
            'app' : {
                'name' : 'Allen Joseph',
                'description' : 'Allen Joseph Velasco Arias - Ingeniero en Informática y Desarrollador FrontEnd',
                'keywords' : 'Allen Joseph Velasco Arias, allenjoseph, Peru, Lima, Piura, developer, frontend, desarrollador, backend, javascript, html5',
                'enviroment' : app.get('enviroment')
            }
        };
		res.render('home',params);
	});

    app.get('/data', function(req, res){
        App.findOne( { name : 'home' } )
        .populate( 'menus socials sections' )
        .exec(function( err, data ){
            if(err){ return res.json( { error : err } );}
            Skill.populate(data, { path : 'sections.skills' }, function(err, data){
                if(err){ return res.json( { error : err } );}
                Article.populate(data, { path : 'sections.articles' }, function(err, data){
                    if(err){ return res.json( { error : err } );}
                    res.json(data);
                });
            });
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
};

module.exports = indexController;
