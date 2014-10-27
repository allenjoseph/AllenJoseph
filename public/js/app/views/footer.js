(function(){
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

            var self = this;
            var emailValue = $.trim(this.$el.find('#inputEmail').val());
            var messageValue = $.trim(this.$el.find('#textAreaMessage').val());

            if(emailValue && messageValue){

                this.renderWarningAlert('Enviando tu saludo...');

                var message =  new window.Models.Message({ email : emailValue, message : messageValue});
                var xhr = message.save();
                xhr.then(function(success){
                    if(success && success.thanks){
                        self.renderSuccessAlert(success.thanks);
                    }
                    self.$el.find('#inputEmail').val("");
                    self.$el.find('#textAreaMessage').val("");
                },function(fail){
                    if(fail && fail.error){
                        self.renderErrorAlert(fail.error);
                    }
                });
            }else{
                this.$el.find('#inputEmail').val(emailValue);
                this.$el.find('#textAreaMessage').val(messageValue);
            }
        },

        renderWarningAlert : function(message){
            var alertTemplate = _.template($('#tpl-alert').html());
            $('#alert-box').html(alertTemplate({ type : 'warning', message : message}));
        },

        renderSuccessAlert : function(message){
            var alertTemplate = _.template($('#tpl-alert').html());
            $('#alert-box').html(alertTemplate({ type : 'success', message : message}));
        },

        renderErrorAlert : function(message){
            var alertTemplate = _.template($('#tpl-alert').html());
            $('#alert-box').html(alertTemplate({ type : 'error', message : message}));
        }
    });
    window.Views.Footer = footer;
})();
