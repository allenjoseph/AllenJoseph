(function(){
    Views.Section = Backbone.View.extend({

        tagName : 'div',

        className : 'row section-box',

        template : template('tpl-section'),

        render : function(){
            this.$el.html(this.template(this.model.attributes));
            this.$el.attr('id', this.model.attributes.id);
            return this;
        }
    });
})();
