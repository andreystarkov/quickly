
var theCart = {
    contents: []
};

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


function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function setStorage(itemName, theJSON){
    localStorage.setItem(itemName, JSON.stringify(theJSON));
    console.log('setStorage: theJSON = ', theJSON);
    console.log('setStorage: stringify = ', JSON.stringify(theJSON));
    console.log('resSet = '+itemName, localStorage.getItem(itemName));
}

function getStorage(itemName){
    var out = JSON.parse(localStorage.getItem(itemName));
    console.log('getStorage: ', out)
    return out;
}

function pasteCartElement(cartElement){
var el = `
<tr>
    <td>${cartElement.name}</td>
    <td>${cartElement.price} р.</td>
    <td>
        <div class="form-group label-placeholder is-empty">
            <label for="i5p" class="control-label"></label>
            <span class="control-minus">-</span>
            <input type="text" value="1" class="form-control" id="i5p">
            <span class="help-block"></span>
            <span class="material-input"></span>
            <span class="control-plus">+</span>
        </div>
    </td>
    <td>
        <button class="checkout-action"><i class="icon icn-trash"></i></button>
    </td>
</tr>
`;

return el;
}

function refreshCart(){
    var cartPanel = $('#cartBottomPanel');
    var cartContents = theCart.contents;
    if( !isEmpty(cartContents) ){
        $('.checkout-count').html(cartContents.length);
        // transition.perspectiveUpIn
        if(cartPanel.hasClass('cart-empty')){
            cartPanel.removeClass('cart-empty');
            cartPanel.velocity('transition.slideUpBigIn', { duration: 600 });
        }

        $.each(cartContents, function(key, value){
            $('.checkout-contents').append(pasteCartElement(value));
            console.log(value);
        });
    } else console.log('CART empty');
}

$(function() {


    if (localStorage.getItem('theCart') === null) {
        console.log('localStorage: no cart stored');
    } else {
        console.log('Getting Cart Contents..');
        theCart.contents = getStorage('theCart');
    }
    pasteMenu(1);

    $(document).on('click', '.add-to-cart', function(event) {
        jsonObj = {};
        jsonObj['id'] = $(this).data('id');
        jsonObj['name'] = $(this).data('name');
        jsonObj['price'] = $(this).data('price');
        theCart.contents.push(jsonObj);
        console.log('addToCart: theCart = ', theCart);
        setStorage('theCart', theCart.contents);
        refreshCart();
    });

    $(document).on('click', '.checkout-icon', function(event){
        localStorage.removeItem('theCart');
        theCart.contents = [];
        refreshCart();
    });

    refreshCart();
});

