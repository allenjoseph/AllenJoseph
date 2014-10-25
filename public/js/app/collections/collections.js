var feeds = Backbone.Collection.extend({
    model : Models.Feed
});
window.Collections.Feeds = feeds;

var menus = Backbone.Collection.extend({
    model : Models.Menu
});
window.Collections.Menus = menus;

var socialLinks = Backbone.Collection.extend({
    model : Models.SocialLink
});
window.Collections.SocialLinks = socialLinks;

var sections = Backbone.Collection.extend({
    model : Models.Section
});
window.Collections.Sections = sections;

var videos = Backbone.Collection.extend({
    model : Models.Video
});
window.Collections.Videos = videos;

var skills = Backbone.Collection.extend({
    model : Models.Skill
});
window.Collections.Skills = skills;
