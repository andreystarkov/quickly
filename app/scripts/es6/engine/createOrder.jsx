import {clearCart} from './checkout.func.jsx';
import {createReservation} from './createReservation.jsx';

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

    if( reservation ){
        swal({
          title: 'Внимание!',
          text: 'В корзине есть блюда и стол на резервацию. Вы можете добавить выбранные вами блюда к заказанному столу. Оформить доставку отдельно?',
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
    }

    console.log('createOrder: params = ', params);

}
