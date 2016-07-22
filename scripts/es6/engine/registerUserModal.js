import {registerUser,sendSMSCode} from '../auth.jsx';
var editProfileField = require('./editProfileField.js');

function registerUserModal(phone, name, params, callback){
    var phone_ = Cookies.get('phone');

    registerUser( phone, function(w){
        swal({
        title: 'Подтверждение',
        html: 'Введите СМС-код, высланный на ваш номер:'+
              '<div class="form-group form-box"><input type="text" class="form-control" id="checkout-register-sms"></div>',
        type: 'success', showCancelButton: false, confirmButtonText: 'Подтвердить', closeOnConfirm: false,
        confirmButtonClass: 'button-sms-confirm'
        }).then(function(isConfirm) {
            if(isConfirm){
            $('.button-sms-confirm').html('Проверка...');
               // console.log('click', isConfirm);
                sendSMSCode(phone, $('#checkout-register-sms').val(), function(dataProfile){
                    if(!dataProfile.err){
                        editProfileField('userName', name, function(data){
                            params.token = Cookies.get('token') || userToken;
                            console.log('Try: ', params, userToken, Cookies.get('token'), dataProfile);
                            swal({
                                title: 'Добро пожаловать, '+name+'!', html: 'Теперь вы можете совершать покупки.',
                                type: 'success', showCancelButton: false, confirmButtonText: 'Продолжить', closeOnConfirm: true
                            }).then(function(isConfirm){
                                console.log('Order params', params);
                                if(callback) callback(params);
                            });
                        });
                    } else {
                        registerUserModal(phone, name, params);
                        toastr.error('СМС-код неверен. Посмотрите внимательней!');
                    }
                });
            } else {
                // close perhaps
            }
        });
    });
}

module.exports = registerUserModal;
