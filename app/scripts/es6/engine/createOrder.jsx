import {clearCart} from './checkout.func.jsx';
import {createReservation} from './createReservation.jsx';
import {registerUser,sendSMSCode} from '../auth.jsx';

var editProfileField = require('./editProfileField.js');

function registerUserModal(phone, name, params){
    var phone_ = Cookies.get('phone');

    registerUser( phone, function(w){
        swal({
        title: 'Подтверждение',
        html: 'Введите СМС-код, высланный на ваш номер:'+
              '<div class="form-group form-box"><input type="text" class="form-control" id="checkout-register-sms"></div>',
        type: 'success', showCancelButton: false, confirmButtonText: 'Подтвердить', closeOnConfirm: false,
        confirmButtonClass: 'button-sms-confirm'
        }).then(function(isConfirm) {
            console.log('click', isConfirm);
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
                            postOrder(params, function(data){
                                console.log('Order result', data);
                            });
                        });
                    });
                } else {
                    registerUserModal(phone, name, params);
                    toastr.error('СМС-код неверен. Посмотрите внимательней!');
                }
            });
        });
    });
}

function orderSuccess(data){
    swal({
      title:'Ваш заказ обработан! ',
      text:`В течении нескольких минут вам перезвонит сотрудник ресторана для подтверждения заказа.`,
      type:'success',
      confirmButtonText: 'Продолжить',
      buttonsStyling: 'false',
      animation:'slide-from-top'
    }, function(){
        toastr.success('Посмотреть статус заказа можно в разделе "История"','Заказ принят!');
    });
}

function postOrder(params, callback){
    console.log('postOrder: ', params);
    $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        url: serverUrl + '/api/v3/orders/create',
        data: JSON.stringify(params),
        success: function(data) {
            console.log('postOrder: result: ',data);
            if(!data.err){
                $('.checkout-cancel').click();
                clearCart();
                console.log('createOrder: success: ', data);
                orderSuccess(data);
                if (callback) callback(data);
            } else {
                console.log('createOrder: ERROR: ', data.err);
                toastr.error('Заполните пожалуйста все обязательные поля', 'Недостаточно информации');
            }
        }
    });
}

export function createOrder(callback){
    var cartContents = getStorage('theCart');
    var uniqueList = _.uniq(cartContents, "id");
    var uniqueCount = _.countBy(cartContents, "id");
    var userProfile = getStorage('profile');

    var paymentType = $("input:radio[name=checkout-payment-type]:checked").val(),
        personsCount = $('#checkout-persons').val(),
        street = $('#checkout-street').val() || "Не заполнено",
        building = $('#checkout-building').val() || "111",
        usedBonus = $('#checkout-bonus').val(),
        cash = $('#checkout-cash').val(),
        comment = $('#checkout-comment').val(),
        name = $('#checkout-name').val(),
        phone = $('#checkout-phone').val(),
        porch = $('#checkout-porch').val() || "111",
        floor = $('#checkout-floor').val() || "111",
        apartment = $('#checkout-apartment').val(),
        restaurantId;

    console.log('createOrder: uniqueList = ', uniqueList);
    console.log('createOrder: uniqueCount = ', uniqueCount);
    console.log('createOrder: userProfile = ', userProfile);

    var summary = [];
    var tables = [];

    for(var i = 0; i < uniqueList.length; i++){
        var row = {};
        restaurantId = uniqueList[i].restaurant;
        row['menu_item_id'] = uniqueList[i].id,
        row['menu_item_price'] = uniqueList[i].price,
        row['count'] = uniqueCount[uniqueList[i].id];
        summary.push(row);
    }

    console.log('createOrder: summary = ', summary);

    var params = {
        token: userToken,
        restaurantId: restaurantId,
        menuItems: summary,
        street: street,
        usedBonus: usedBonus,
        porch: porch,
        floor: floor,
        apartment: apartment,
        building: building,
        payment_type: paymentType,
        cash: cash,
        persons_count: parseInt(personsCount),
        comment: comment
    };

    var reservation = getStorage('theReservation');

    if( userToken ) {
        if( reservation ){
            swal({
            title: 'Внимание!',
            text: 'В корзине есть стол на резервацию. Вы можете добавить выбранные вами блюда к заказанному столу. Оформить доставку отдельно?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Да, оформить доставку',
            cancelButtonText: 'Вернуться',
            closeOnConfirm: false
            }).then(function(isConfirm) {
              if (isConfirm) {
                postOrder(params, function(data){
                    if (callback) callback(data);
                });
              }
            });
        } else {
            postOrder(params, function(data){
                if (callback) callback(data);
            });
        }
    } else {
        if(phone && name){
            registerUserModal(phone, name, params);
        } else {
            toastr.error('Вы должны ввести имя и телефон.');
        }
    }

}
