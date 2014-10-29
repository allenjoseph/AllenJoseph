(function(){
    Views.MenuList = Backbone.View.extend({

        el : '#content-menus',

        initialize : function(){
            this.render();
            this.listenTo( this.collection, 'add', this.renderMenu );
        },

        render : function(){
            this.$el.empty();
            this.collection.each(function(menu){
                this.renderMenu(menu);
            }, this);
            return this;
        },

        renderMenu : function( menu ){
            var view = new window.Views.Menu({ model : menu });
            this.$el.append(view.render().el);
        }

    });
})();
