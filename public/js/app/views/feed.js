(function(){
    Views.Feed = Backbone.View.extend({

        tagName : 'div',

        template : template('tpl-feed'),

        render : function(){
            this.$el.html(this.template(this.model.attributes));
            this.$el.find('a').attr('target','_blank')
            return this;
        }
    });
})();
