(function(){
    Views.Skill = Backbone.View.extend({

        tagName : 'div',

        className : 'col-md-3',

        template : template('tpl-skill'),

        render : function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });
})();
