(function(){
    Views.SocialLink = Backbone.View.extend({
        tagName : 'li',

        template : template('tpl-social-link'),

        render : function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });
})();
