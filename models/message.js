var db = require('./db'),
    Schema = db.Schema;

var messageSchema = new Schema({
    email : String,
    message : String,
    date : { type: Date, default: Date.now }
});

var message = db.model('message', messageSchema);

module.exports = message;
