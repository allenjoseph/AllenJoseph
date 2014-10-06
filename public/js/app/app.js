(function(){

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
    });

    /*=============================================================*/

    new Routers.App();
    Backbone.history.start({root: '/', silent: false});

})();
