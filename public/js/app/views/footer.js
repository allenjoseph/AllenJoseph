var footer =  Backbone.View.extend({

    el : '#content-footer-form',

    template : _.template(this.$('#tpl-footer').html()),

    initialize : function(){
        this.render();
    },

    render : function(){
        this.$el.html(this.template({}));
        return this;
    }
});
window.Views.Footer = footer;
