var skillList = Backbone.View.extend({

    el : '#content-skills',

    initialize : function(){
        this.render();
        this.listenTo( this.collection, 'add', this.renderSkill );
        // this.maxColums = 4;
    },

    render : function(){
        this.$el.empty();
        this.collection.each(function(skill){
            // if(index%this.maxColums === 0){

            // }else if (index%this.maxColums === this.maxColums-1){

            // }else if ()
            this.renderSkill(skill);
        }, this);
    },

    renderSkill : function( skill ){
        var view = new Views.Skill({ model : skill });
        this.$el.append(view.render().el);
    }

});
window.Views.SkillList = skillList;
