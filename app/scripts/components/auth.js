function registerUser(phone, callback) {
    console.log('phone = ' + phone);
    $.ajax({
        type: 'POST',
        url: serverUrl + '/api/v2/user/register',
        data: {
            'phone': phone
        },
        success: function(data) {
            Cookies.set('phone', phone);
            console.log('registerUser: success');
            callback(data);
        }
    });
}

function sendSMSCode(phone, code, callback) {
    console.log('SendSMSCode: phone = ' + phone);
    console.log('SendSMSCode: code = ' + code);
    $.ajax({
        type: 'POST',
        url: serverUrl + '/api/v2/user/auth',
        data: {
            'phone': phone,
            'code': code
        },
        success: function(data) {
          if (data.err === undefined || data.err  === null) {
            console.log('SendSMSCode: success');
            Cookies.set('token', data.result.userToken);
            callback(data);
          } else {
            console.log('SendSMSCode: error');
            console.log(data);
          }
        }
    });
}

var buttonRegisterPhone = $('#buttonRegisterPhone'),
    buttonSMSCodeSend = $('#buttonRegisterSMSCode');

$(function() {
    $('#formRegisterSMSCode').hide();
    $('#formRegisterPhone').show();
    $('#userBadgeTop').hide();
});

$(document).on('click', '#buttonRegisterPhone', function(event) {
    event.preventDefault();
    registerUser( $('#inputRegisterPhone').val(), function(data){
      console.log('registerPhone: callback');
      if (data.err === undefined || data.err  === null) {
        easyVelocity('#formRegisterPhone', 'transition.flipXOut', function(){
            console.log('callback');
            easyVelocity('#formRegisterSMSCode', 'transition.flipXIn');
        });
      } else {
        console.log('registerPhone: error');
        console.log(data);
        createNotice('#formRegisterPhone', 'Ошибка', 'Введите корректный номер телефона в формате 79619478823');
      }
   });
});

$(document).on('click', '#buttonRegisterSMSCode', function(event) {
    event.preventDefault();
    var userPhone = Cookies.get('phone'),
        userCode = $('#inputRegisterSMSCode').val();
    sendSMSCode(userPhone, userCode, function(data){
      console.log('sendSMSCode: callback');
      if (data.err === undefined || data.err  === null) {
        console.log('sendSMSCode: fine');
        $('#formRegisterSMSCode').velocity("transition.flipXOut", {
            duration: 300,
            complete: function() {
                console.log('sendSMSCode: animated');
                $('#userBadgeTop').velocity("transition.flipXIn", {
                    duration: 200
                });
            }
        });
      }
   });
});


function userAuthorized(){
    $('.form-code').hide();
    $('.form-register').hide();
    $('.mini-profile').show();
    $('.user-top').show();
}

function notAuthorized(){
    $('.form-code').hide();
    $('.form-register').show();
    $('.mini-profile').hide();
}

function waitingForCode(){
    $('.form-code').show();
    $('.form-register').hide();
    $('.mini-profile').hide();
}

$(document).on('click', '.control-logout', function(event) {
    event.preventDefault();
    Cookies.remove('token');
    Cookies.remove('phone');
});


