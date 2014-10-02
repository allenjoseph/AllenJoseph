(function(){

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

        $.get('/feeds')
        .done(function(data){
            app.collections.feeds = new Collections.Feeds(data);
            app.views.feedList = new Views.FeedList({collection : app.collections.feeds});
        })
        .fail(function(err){
            console.error(err);
        });

    })
    .fail(function(err){
        console.error(err);
    });

    $(window).on('scroll', function(){
        var window_top = $(window).scrollTop();
        if(window_top > 290){
            $('#content-nav').removeClass('navbar-transparent');
        }else{
            $('#section-title').html('<i class="fa fa-star-half-o fa-fw"></i>&nbsp;Allen Joseph');
            $('#content-nav').addClass('navbar-transparent');
            $('.navbar-nav > li').removeClass('selected');
            $('.section-box').css('padding-top','10px');
        }
    })

})();
