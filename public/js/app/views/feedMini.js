(function(){
    var feedMini = Backbone.View.extend({
        tagName : 'li',

        template : _.template(this.$('#tpl-feed-mini').html()),

        render : function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });
    window.Views.FeedMini = feedMini;
})();
