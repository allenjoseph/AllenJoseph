(function(){
    var socialLink = Backbone.View.extend({
        tagName : 'li',

        template : _.template(this.$('#tpl-social-link').html()),

        render : function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });
    window.Views.SocialLink = socialLink;
})();
