import {clearCart,refreshCart} from "./engine/checkout.func.jsx";

function pasteMenu(categoryId){
    $.getJSON(serverUrl+'/api/v2/menu-items/get/'+categoryId, function(data){
        $('#foodItems').html('');
        console.log(data);
        $.each(data.result.menuItems, function(key, item){
            if( item.menu_item_image == ""){
                item.menu_item_image = "images/samples/9-tiny.jpg";
            } else item.menu_item_image = "http://176.112.201.81/static/cdn/"+item.menu_item_image;

            var output = `
                <div class="col-lg-4 col-xs-6 food-item">
                    <a href="#">
                        <div class="product-image">
                            <img src="${item.menu_item_image}" />
                            <div class="product-controls">
                                <button class="button main add-to-cart"
                                data-name="${item.menu_item_name}"
                                data-price="${item.menu_item_price}"
                                data-id="${item.menu_item_id}">В корзину</button>
                            </div>
                        </div>

                        <div class="product-info">
                            <div class="major">
                                <div class="product-name">
                                    <b>${item.menu_item_name}</b>
                                </div>
                                <div class="product-price">
                                    <span>${item.menu_item_price} <i class="rouble">i</i></span>
                                </div>
                            </div>
                            <div class="product-description">
                                <span>${item.menu_item_full_description}</span>
                            </div>
                        </div>
                    </a>
                </div>`;
            $('#foodItems').append(output);
        });
    });
}

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
    var out = `
    <div class="checkout-form">
        <div class="control-group">
            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group label-floating required">
                        <label for="checkout-name" class="control-label">Ваше имя</label>
                        <input type="text" class="form-control" id="checkout-name" value=${profile.userName}>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group label-floating required">
                        <label for="checkout-phone" class="control-label">Телефон</label>
                        <input type="text" class="form-control" id="checkout-phone" value="${profile.userPhone}">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4">
                    <div class="form-group label-floating required">
                        <label for="checkout-street" class="control-label">Улица</label>
                        <input type="text" class="form-control" id="checkout-street">
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group label-floating required">
                        <label for="checkout-building" class="control-label">Дом</label>
                        <input type="text" class="form-control" id="checkout-building">
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group label-floating required">
                        <label for="checkout-apartment" class="control-label">Квартира</label>
                        <input type="text" class="form-control" id="checkout-apartment">
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="form-group label-floating">
                        <label for="checkout-porch" class="control-label">Подьезд</label>
                        <input type="text" class="form-control" id="checkout-porch">
                    </div>
                </div>
                <div class="col-lg-2">
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
                        <label for="checkout-phone" class="control-label">Сколько у вас наличными?</label>
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
                <div class="col-lg-6">
                    <div class="button main" id="buttonCheckoutDelivery">Оформить доставку</div>
                </div>
                <div class="col-lg-6">
                    <div class="button main" id="buttonCheckoutReservation">В счет бронирования</div>
                </div>
            </div>
        </div>
    </div>
    `;
    return out;
}


$(function() {

    if (localStorage.getItem('theCart') === null) {
        console.log('localStorage: no cart stored');
    } else {
        console.log('Getting Cart Contents..');
        theCart.contents = getStorage('theCart');
    }

    pasteMenu(currentCompany);

    $('#checkoutForm').html(pasteCheckoutFormUnregistered());

    $('.required input').validate();

    $(document).on('click', '.add-to-cart', function(event) {
        var jsonObj = {};
        jsonObj['id'] = $(this).data('id');
        jsonObj['name'] = $(this).data('name');
        jsonObj['price'] = $(this).data('price');
        jsonObj['type'] = 'food';
        theCart.contents.push(jsonObj);
        console.log('addToCart: theCart = ', theCart);
        setStorage('theCart', theCart.contents);

        flyToCart($(this).parent().parent().find("img").eq(0));
        toastr.success(`${jsonObj.name}, ${jsonObj.price}) р.`);
        refreshCart();
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
        var cart = theCart.contents;
        var id = $(this).parent().data('id');
        //var index = theCart.contents.indexOf(id);
        var inThe = _.without(cart,id);
        //console.log('INTHE', inThe, id);
    });

    $(document).on('click', '.checkout-icon', function(event){
        clearCart();
    });

    $(document).on('click', '.category-toggle', function(event) {
        event.preventDefault();
        $('.category-line a').removeClass('active');
        $(this).addClass('active');
        pasteMenu($(this).attr('data-category'));
    });

    refreshCart();
});

