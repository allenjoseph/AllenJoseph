var feed = Backbone.Model.extend({
    defaults:{
        image : ''
    }
});
window.Models.Feed = feed;

var menu = Backbone.Model.extend({});
window.Models.Menu = menu;

var info = Backbone.Model.extend({});
window.Models.Info = info;

var socialLink = Backbone.Model.extend({});
window.Models.SocialLink = socialLink;

var section = Backbone.Model.extend({});
window.Models.Section = section;

var skill = Backbone.Model.extend({});
window.Models.Skill = skill

var video = Backbone.Model.extend({});
window.Models.Video = video

var message = Backbone.Model.extend({
    urlRoot : '/messages'
});
window.Models.Message = message;
