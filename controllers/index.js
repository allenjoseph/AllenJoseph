var indexController = function(server, data, array_feed){
	server.get('/', function(req, res){

		res.render('index', { app : data , feeds : JSON.parse(array_feed)});
	});
};

module.exports = indexController;