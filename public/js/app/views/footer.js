var footer =  Backbone.View.extend({

    el : '#content-footer-form',

    events : {
        'submit form' : 'sendMessage'
    },

    template : _.template($('#tpl-footer').html()),

    initialize : function(){
        this.render();
    },

    render : function(){
        this.$el.html(this.template({}));
        return this;
    },

    sendMessage : function(e){
        e.preventDefault();
        var emailValue = $.trim(this.$el.find('#inputEmail').val());
        var messageValue = $.trim(this.$el.find('#textAreaMessage').val());
        if(emailValue && messageValue){
            var message =  new Models.Message({ email : emailValue, message : messageValue});
            message.save();
            this.$el.find('#inputEmail').val("");
            this.$el.find('#textAreaMessage').val("");
            this.renderSuccessAlert("Gracias por dejar su saludo! :)");
        }else{
            this.$el.find('#inputEmail').val(emailValue);
            this.$el.find('#textAreaMessage').val(messageValue);
        }
    },

    renderSuccessAlert : function(message){
        var alertTemplate = _.template($('#tpl-success-alert').html());
        $('#alert-box').html(alertTemplate({ message : message}));
    }
});
window.Views.Footer = footer;
