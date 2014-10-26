var db = require('./db'),
    Schema = db.Schema;

var skillSchema = new Schema({
    name : String,
    description : String,
    background : String,
    textColor : String,
    _section : {
        type: Schema.Types.ObjectId,
        ref: 'section'
    }
});

var skill = db.model('skill', skillSchema);

module.exports = skill;
