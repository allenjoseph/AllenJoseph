var menu = Backbone.View.extend({

    tagName : 'li',

    events : {
        'click' : 'addClass'
    },

    template : _.template(this.$('#tpl-nav').html()),

    render : function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    addClass : function(){

        $('.navbar-nav > li').removeClass('selected');
        this.$el.addClass( 'selected' );

        $('.section-box').css('padding-top','10px');
        $('#'+this.model.attributes.href).css('padding-top','100px');
    }

});
window.Views.Menu = menu;
