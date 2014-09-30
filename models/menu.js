var db = require('./db'),
    Schema = db.Schema;

var menuSchema = new Schema({
    id : String,
    name : String,
    icon : String,
    articles : [{
        type: Schema.Types.ObjectId,
        ref: 'article'
    }]
});

var menu = db.model('menu', menuSchema);

module.exports = menu;
