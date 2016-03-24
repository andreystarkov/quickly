
function templateCartFooter(){
    var totalPrice = 0;
    var totalCount = 0;
    $.each(theCart.contents, function(index, value){
        totalPrice += value.price;
        totalCount++;
    });

    var out = `
        <div class="row">
            <div class="col-lg-8">
                <div class="price-total">
                    <b>Итого</b>: <span>${totalCount}</span> товаров на сумму <span>${totalPrice} <i class="fa fa-rouble"></i></span>
                </div>
            </div>
        </div>
    `;

    return out;
}

function hideCart(){
    $('#cartBottomPanel').velocity('transition.flipYOut', { duration: 600 });
}

export function clearCart(){
    localStorage.removeItem('theCart');
    theCart.contents = [];
    console.log('clearCart: cleared');
    hideCart();
}

export function refreshCart(){
    var cartPanel = $('#cartBottomPanel');
    var cartContents = getStorage('theCart');
    var tables = getStorage('theReservation');

        var foodCount = 0, tablesCount = 0, totalCount;

        if(cartContents !== null) foodCount = cartContents.length;
        if(tables !== null) tablesCount = 1

        totalCount = tablesCount+foodCount;
        if( totalCount == 0 ) {
            console.log('refreshCart: Cart is empty');
            localStorage.removeItem('theCart');
            clearCart();
        } else {
            $('.checkout-total').html(totalCount);

            if(cartPanel.hasClass('cart-empty')){
                cartPanel.removeClass('cart-empty');
                cartPanel.css({'visibility': 'visible', 'height': '40px'}).velocity('transition.slideUpBigIn', { duration: 600 });
            }
            var uniqueList;
            var uniqueCount = _.countBy(cartContents, "id");
            var uniqueList = _.uniq(cartContents, "id");
            var tablesList = _.uniq(tables, "id");

            var cartTable = null;

            var tablesList, foodList;

            if(tables !== null) tablesList += pasteCartTable(tables);

            $.each(uniqueList, function(key, value){
               foodList += pasteCartElement(value,uniqueCount[value.id], key);
            });

            $('.checkout-contents').html(tablesList+foodList);
            $('.checkout-footer').html(templateCartFooter());
        }

}

function pasteCartTable(cartElement, elementCount, key){
    var el = `
    <tr class="reservation-${cartElement.type}" data-id="${cartElement.id}">
        <td>${cartElement.name} </td>
        <td>${cartElement.price} р.</td>
        <td>
            <div class="form-group label-placeholder is-empty" data-id="${cartElement.id}" data-name="${cartElement.name}" data-price="${cartElement.price}">
                <input type="text" value="${cartElement.count}" class="form-control" id="cartItem-${cartElement.id}">
            </div>
        </td>
        <td>
            <button class="checkout-action"><i class="icon icn-trash"></i></button>
        </td>
    </tr>
    `;

    return el;
}

function pasteCartElement(cartElement, elementCount){
    var el = `
    <tr class="reservation-${cartElement.type}" data-id="${cartElement.id}">
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
