var video = Backbone.View.extend({

    tagName : 'div',

    className : 'col-xs-6 col-sm-4 col-md-2',

    events : {
        'click a.thumbnail' : 'showVideo'
    },

    template : _.template(this.$('#tpl-video').html()),

    render : function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    showVideo : function(){
        var iframe = '<iframe class="embed-responsive-item" src="'+this.model.attributes.url+'"></iframe>'
        $('#modal-video .modal-title').html(this.model.attributes.title);
        $('#modal-video .modal-body .embed-responsive').html(iframe);
        $('#modal-video').show();
    }

});
window.Views.Video = video;
