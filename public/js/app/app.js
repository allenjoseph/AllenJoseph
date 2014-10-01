(function(){

    $.get('/feeds')
    .done(function(data){
        app.collections.feeds = new Collections.Feeds(data);
        app.views.feedList = new Views.FeedList({collection : app.collections.feeds});
    })
    .fail(function(err){
        console.error(err);
    });

    $.get('data')
    .done(function(data){
        app.collections.menus = new Collections.Menus(data.menus);
        app.views.menuList = new Views.MenuList({collection : app.collections.menus});
        delete data.menus;

        app.info = new Models.Info(data);
        app.views.info = new Views.Info({model : app.info});
    })
    .fail(function(err){
        console.error(err);
    });


})();
