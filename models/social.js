var db = require('./db'),
    Schema = db.Schema;

var socialSchema = new Schema({
    id : String,
    name : String,
    icon : String
});

var social = db.model('social', socialSchema);

module.exports = social;
