var express = require('express'),
    swig = require('swig'),
    app = express();

/* CONFIGURACION DE LAS VISTAS */
app.engine( 'html', swig.renderFile );
app.set( 'view engine', 'html' );
app.set( 'views', __dirname + '/views' );

/* CONFIGURACION DEL app */
app.use( express.static(__dirname + '/public') );

var enviroment = process.env.NODE_ENV || 'development';
app.set('enviroment', enviroment);

/* Controller INDEX ------------------------------------*/
var indexController = require('./controllers/index');
indexController(app);

/*-------------------------------------------------*/
app.listen(3030,function(){
    console.log("Running App : AllenJoseph");
    console.log("Listen in port : 3030");
    console.log("Enviroment : ",app.get('enviroment'));
});
