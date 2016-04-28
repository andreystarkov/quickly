import {clearCart} from './checkout.func.jsx';
var registerUserModal = require('./registerUserModal.js');

export function reservationAdded(){
    toastr.success('Заявка на резервацвацию в вашей корзине', 'Стол добавлен');
    swal({
      title:'Стол добавлен в корзину! ',
      text:`Вы можете прикрепить блюда, которые подадут к заказанному столу. Перейдите в меню для выбора блюд. Или продолжите самостоятельно.`,
      type:'success',
      confirmButtonText: 'Перейти в меню',
      cancelButtonText: 'Продолжить',
      showCancelButton: true
    }).then(function(isConfirm) {
      if (isConfirm) {
        $('.button-tab-food').click();
      }
    });
}

function reservationSuccess(){
    localStorage.removeItem('theReservation');
    swal({
      title:'Стол забронирован! ',
      text:`В течении нескольких минут вам перезвонит сотрудник ресторана для подтверждения. Статус вашего заказа смотрите в разделе "История"`,
      type:'success',
      confirmButtonText: 'Продолжить',

      animation:'slide-from-top'
    }, function(){
        toastr.success('Стол успешно забронирован!');
    });

}

function postReservation(params, callback){
    $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        url: serverUrl + '/api/v3/reservation/create',
        data: JSON.stringify(params),
        success: function(data) {
            if (callback) callback(data);
        }
    });
}
export function createReservation(callback){
    var table = getStorage('theReservation');

    var params = {
        token: userToken || Cookies.get('token'),
        restaurantId: table.restaurant,
        hallId: table.hall,
        phone: $('#checkout-phone').val(),
        tableId: table.id,
        date: table.date
    };

    var name_ = $('#checkout-name').val();

    console.log('createReservation: params = ',params);

        if ( table == null ){
            toastr.error('Вы не выбрали ни одного стола на резервацию', 'Стол не выбран!');
        } else {
            if( params.token ){
              postReservation(params, function(data){
                  if(!data.err){
                      $('.checkout-cancel').click();
                      console.log('createReservation: Success',   data);
                      reservationSuccess(data);
                  } else {
                      console.log('createReservation: ERROR: ', data.err);
                      if (callback) callback(data.err);
                      if(data.err == 'Table already reserved'){
                          toastr.error('Стол уже зарезервирован на это время', 'Ошибка');
                          localStorage.removeItem('theReservation');
                      }
                  }
              });
            } else {
              if( params.phone && name_){
                registerUserModal(params.phone, name_, params, function(data_){
                    console.log('createReservation: weha', data_);
                    postReservation(params, function(data){
                        clearCart();
                        if(!data.err){
                            $('.checkout-cancel').click();
                            console.log('createReservation: Success',   data);
                            reservationSuccess(data);
                        } else {
                            console.log('createReservation: ERROR: ', data.err);
                            if (callback) callback(data.err);
                            if(data.err == 'Table already reserved'){
                                toastr.error('Стол уже зарезервирован на это время', 'Ошибка');
                                localStorage.removeItem('theReservation');
                            }
                        }
                    });
                });
              } else toastr.error('Введите имя и номер телефона!');
            }

        }


    console.log('createReservation: Table = ', table);

}


