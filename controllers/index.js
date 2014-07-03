var indexController = function(server, data){
	
	server.get('/', function(req, res){

		res.render('index', { app : data });
	});
};

module.exports = indexController;