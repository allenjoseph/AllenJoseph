var menu = Backbone.View.extend({

    tagName : 'li',

    template : _.template(this.$('#tpl-nav').html()),

    render : function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});
window.Views.Menu = menu;
