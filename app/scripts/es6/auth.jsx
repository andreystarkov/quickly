var ProfileEditorActions = require('./react/actions/profileEditorActions.js');
var HistoryActions = require('./react/actions/historyActions.js');

function refreshUserProfle(){
      ProfileEditorActions.fetchList();
      HistoryActions.fetchList();
}

function userAuthorized(){
    $('.form-code').hide();
    $('.form-register').hide();
    $('#userAuthorizedTop').show();
    refreshUserProfle();
}

export function notAuthorized(){
    $('.form-code').hide();
    $('.form-register').show();
    $('#userAuthorizedTop').hide();
    Cookies.remove('token');
    Cookies.remove('phone');
    localStorage.removeItem('profile');
}

function waitingForCode(){
    $('.form-code').show();
    $('.form-register').hide();
    $('#userAuthorizedTop').hide();
}

function registrationStepTwo(){
    easyVelocity('#formRegisterPhone', 'transition.flipXOut', function(){
        easyVelocity('#formRegisterSMSCode', 'transition.flipXIn');
    });
}

function registrationStepThree(){
   // refreshUserProfile();
    easyVelocity('#formRegisterSMSCode', 'transition.flipXOut', function(){
        easyVelocity('#userAuthorizedTop', 'transition.flipXIn');
        refreshUserProfle()
    });
}

function registerUser(phone, callback) {
    console.log('registerUser: phone = ' + phone);
    $.ajax({
        type: 'POST',
        url: serverUrl + '/api/v2/user/register',
        data: {
            'phone': phone
        },
        success: function(data) {
            Cookies.set('phone', phone);
            console.log('registerUser: ', data);
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
            console.log('SendSMSCode: success', data);
            Cookies.set('token', data.result.userToken, { expires: 99999999 });
            getUserProfile(data.result.userToken, function(data){
                $('#userBadgeTop').html(
                  '<div class="user-text">'+
                    '<b class="user-name">'+data.userName+' '+data.userSurname+'</b>'+
                    '<a class="r-bonus"><b>20</b> <span class="fa fa-rouble"></span>-бонусов</a>'+
                  '</div>'+
                  '<div class="user-avatar" style="background-image:url('+data.userAvatarUrl+')"></div>'
                );
                refreshUserProfle();
            });
            callback(data);
          } else {
            console.log('SendSMSCode: error', data);
            callback(data);
          }
        }
    });
}

var buttonRegisterPhone = $('#buttonRegisterPhone'),
    buttonSMSCodeSend = $('#buttonRegisterSMSCode');

$(function() {

    $('#inputRegisterPhone').mask("+7 (999) 999-9999");

    if (userToken === undefined || userToken  === null) {
        if(userPhone){
            waitingForCode();
        } else notAuthorized();
    } else {
        userAuthorized();
    }

    $(document).on('click', '#buttonRegisterPhone', function(event) {
        event.preventDefault();
        registerUser( $('#inputRegisterPhone').val(), function(data){
          if (data.err === undefined || data.err  === null) {
                registrationStepTwo();
          } else {
            console.log('registerPhone: error', data);
            createNotice('#formRegisterPhone', 'Ошибка', 'Введите корректный номер телефона в формате 79619478823');
          }
       });
    });

    $(document).on('click', '.control-logout', function(event) {
        event.preventDefault();
        notAuthorized();
    });

    $(document).on('click', '#buttonRegisterSMSCode', function(event) {
        event.preventDefault();
        var userPhone = Cookies.get('phone'),
            userCode = $('#inputRegisterSMSCode').val();
        sendSMSCode(userPhone, userCode, function(data){
          if (data.err === undefined || data.err  === null) {
            registrationStepThree();
          } else createNotice('#buttonRegisterSMSCode', 'Ошибка', 'СМС-код неверен. Посмотрите внимательней!');
       });
    });

});


