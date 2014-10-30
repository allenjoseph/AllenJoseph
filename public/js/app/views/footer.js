(function(){
    Views.Footer =  Backbone.View.extend({

        el : '#content-footer-form',

        events : {
            'submit form' : 'sendMessage'
        },

        template : template('tpl-footer'),

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
            var $email = this.$el.find('#inputEmail');
            var $message = this.$el.find('#textAreaMessage');
            var $submit = this.$el.find('button.btn-submit');


            $submit.prop('disabled', true);
            var emailValue = $.trim($email.val());
            var messageValue = $.trim($message.val());

            if(emailValue && messageValue){

                var message =  new Models.Message({ email : emailValue, message : messageValue});
                var alert = new Models.Alert({ type : 'warning',message : 'Enviando tu saludo...'});
                var alertView = new Views.Alert({ model : alert });

                var xhr = message.save();
                xhr.then(function(success){
                    if(success && success.thanks){
                        alert.set('message',success.thanks);
                        alert.set('type','success');
                    }
                    $email.val("");
                    $message.val("");
                    $submit.prop('disabled', false);
                },function(fail){
                    if(fail && fail.error){
                        alert.set('message',fail.error);
                        alert.set('type','error');
                    }
                    $submit.prop('disabled', false);
                });
            }else{
                $email.val(emailValue);
                $message.val(messageValue);
                $submit.prop('disabled', false);
            }
        }
    });
})();
