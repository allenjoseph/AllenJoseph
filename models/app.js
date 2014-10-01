var db = require('./db'),
    Schema = db.Schema;

var appSchema = new Schema({
    title : String,
    favicon : String,
    description : String,
    direction : String,
    avatar : String,
    menus : [{
        type : Schema.Types.ObjectId,
        ref : "menu"
    }]
});

var app = db.model('app', appSchema);

module.exports = app;
