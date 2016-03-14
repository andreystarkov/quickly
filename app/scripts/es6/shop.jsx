
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
    var out = `
    <div class="checkout-form">
        <div class="form-group label-floating is-empty">
            <label for="checkout-name" class="control-label">Ваше имя</label>
            <input type="text" class="form-control" id="checkout-name">
        </div>
        <div class="form-group label-floating is-empty">
            <label for="checkout-phone" class="control-label">Телефон</label>
            <input type="text" class="form-control" id="checkout-phone">
        </div>
        <div class="form-group label-floating is-empty" style="margin-top:30px">
            <label for="checkout-comment" class="control-label">Комментарий</label>
            <input type="search" class="form-control" id="checkout-comment">
        </div>
        <div class="row">
            <div class="col-lg-6">
                <div class="button main">Оформить доставку</div>
            </div>
            <div class="col-lg-6">
                <div class="button main">В счет бронирования</div>
            </div>
        </div>
    </div>
    `;
    return out;
}

function refreshCart(){
    var cartPanel = $('#cartBottomPanel');
    var cartContents = theCart.contents;
    if( !isEmpty(cartContents) ){
        $('.checkout-total').html(cartContents.length);
        // transition.perspectiveUpIn
        if(cartPanel.hasClass('cart-empty')){
            cartPanel.removeClass('cart-empty');
            cartPanel.velocity('transition.slideUpBigIn', { duration: 600 });
        }
        var uniqueCount = _.countBy(cartContents, "id");
     //   var uniqueList = _.uniq(cartContents, "id");
        uniqueList = cartContents;
        var cartTable = null;

        $.each(uniqueList, function(key, value){
            cartTable += pasteCartElement(value,uniqueCount[value.id]);
            // console.log(value);
        });

        $('.checkout-contents').html(cartTable);

    } else console.log('refreshCart: Cart is empty');
}


$(function() {

    if (localStorage.getItem('theCart') === null) {
        console.log('localStorage: no cart stored');
    } else {
        console.log('Getting Cart Contents..');
        theCart.contents = getStorage('theCart');
    }
    pasteMenu(1);
    $('#checkoutForm').html(pasteCheckoutFormUnregistered());
    $(document).on('click', '.add-to-cart', function(event) {
        jsonObj = {};
        jsonObj['id'] = $(this).data('id');
        jsonObj['name'] = $(this).data('name');
        jsonObj['price'] = $(this).data('price');
        jsonObj['type'] = 'food';
        theCart.contents.push(jsonObj);
        console.log('addToCart: theCart = ', theCart);
        setStorage('theCart', theCart.contents);

        flyToCart($(this).parent().parent().find("img").eq(0));
        refreshCart();
    });

    $(document).on('click', '.checkout .control-plus', function(event) {
        jsonObj = {};
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
        localStorage.removeItem('theCart');
        theCart.contents = [];
        refreshCart();
    });

    $(document).on('click', '.category-toggle', function(event) {
        event.preventDefault();
        $('.category-line a').removeClass('active');
        $(this).addClass('active');
        pasteMenu($(this).attr('data-category'));
    });

    refreshCart();
});

