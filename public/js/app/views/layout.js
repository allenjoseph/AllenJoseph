var layout = Backbone.View.extend({

    el : 'body',

    initialize : function(){

        $(window).on('scroll', function(){
            var window_top = $(window).scrollTop();
            if(window_top > 290){
                $('#content-nav').removeClass('navbar-transparent');
            }else{
                $('#content-nav').addClass('navbar-transparent');
                $('.navbar-nav > li').removeClass('selected');
                $('.section-box').css('padding-top','10px');
            }
        });
    }
});
window.Views.Layout = layout;