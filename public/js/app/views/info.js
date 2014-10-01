var info = Backbone.View.extend({

    el : '#content-info',

    template : _.template(this.$('#tpl-info').html()),

    initialize : function(){
        this.render();
    },

    render : function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});
window.Views.Info = info;
