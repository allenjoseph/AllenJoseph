var footer =  Backbone.View.extend({

    el : '#content-footer-form',

    events : {
        'submit form' : 'sendMessage'
    },

    template : _.template(this.$('#tpl-footer').html()),

    initialize : function(){
        this.render();
    },

    render : function(){
        this.$el.html(this.template({}));
        return this;
    },

    sendMessage : function(e){
        e.preventDefault();
        var email = $.trim(this.$el.find('form input[name="email"]').val());
        var message = $.trim(this.$el.find('form textarea[name="message"]').val());
        var msg = { email : email, message : message};
        var message =  new Models.Message(msg);
    }
});
window.Views.Footer = footer;
