export function reservationAdded(){
    toastr.success('Заявка на резервацвацию в вашей корзине', 'Стол добавлен');
    swal({
      title:'Стол добавлен в корзину! ',
      text:`Вы можете прикрепить блюда, которые подадут к заказанному столу. Перейдите в меню для выбора блюд. Или продолжите самостоятельно.`,
      type:'success',
      confirmButtonText: 'Перейти в меню',
      cancelButtonText: 'Продолжить',
      showCancelButton: true
    },
    function(isConfirm) {
      if (isConfirm) {
        $('a[href="#tab-food"').click();
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


export function createReservation(){
    var table = getStorage('theReservation');

    if ( table == null ){
        toastr.error('Вы не выбрали ни одного стола на резервацию', 'Стол не выбран!');
    } else {
        var params = {
            token: userToken,
            restaurantId: currentCompany,
            hallId: table.hall,
            phone: $('#checkout-phone').val(),
            tableId: table.id,
            date: table.date
        };

        console.log('createReservation: params = ',params);

        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            url: serverUrl + '/api/v3/reservation/create',
            data: JSON.stringify(params),
            success: function(data) {
                if(!data.err){
                    $('.checkout-cancel').click();
                    console.log('createReservation: Success',   data);
                    reservationSuccess(data);
                } else {
                    console.log('createReservation: ERROR: ', data.err);
                    if(data.err == 'Table already reserved'){
                        toastr.error('Стол уже зарезервирован на это время', 'Ошибка');
                        localStorage.removeItem('theReservation');
                    }
                }
            }
        });
    }
    console.log('createReservation: Table = ', table);

}


