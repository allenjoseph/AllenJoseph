(function(){
    Views.Menu = Backbone.View.extend({

        tagName : 'li',

        events : {
            'click' : 'clickMenu'
        },

        template : template('tpl-nav'),

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
})();
