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
            this.$el.find('button.btn-submit').prop('disabled', true);
            var emailValue = $.trim(this.$el.find('#inputEmail').val());
            var messageValue = $.trim(this.$el.find('#textAreaMessage').val());

            if(emailValue && messageValue){

                var message =  new window.Models.Message({ email : emailValue, message : messageValue});
                var alert = new window.Models.Alert({ type : 'warning',message : 'Enviando tu saludo...'});
                var alertView = new window.Views.Alert({ model : alert });

                var xhr = message.save();
                xhr.then(function(success){
                    if(success && success.thanks){
                        alert.set('message',success.thanks);
                        alert.set('type','success');
                    }
                    self.$el.find('#inputEmail').val("");
                    self.$el.find('#textAreaMessage').val("");
                    self.$el.find('button.btn-submit').prop('disabled', false);
                },function(fail){
                    if(fail && fail.error){
                        alert.set('message',fail.error);
                        alert.set('type','error');
                    }
                    self.$el.find('button.btn-submit').prop('disabled', false);
                });
            }else{
                this.$el.find('#inputEmail').val(emailValue);
                this.$el.find('#textAreaMessage').val(messageValue);
                this.$el.find('button.btn-submit').prop('disabled', false);
            }
        }
    });
    window.Views.Footer = footer;
})();
