var footerItem =  Backbone.View.extend({

    tagName : 'div',

    className : 'col-md-4 footer-box',

    template : _.template(this.$('#tpl-footer').html()),

    render : function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});
window.Views.FooterItem = footerItem;
