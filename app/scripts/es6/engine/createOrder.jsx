import {clearCart} from './checkout.func.jsx';

function orderSuccess(){
    swal({
      title:'Ваш заказ обработан! ',
      text:`В течении нескольких минут вам перезвонит сотрудник ресторана для подтверждения заказа.`,
      type:'success',
      confirmButtonText: 'Продолжить',
      cancelButtonText: 'Закрыть окно',
      confirmButtonColor: '#fff036',
      animation:'slide-from-top'
    });
}

export function createOrder(callback){
    var cartContents = getStorage('theCart');
    var uniqueList = _.uniq(cartContents, "id");
    var uniqueCount = _.countBy(cartContents, "id");
    var userProfile = getStorage('profile');

    var paymentType = $('.checkout-payment-type').val(),
        personsCount = $('#checkout-persons').val(),
        street = $('#checkout-street').val(),
        building = $('#checkout-building').val(),
        usedBonus = $('#checkout-bonus').val(),
        cash = $('#checkout-cash').val(),
        comment = $('#checkout-comment').val(),
        phone = $('#checkout-phone').val(),
        porch = $('#checkout-porch').val(),
        floor = $('#checkout-floor').val(),
        apartment = $('#checkout-apartment').val(),
        restaurauntId = currentCompany;

    console.log('createOrder: uniqueList = ', uniqueList);
    console.log('createOrder: uniqueCount = ', uniqueCount);
    console.log('createOrder: userProfile = ', userProfile);

    var summary = [];

    for(i = 0; i < uniqueList.length; i++){
        var row = {};

        if ( uniqueList[i].type == 'food'){
            row['menu_item_id'] = uniqueList[i].id,
            row['menu_item_price'] = uniqueList[i].price,
            row['count'] = uniqueCount[uniqueList[i].id];
            summary.push(row);
        }
    }

    console.log('createOrder: summary = ', summary);

    var params = {
        token: userToken,
        restaurantId: currentCompany,
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

    console.log('createOrder: params = ', params);

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
                orderSuccess(data);
                if (callback) callback(data);
            } else {
                console.log('createOrder: ERROR: ', data.err);
                toastr.error('Заполните пожалуйста все обязательные поля', 'Недостаточно информации');
            }
        }
    });
}
