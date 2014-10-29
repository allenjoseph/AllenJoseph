(function(){
    Views.Alert = Backbone.View.extend({

        el: '#alert-box',

        template : template('tpl-alert'),

        events : {
            'click .close' : 'close'
        },

        initialize : function(){
            this.model.on('change', this.render, this)
            this.render();
        },

        render: function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

        close : function(){
            this.$el.hide();
        }

    });
})();
