import {clearCart,refreshCart} from "./engine/checkout.func.jsx";
var _ = require('underscore');

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
    var reservationToggle;
    var profile = getStorage('profile');
    var bonusCount = '100';
    var userName = '', userPhone = '';
    if(profile){
        if(profile.userName) userName = profile.userName;
        if(profile.userPhone) userPhone = profile.userPhone;
    }

    var reservation = getStorage('theReservation');

    if( isEmptyObj(reservation) ) {
        reservationToggle = "disabled=true";
    } else reservationToggle = "disabled=false";

    var out = `
    <div class="checkout-form">
        <div class="control-group">
            <div class="row">
                <div class="col-lg-5 col-xs-6">
                    <div class="form-group label-floating required">
                        <label for="checkout-name" class="control-label">Ваше имя <b class="required-mark">*</b></label>
                        <input type="text" class="form-control" id="checkout-name" value=${userName}>
                    </div>
                </div>
                <div class="col-lg-4 col-xs-6">
                    <div class="form-group label-floating required">
                        <label for="checkout-phone" class="control-label">Телефон <b class="required-mark">*</b></label>
                        <input type="text" class="form-control" id="checkout-phone" value="${userPhone}">
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group label-floating required">
                        <label for="checkout-persons" class="control-label" value="1">Персон <b class="required-mark">*</b></label>
                        <input value="1" type="search" class="form-control" id="checkout-persons">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-xs-4">
                    <div class="form-group label-floating">
                        <label for="checkout-street" class="control-label">Улица</label>
                        <input type="text" class="form-control" id="checkout-street">
                    </div>
                </div>
                <div class="col-lg-2 col-xs-2">
                    <div class="form-group label-floating">
                        <label for="checkout-building" class="control-label">Дом</label>
                        <input type="text" class="form-control" id="checkout-building">
                    </div>
                </div>
                <div class="col-lg-2 col-xs-2">
                    <div class="form-group label-floating">
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
                        <div class="radio radio-primary">
                            <label>
                              <input disabled type="radio" class="checkout-payment-type" name="checkout-payment-type" id="checkout-payment-type-card" value="2">
                              <span class="circle"></span><span class="check"></span>
                              По карте онлайн
                            </label>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group label-floating">
                                <label for="checkout-phone" class="control-label">Сдача с</label>
                                <input type="text" class="form-control" id="checkout-cash">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group label-floating">
                                <label for="checkout-phone" class="control-label"><span class="rub"><strike>P</strike></span>-бонусов?</label>
                                <input type="text" class="form-control" id="checkout-bonus" value="0">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group label-floating" style="margin-top:30px">
                                <label for="checkout-comment" class="control-label">Комментарий</label>
                                <input type="search" class="form-control" id="checkout-comment">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="checkout-buttons">
            <div class="row">
                <div class="col-lg-6 col-xs-6">
                    <button class="button main" id="buttonCheckoutDelivery">Доставка</button>
                </div>
                <div class="col-lg-6 col-xs-6" style=>
                    <button class="button main" id="buttonCheckoutReservation">Бронирование</button>
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
        flyToCart( clicked.parent().parent() );
        toastr.success(`${obj.name}, ${obj.price} р.`);
        refreshCart();
    }

    $(document).on('click', '.add-to-cart', function(event) {
        var jsonObj = {};
        var button = $(this);
        var thisShop = button.data('restaurant');
        jsonObj['id'] = button.data('id');
        jsonObj['name'] = button.data('name');
        jsonObj['price'] = button.data('price');
        jsonObj['restaurant'] = button.data('restaurant');
        jsonObj['type'] = 'food';
        console.log('Trying to find id# '+thisShop);

        var currentShop, first;

        var is = _.where(theCart.contents, {restaurant: thisShop});

        if(theCart.contents[0]) {
            currentShop = theCart.contents[0].restaurant;
            console.log('Current Shop = '+currentShop);
            console.log('This Shop = '+thisShop);
            if( thisShop == currentShop ){
                console.log('Same restaurant!', thisShop, currentShop);
                addToCart( jsonObj, button );
            } else {
                swal({
                  title: 'Внимание!', type: 'warning',
                  text: 'В корзину нельзя положить позиции из разных ресторанов. Удалить позиции другого ресторана?',
                  confirmButtonText: 'Да, удалить!', cancelButtonText: 'Нет, продолжить',
                  showCancelButton: true, closeOnConfirm: false, closeOnCancel: true
                }).then(function(isConfirm) {
                  console.log('Clear Button Clicked', isConfirm);
                  if (isConfirm) {
                    clearCart(function(){
                        swal({
                          title: 'Козрзина обновлена!',
                          text: 'Вы начали покупки в текущем ресторане. Выбранный вами товар будет добавлен в новую корзину.',
                          type: 'success', confirmButtonText: 'Продолжить',
                        }).then(function(isConfirm){
                            addToCart(jsonObj, button);
                            console.log('Cart Cleared, Adding new item.');
                        });
                    });
                  }
                });
            }
        } else {
            console.log('Cart is empty! First blood!');
            addToCart(jsonObj, button);
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
