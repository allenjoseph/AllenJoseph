(function(){
    var section = Backbone.View.extend({

        tagName : 'div',

        className : 'row section-box',

        template : _.template(this.$('#tpl-section').html()),

        render : function(){
            this.$el.html(this.template(this.model.attributes));
            this.$el.attr('id', this.model.attributes.id);
            return this;
        }
    });
    window.Views.Section = section;
})();
