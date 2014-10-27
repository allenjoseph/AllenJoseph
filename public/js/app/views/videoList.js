(function(){
    var videoList = Backbone.View.extend({

        el : '#content-videos',

        initialize : function(){
            this.listenTo( this.collection, 'add', this.renderVideo );
            this.render();
        },

        render : function(){
            this.$el.empty();
            this.collection.each(function(video){
                this.renderVideo(video);
            }, this);
        },

        renderVideo : function( video ){
            var view = new window.Views.Video({ model : video });
            this.$el.append(view.render().el);
        }

    });
    window.Views.VideoList = videoList;
})();
