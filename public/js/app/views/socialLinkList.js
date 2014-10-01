var socialLinkList = Backbone.View.extend({

    el : '#content-social-links',

    initialize : function(){
        this.render();
        this.listenTo( this.collection, 'add', this.renderSocialLink );
    },

    render : function(){
        this.$el.empty();
        this.collection.each(function(socialLink){
            this.renderSocialLink(socialLink);
        }, this);
    },

    renderSocialLink : function( socialLink ){
        var view = new Views.SocialLink({ model : socialLink });
        this.$el.append(view.render().el);
    },

});
window.Views.SocialLinkList = socialLinkList;
