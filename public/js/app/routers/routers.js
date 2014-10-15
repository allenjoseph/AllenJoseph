var routers = Backbone.Router.extend({

    routes : {
        '' : 'index',
        '*otherRoute' : 'default'
    },

    initialize : function(){
        app.views.layout = new Views.Layout();

        app.routers.exceptions = [];
        Backbone.history.start({root: '/'});
    },

    index : function(){
        this.fetchData();
    },

    default : function(otherRoute){
        if(!this.isRouteException(otherRoute)){
            app.routers.main.navigate('');
        }
    },

    fetchData : function(){

        var self = this;

        $.get('data')
        .done(function(data){
            app.collections.menus = new Collections.Menus(data.menus);
            app.views.menuList = new Views.MenuList({collection : app.collections.menus});
            delete data.menus;

            app.collections.socialLinks = new Collections.SocialLinks(data.socials);
            app.views.socialLinkList = new Views.SocialLinkList({collection : app.collections.socialLinks});
            delete data.socials;

            app.collections.sections = new Collections.Sections(data.sections);
            app.views.sectionList = new Views.SectionList({collection : app.collections.sections});
            delete data.sections;

            app.info = new Models.Info(data);
            app.views.info = new Views.Info({model : app.info});
            app.views.footer = new Views.Footer();

            self.addRoutesMenuExceptions();
            self.fetchFeeds();
            self.fetchSkills();
        })
        .fail(function(err){
            console.error(err);
        });
    },

    fetchFeeds : function(){
        $.get('/feeds')
        .done(function(data){
            app.collections.feeds = new Collections.Feeds(data);
            app.views.feedList = new Views.FeedList({collection : app.collections.feeds});
        })
        .fail(function(err){
            console.error(err);
        });
    },

    fetchSkills : function(){
        $.get('/skills')
        .done(function(data){
            app.collections.skills = new Collections.Skills(data);
            app.views.skillList = new Views.SkillList({collection : app.collections.skills});
        })
        .fail(function(err){
            console.error(err)
        });
    },

    addRoutesMenuExceptions : function(){
        app.routers.exceptions = app.collections.menus.pluck('href');
        app.routers.exceptions.push('content-header');
    },

    isRouteException : function(route){
        return _.contains(app.routers.exceptions, route);
    }


});
window.Routers.App = routers;
