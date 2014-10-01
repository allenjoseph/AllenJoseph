var footerItem =  Backbone.View.extend({

    template : _.template(this.$('#tpl-footer').html()),

    render : function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});
window.Views.FooterItem = footerItem;
