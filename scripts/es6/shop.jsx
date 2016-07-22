import {clearCart,refreshCart} from './engine/checkout.func.jsx';
import {createOrder} from './engine/createOrder.jsx';
import {Reservation} from './react/components/reservation.js';

var _ = require('underscore');
var registerUserModal = require('./engine/registerUserModal.js');


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

    return `
   <div class="checkout-form checkout-first-fields">
        <div class="control-group">
            <div class="row">
                <div class="col-lg-5 col-xs-4">
                    <div class="form-group label-floating">
                        <label for="checkout-name" class="control-label">Ваше имя *</label>
                        <input type="text" class="form-control" id="checkout-name" value=${userName} >
                    </div>
                </div>
                <div class="col-lg-5 col-xs-5">
                    <div class="form-group label-floating required">
                        <label for="checkout-phone" class="control-label">Телефон *</label>
                        <input type="text" class="form-control" id="checkout-phone" value=${userPhone} >
                    </div>
                </div>
                <div class="col-lg-2 col-xs-3">
                    <div class="form-group label-floating required">
                        <label for="checkout-persons" class="control-label" value="1">Персон *</label>
                        <input value="1" type="search" class="form-control" id="checkout-persons" >
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
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

    $(document).on('click', '#buttonCheckoutCancel', function(event){
        clearCart();
    });

    $(document).on('click', '#buttonCreateOrder', function(event){
        createOrder();
    });

    $(document).on('click', '#buttonCheckoutDelivery', function(event){
      var phone = $('#checkout-phone').val(), persons = $('#checkout-persons').val(), name = $('#checkout-name').val();
      if( phone && persons && name ){
          if( $('.checkout-step-two').hasClass('active') ){
            // lol
            } else {
                $('.checkout-step').removeClass('active');
                $('.checkout-step-two').addClass('active');
                $('.checkout-step-two').velocity('transition.flipXIn', function(){
                    $('.checkout-step').attr('style', '');
                });
            }
      } else {
        if( !phone ) $('#checkout-phone').parent().velocity('callout.shake');
        if( !persons ) $('#checkout-persons').parent().velocity('callout.shake');
        if( !name ) $('#checkout-name').parent().velocity('callout.shake');
        toastr.error('Введите номер телефона, ваше имя и количество персон!');
      }

    });

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

    // this is bullshit


    $(document).on('click', '.button-tab-reservation', function(){
        console.log('something happens');
        setTimeout(function(){
            $('.btn-select-hall:first-child').click();
        },100);
    });

    refreshCart();

});

/*        setTimeout(function(){
            $('.btn-select-hall:first-child').click();

            $('.table').each(function(){
                var originalWidth = $('.the-room').data('width');
                var originalHeight = $('.the-room').data('height');

                var scaledWidth = $('.room-image').width();
                var scaledHeight = $('.room-image').height();

                if( !(originalWidth == scaledWidth) ){
                    console.log('SDAS: ', originalWidth, originalHeight, scaledWidth, scaledHeight);
                    var originalLeft = $(this).data('x');
                    var originalTop = $(this).data('y');

                    console.log('leftop: ', originalLeft, originalTop);

                    var scaledCoords = {
                      left: $(this).css('left') * scaledWidth / originalWidth - 10,
                      top: $(this).css('top') * scaledHeight / originalHeight - 10
                    };
                    console.log('.table: ', scaledCoords);

                    $(this).css({
                        left: scaledCoords.left,
                        top: scaledCoords.top
                    });
                }
            });
            },1200);*/

     //   console.log('ow', width, height, scaledWidth, scaledHeight);