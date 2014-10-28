(function(){
    var alert = Backbone.View.extend({

        el: '#alert-box',

        template : _.template(this.$('#tpl-alert').html()),

        events : {
            'click .close' : 'close'
        },

        initialize : function(){
            var self = this;
            this.model.on('change', function(){
                self.render();
            })
            this.render();
        },

        render: function(){
            this.$el.html(this.template(this.model.attributes));
        },

        close : function(){
            this.$el.hide();
        }

    });
    window.Views.Alert = alert;
})();
