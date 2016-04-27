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
      } else {
        toastr.warning('Завершите предидущий заказ', 'Стол не добавлен!');
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
export function createReservation(menu, callback){
    var table = getStorage('theReservation');

    var params = {
        token: userToken,
        restaurantId: table.restaurant,
        hallId: table.hall,
        phone: $('#checkout-phone').val(),
        tableId: table.id,
        date: table.date
    };

    console.log('createReservation: params = ',params);


        if ( table == null ){
            toastr.error('Вы не выбрали ни одного стола на резервацию', 'Стол не выбран!');
        } else {
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
        }


    console.log('createReservation: Table = ', table);

}


