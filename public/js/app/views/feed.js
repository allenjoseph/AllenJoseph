var feed = Backbone.View.extend({

    tagName : 'div',

    template : _.template(this.$('#tpl-feed').html()),

    render : function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});
window.Views.Feed = feed;
