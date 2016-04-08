import {clearCart,refreshCart} from "./engine/checkout.func.jsx";

function pasteCartElement(cartElement, elementCount){
    var el = `
    <tr class="reservation-${cartElement.type}">
        <td>${cartElement.name}</td>
        <td>${cartElement.price} р.</td>
        <td>
            <div class="form-group label-placeholder is-empty" data-id="${cartElement.id}" data-name="${cartElement.name}" data-price="${cartElement.price}">
                <span class="control-minus" data-id="cartItem-${cartElement.id}">-</span>
                <input type="text" value="${elementCount}" class="form-control" id="cartItem-${cartElement.id}">
                <span class="control-plus" data-id="cartItem-${cartElement.id}">+</span>
            </div>
        </td>
        <td>
            <button class="checkout-action"><i class="icon icn-trash"></i></button>
        </td>
    </tr>
    `;
    return el;
}

function pasteCheckoutFormUnregistered(){
    var profile = getStorage('profile');
    var bonusCount = '100';
    var userName = '', userPhone = '';
    if(profile){
        if(profile.userName) userName = profile.userName;
        if(profile.userPhone) userPhone = profile.userPhone;
    }
    var out = `
    <div class="checkout-form">
        <div class="control-group">
            <div class="row">
                <div class="col-lg-6 col-xs-6">
                    <div class="form-group label-floating required">
                        <label for="checkout-name" class="control-label">Ваше имя</label>
                        <input type="text" class="form-control" id="checkout-name" value=${userName}>
                    </div>
                </div>
                <div class="col-lg-6 col-xs-6">
                    <div class="form-group label-floating required">
                        <label for="checkout-phone" class="control-label">Телефон</label>
                        <input type="text" class="form-control" id="checkout-phone" value="${userPhone}">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-xs-4">
                    <div class="form-group label-floating required">
                        <label for="checkout-street" class="control-label">Улица</label>
                        <input type="text" class="form-control" id="checkout-street">
                    </div>
                </div>
                <div class="col-lg-2 col-xs-2">
                    <div class="form-group label-floating required">
                        <label for="checkout-building" class="control-label">Дом</label>
                        <input type="text" class="form-control" id="checkout-building">
                    </div>
                </div>
                <div class="col-lg-2 col-xs-2">
                    <div class="form-group label-floating required">
                        <label for="checkout-apartment" class="control-label">Квартира</label>
                        <input type="text" class="form-control" id="checkout-apartment">
                    </div>
                </div>
                <div class="col-lg-2 col-xs-2">
                    <div class="form-group label-floating">
                        <label for="checkout-porch" class="control-label">Подьезд</label>
                        <input type="text" class="form-control" id="checkout-porch">
                    </div>
                </div>
                <div class="col-lg-2 col-xs-2">
                    <div class="form-group label-floating">
                        <label for="checkout-floor" class="control-label">Этаж</label>
                        <input type="text" class="form-control" id="checkout-floor">
                    </div>
                </div>
            </div>
        </div>
        <div class="control-group">
            <div class="row radio-box">
                <div class="col-lg-6">
                    <div class="the-label">
                        <span>Способ оплаты</span>
                    </div>
                    <div class="form-group radio-group">
                        <div class="radio radio-primary">
                            <label>
                              <input type="radio" class="checkout-payment-type" name="checkout-payment-type" id="checkout-payment-type-cash" value="0" checked>
                              <span class="circle"></span><span class="check"></span>
                              Наличными
                            </label>
                        </div>
                        <div class="radio radio-primary">
                            <label>
                              <input type="radio" class="checkout-payment-type" name="checkout-payment-type" id="checkout-payment-type-card-courier" value="1">
                              <span class="circle"></span><span class="check"></span>
                              По карте курьеру
                            </label>
                        </div>
                        <div class="radio radio-primary" class="display:none">
                            <label>
                              <input type="radio" class="checkout-payment-type" name="checkout-payment-type" id="checkout-payment-type-card" value="2">
                              <span class="circle"></span><span class="check"></span>
                              По карте онлайн
                            </label>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group label-floating">
                        <label for="checkout-phone" class="control-label">Сколько наличными?</label>
                        <input type="text" class="form-control" id="checkout-cash">
                    </div>
                    <div class="form-group label-floating">
                        <label for="checkout-phone" class="control-label">Сколько <span class="fa fa-rouble"></span>-бонусов использовать?</label>
                        <input type="text" class="form-control" id="checkout-bonus">
                        <div class="bonus-count">
                            У вас есть ${bonusCount} <span class="fa fa-rouble"></span>-бонусов
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="control-group">
            <div class="row">
                <div class="col-lg-4">
                    <div class="form-group label-floating required" style="margin-top:30px">
                        <label for="checkout-persons" class="control-label" value="1">Количество персон</label>
                        <input type="search" class="form-control" id="checkout-persons">
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="form-group label-floating" style="margin-top:30px">
                        <label for="checkout-comment" class="control-label">Комментарий</label>
                        <input type="search" class="form-control" id="checkout-comment">
                    </div>
                </div>
            </div>

        </div>
        <div class="checkout-buttons">
            <div class="row">
                <div class="col-lg-6 col-xs-6">
                    <div class="button main" id="buttonCheckoutDelivery">оформить доставку</div>
                </div>
                <div class="col-lg-6 col-xs-6">
                    <div class="button main" id="buttonCheckoutReservation">Забронировать стол</div>
                </div>
            </div>
        </div>
    </div>
    `;
    return out;
}

