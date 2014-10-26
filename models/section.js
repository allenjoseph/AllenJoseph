var db = require('./db'),
    Schema = db.Schema;

var sectionSchema = new Schema({
    id : String,
    title : String,
    description : String,
    articles : [{
        type: Schema.Types.ObjectId,
        ref: 'article'
    }],
    skills : [{
        type: Schema.Types.ObjectId,
        ref: 'skill'
    }]
});

var section = db.model('section', sectionSchema);

module.exports = section;
