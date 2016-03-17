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
            Cookies.set('token', data.result.userToken, { expires: 77777 });

            getUserProfile(data.result.userToken, function(data){
                userInfo = data;
                $('#userBadgeTop').html(
                  '<div class="user-text">'+
                    '<b class="user-name">'+data.userName+' '+data.userSurname+'</b>'+
                    '<a class="r-bonus"><b>20</b> <span class="fa fa-rouble"></span>-бонусов</a>'+
                  '</div>'+
                  '<div class="user-avatar" style="background-image:url('+data.userAvatarUrl+')"></div>'
                );
            });

            callback(data);
          } else {
            console.log('SendSMSCode: error', data);
            callback(data);
          }
        }
    });
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
        showProfile();
    });
}

var buttonRegisterPhone = $('#buttonRegisterPhone'),
    buttonSMSCodeSend = $('#buttonRegisterSMSCode');



$(document).on('click', '#buttonRegisterPhone', function(event) {
    event.preventDefault();

    registerUser( $('#inputRegisterPhone').val(), function(data){
      console.log('registerPhone: callback');

      if (data.err === undefined || data.err  === null) {
            registrationStepTwo();
      } else {
        console.log('registerPhone: error', data);
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
        console.log('sendSMSCode: fine', data);
        registrationStepThree();
      } else {
        createNotice('#buttonRegisterSMSCode', 'Ошибка', 'СМС-код неверен. Посмотрите внимательней!');
      }

   });

});

function userAuthorized(){
    $('.form-code').hide();
    $('.form-register').hide();
    $('#userAuthorizedTop').show();
}

function notAuthorized(){
    $('.form-code').hide();
    $('.form-register').show();
    $('#userAuthorizedTop').hide();
}

function waitingForCode(){
    $('.form-code').show();
    $('.form-register').hide();
    $('#userAuthorizedTop').hide();
}

$(document).on('click', '.control-logout', function(event) {
    event.preventDefault();
    Cookies.remove('token');
    Cookies.remove('phone');
});


