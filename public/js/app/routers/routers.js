(function(){
    var routers = Backbone.Router.extend({

        routes : {
            '' : 'index',
            '*otherRoute' : 'default'
        },

        initialize : function(){
            app.views.layout = new Views.Layout();
            Backbone.history.start({root: '/'});
        },

        index : function(){
            this.fetchData();
        },

        default : function(otherRoute){
            if(!app.collections.menus){
                this.fetchData();
            }
            this.navigate('');
        },

        fetchData : function(){

            var self = this;
            $.get('data')
                .done(function(data){
                    app.collections.menus = new window.Collections.Menus(data.menus);
                    app.views.menuList = new window.Views.MenuList({collection : app.collections.menus});

                    app.collections.socialLinks = new window.Collections.SocialLinks(data.socials);
                    app.views.socialLinkList = new window.Views.SocialLinkList({collection : app.collections.socialLinks});

                    app.collections.sections = new window.Collections.Sections(data.sections);
                    app.views.sectionList = new window.Views.SectionList({collection : app.collections.sections});

                    app.info = new window.Models.Info(data);
                    app.views.info = new window.Views.Info({model : app.info});
                    app.views.footer = new window.Views.Footer();

                    self.fetchFeeds();
                })
                .fail(function(){
                    console.error('fail :(');
                });
        },

        fetchFeeds : function(){
            $.get('/feeds')
            .done(function(data){
                app.collections.feeds = new Collections.Feeds(data);
                app.views.feedList = new Views.FeedList({collection : app.collections.feeds});
            })
            .fail(function(){
                console.error('fail :(');
            });
        }
    });
    window.Routers.App = routers;
})();
