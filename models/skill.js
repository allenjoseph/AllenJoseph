var db = require('./db'),
    Schema = db.Schema;

var skillSchema = new Schema({
    name : String
});

var skill = db.model('skill', skillSchema);

module.exports = skill;
