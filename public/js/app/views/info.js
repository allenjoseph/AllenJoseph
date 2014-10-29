(function(){
    Views.Info = Backbone.View.extend({

        el : '#content-info',

        template : template('tpl-info'),

        initialize : function(){
            $('#section-title label').html(this.model.attributes.title);
            $('#footer-copyright label').html(this.model.attributes.copyright);
            this.render();
        },

        render : function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });
})();
