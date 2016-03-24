
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

export function clearCart(){
    localStorage.removeItem('theCart');
    theCart.contents = [];
    console.log('clearCart: cleared');
    $('#cartBottomPanel').addClass('cart-empty');
    $('#cartBottomPanel').velocity('transition.flipYOut', { duration: 600 });
    refreshCart();
}

export function refreshCart(){
    var cartPanel = $('#cartBottomPanel');
    var cartContents = theCart.contents;
    var tables = getStorage('theReservation');
    if( !isEmpty(cartContents) && !isEmpty(tables) ){
        console.log('refreshCart: call');
        $('.checkout-total').html(cartContents.length+tables.length);

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

        console.log('refreshCart: tables = ', tables);

        $.each(tables, function(key, value){
            console.log('refreshCart: table = ', value);
            tablesList += pasteCartTable(value);
        });

        $.each(uniqueList, function(key, value){

            if ( value.type == "table" ) tables += pasteCartElement(value,uniqueCount[value.id])
                else foodList += pasteCartElement(value,uniqueCount[value.id]);
               // console.log('tablesList = ', tables);
              //  console.log('foodList = ', foodList);
        });

        $('.checkout-contents').html(tablesList+foodList);
        $('.checkout-footer').html(templateCartFooter());
    } else console.log('refreshCart: Cart is empty');
}

function pasteCartTable(cartElement, elementCount){
var el = `
<tr class="reservation-${cartElement.type}">
    <td>${cartElement.name}</td>
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
