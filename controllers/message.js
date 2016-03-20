var express = require('express'),
Message = require('../models/message');

var messageController = function(app){

	var messages = express.Router()

	.post('/',function(req, res, next){
		var message = new Message({
			email : req.body.email,
			message : req.body.message
		});
		message.save(function(err, model){
			if(err){ return res.json({ error : err }); }
			res.json({ thanks : 'Gracias por saludar! :)' });
		});
	});

	app.use('/messages', messages);
};

module.exports = messageController;
