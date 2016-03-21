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

export function createReservation(hallId, tableId, dateTime){
    $.ajax({
        type: 'POST',
        url: serverUrl + '/api/v2/user/register',
        data: {
            token: userToken,
            restaurantId: currentCompany,
            hallId: hallId,
            tableId: tableId,
            date: dateTime
        },
        success: function(data) {
            console.log('createReservation: ', data);
        }
    });
}
