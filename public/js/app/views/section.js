var section = Backbone.View.extend({

    tagName : 'div',

    className : 'row',

    template : _.template(this.$('#tpl-section').html()),

    render : function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});
window.Views.Section = section;
