var db = require('./db'),
    Schema = db.Schema;

var menuSchema = new Schema({
    id : String,
    name : String,
    icon : String,
    _section : {
        type: Schema.Types.ObjectId,
        ref: 'section'
    }
});

var menu = db.model('menu', menuSchema);

module.exports = menu;
