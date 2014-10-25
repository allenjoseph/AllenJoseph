var sectionList = Backbone.View.extend({

    el : '#content-sections',

    initialize : function(){
        this.listenTo( this.collection, 'add', this.renderSection );
        this.render();
    },

    renderSection : function(section){
        var view = new Views.Section({ model : section });
        this.$el.append(view.render().el);

        if( section.attributes.articles &&
            section.attributes.articles.length > 0){
            app.collections.videos = new Collections.Videos(section.attributes.articles);
            app.views.VideoList = new Views.VideoList({collection : app.collections.videos});
        }
    },

    render : function(){
        this.collection.each(function(section){
            this.renderSection(section);
        }, this);
    }
});
window.Views.SectionList = sectionList;
