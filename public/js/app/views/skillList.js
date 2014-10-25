var skillList = Backbone.View.extend({

    el : '#content-skills',

    initialize : function(){
        this.render();
        this.listenTo( this.collection, 'add', this.renderSkill );
    },

    render : function(){
        this.$el.empty();
        this.collection.each(function(skill){
            this.renderSkill(skill);
        }, this);
    },

    renderSkill : function( skill ){
        var view = new Views.Skill({ model : skill });
        this.$el.append(view.render().el);
    }

});
window.Views.SkillList = skillList;