function removeItemById(itemId){
    var cart = getStorage('theCart');
    console.log('removeItemById: before = ',cart);
    cart = _.without(cart, _.findWhere(cart, {id: itemId}));
    console.log('removeItemById: after = ',cart);
    setStorage('theCart', cart);
    theCart.contents = cart;
    refreshCart();
}

$(function() {

    if (localStorage.getItem('theCart') === null) {
        console.log('localStorage: no cart stored');
    } else {
        console.log('Getting Cart Contents..');
        theCart.contents = getStorage('theCart');
    }

    $('#checkoutForm').html(pasteCheckoutFormUnregistered());

    function addToCart(obj, clicked){
        Cookies.set( 'shop', obj['restaurant'] );
        theCart.contents.push(obj);
        console.log('addToCart: theCart = ', theCart);
        console.log('addToCart: Pushing = ', obj);
        setStorage('theCart', theCart.contents);
        flyToCart( clicked.parent().parent().find("img").eq(0) );
        toastr.success(`${obj.name}, ${obj.price} р.`);
        refreshCart();
    }

    $(document).on('click', '.add-to-cart', function(event) {
        var jsonObj = {};
        var button = $(this);
        var currentShop = Cookies.get('shop');
        var thisShop = button.data('restaurant');

        jsonObj['id'] = button.data('id');
        jsonObj['name'] = button.data('name');
        jsonObj['price'] = button.data('price');
        jsonObj['restaurant'] = button.data('restaurant');

        var is = _.where(theCart.contents, {restaurant: thisShop});
        var one;

        $.each( is, function(the, index){
            one = is;
        });

        var first;

        if( theCart.contents.length > 0 ) first = theCart.contents[0];

        console.log('ISSS = ', one, first);

        if( currentShop ){

            console.log('Current Shop: '+currentShop);
            console.log('This Shop: '+thisShop);

            if( thisShop == currentShop ){
                addToCart( jsonObj, button );
            } else {
                swal({
                  title: 'Внимание!', type: 'warning',
                  text: 'В корзину нельзя положить позиции из разных ресторанов. Удалить позиции другого ресторана?',
                  confirmButtonText: 'Да, удалить!', cancelButtonText: 'Нет, продолжить',
                  showCancelButton: true, closeOnConfirm: true, closeOnCancel: true
                },
                function(isConfirm) {
                  if (isConfirm === true) {
                    console.log('Old Shop = ', Cookies.get('shop'));
                    console.log('New Shop = ', thisShop);
                    clearCart(function(){
                        Cookies.set('shop', thisShop);
                        console.log('Callback ClearCart: ',thisShop, jsonObj);
                        addToCart(jsonObj, button);
                    });
                  }
                });

            }

        } else {
            Cookies.set('shop', thisShop);
            console.log('Add to cart: First blood');
            addToCart( jsonObj, button );
        }

    });

    $(document).on('click', '.reservation-food .checkout-action', function(e){
        var theItem = $(this).parent().parent();
        var theId = theItem.data('id');
        removeItemById(theId);
        theItem.velocity({opacity:0}, 500, function(){
            setTimeout(function(){
               $('.reservation-table').remove();
            },500)
        });
    });

    $(document).on('click', '.checkout .control-plus', function(event) {
        var jsonObj = {};
        jsonObj['id'] = $(this).parent().data('id');
        jsonObj['name'] = $(this).parent().data('name');
        jsonObj['price'] = $(this).parent().data('price');
        jsonObj['type'] = 'food';
        theCart.contents.push(jsonObj);
        setStorage('theCart', theCart.contents);
        refreshCart();
    });

    $(document).on('click', '.checkout .control-minus', function(event) {
        var theId = $(this).parents('tr:first').data('id');
        removeItemById(theId);
    });

    $(document).on('click', '.checkout-icon', function(event){
        clearCart();
    });

    $(document).on('click', '.category-toggle', function(event) {
        event.preventDefault();
        $('.category-toggle').removeClass('active');
        $(this).addClass('active');
    });

    refreshCart();
});
