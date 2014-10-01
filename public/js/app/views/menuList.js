var menuList = Backbone.View.extend({

    el : '#content-menus',

    initialize : function(){
        this.render();
        this.listenTo( this.collection, 'add', this.renderMenu );
    },

    render : function(){
        this.$el.empty();
        this.collection.each(function(menu){
            this.renderMenu(menu);
            this.renderFooter(menu);
        }, this);
    },

    renderMenu : function( menu ){
        var view = new Views.Menu({ model : menu });
        this.$el.append(view.render().el);
    },

    renderFooter : function( menu ){
        var view = new Views.FooterItem({ model : menu });
        $('#content-footer-items').append(view.render().el);
    }

});
window.Views.MenuList = menuList;
