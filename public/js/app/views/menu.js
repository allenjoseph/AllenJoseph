(function(){
    var menu = Backbone.View.extend({

        tagName : 'li',

        events : {
            'click' : 'clickMenu'
        },

        template : _.template(this.$('#tpl-nav').html()),

        render : function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

        clickMenu : function(){

            $('.navbar-nav > li').removeClass('selected');
            this.$el.addClass( 'selected' );
            var top = $('#'+this.model.attributes.href).offset().top;
            $('body').stop().animate({'scrollTop':top},300);
        }

    });
    window.Views.Menu = menu;
})();
