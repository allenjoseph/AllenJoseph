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

        var title = '<i class="fa '+ this.model.attributes.icon +'"></i>&nbsp;'+this.model.attributes.name;
        $('#section-title').html(title);

        $('.section-box').css('padding-top','10px');
        $('#'+this.model.attributes.href).css('padding-top','80px');
    }

});
window.Views.Menu = menu;
