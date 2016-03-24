export function reservationAdded(){
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


export function createReservation(){
    var tables = getStorage('theReservation');
    $.each(tables, function(key, table){
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
                    console.log('createReservation: Success',data);
                    reservationAdded(data);
                } else {
                    console.log('createReservation: ERROR: ', data.err);
                 //   toastr.error('Заполните пожалуйста все обязательные поля', 'Недостаточно информации');
                }
            }
        });
    });

    console.log('createReservation: Tables = ', tables);

}


