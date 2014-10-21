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
        var emailValue = $.trim(this.$el.find('form input[name="email"]').val());
        var messageValue = $.trim(this.$el.find('form textarea[name="message"]').val());
        if(emailValue && messageValue){
            var message =  new Models.Message({ email : emailValue, message : messageValue});
            message.save();
        }else{
            this.$el.find('form input[name="email"]').val(email);
            this.$el.find('form textarea[name="message"]').val(message);
        }
    }
});
window.Views.Footer = footer;
