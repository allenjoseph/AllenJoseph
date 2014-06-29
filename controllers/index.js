var indexController = function(server){

	server.get('/', function(req, res){
		res.render('index');
	});
};

module.exports = indexController;