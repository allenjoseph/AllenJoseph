var express = require('express');

var messageController = function(app){

    var messages = express.Router()
    .post('/',function(req, res, next){
        console.log(req.body);
    });

    app.use('/messages', messages);
};

module.exports = messageController;
