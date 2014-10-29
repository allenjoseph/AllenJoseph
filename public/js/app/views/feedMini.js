(function(){
    Views.FeedMini = Backbone.View.extend({
        tagName : 'li',

        template : template('tpl-feed-mini'),

        render : function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });
})();
