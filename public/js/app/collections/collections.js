var feeds = Backbone.Collection.extend({
    model : Models.Feed
});
window.Collections.Feeds = feeds;

var menus = Backbone.Collection.extend({
    model : Models.Menu
});
window.Collections.Menus = menus;
