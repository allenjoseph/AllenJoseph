(function(){
    var skill = Backbone.View.extend({

        tagName : 'div',

        className : 'col-md-3',

        template : _.template(this.$('#tpl-skill').html()),

        render : function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });
    window.Views.Skill = skill;
})();
