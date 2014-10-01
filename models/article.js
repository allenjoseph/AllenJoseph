var db = require('./db'),
    Schema = db.Schema;

var articleSchema = new Schema({
    id : String,
    title : String,
    url : String,
    img : String,
    _section : {
        type: Schema.Types.ObjectId,
        ref: 'section'
    }
});

var article = db.model('article', articleSchema);

module.exports = article;
