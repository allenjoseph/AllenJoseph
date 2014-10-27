(function(){
    var feedList = Backbone.View.extend({

        el : '#content-feeds',

        initialize : function(){
            this.render();
            this.listenTo( this.collection, 'add', this.renderFeed );
        },

        render : function(){
            this.$el.empty();
            this.collection.each(function(feed){
                this.renderFeed(feed);
                this.renderFeedMini(feed);
            }, this);
            this.$el.slick({dots:true,infinite:false,speed:300,slidesToShow:2,slidesToScroll:2,responsive:[{breakpoint:1024,settings:{slidesToShow:2,slidesToScroll:2,infinite:true,dots:true}},{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]});

        },

        renderFeed : function( feed ){
            var view = new window.Views.Feed({ model : feed });
            this.$el.append(view.render().el);
        },

        renderFeedMini : function( feed ){
            var view = new window.Views.FeedMini({ model : feed });
            $('#content-feeds-mini').append(view.render().el);
        }
    });
    window.Views.FeedList = feedList;
})();
