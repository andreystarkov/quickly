/*
Получение списка залов ресторана:
GET-запрос на /api/v2/reservation/halls/{restaurantId}
Параметры:
    -*restaurantId – id ресторана

Получение страницы со схемой зала:
GET-запрос на /api/v2/reservation/scheme/{hallId}/{date}
Параметры:
    -*hallId – id зала
    -*date - дата (timestamp)
При тапе на столик, нужно подменить js-функцию sendTableData своей. В ней передается JSON-объект с данными по столику.
Типы столиков: 0 - бесплатный, 1 - платный, 2 - депозитный
*/

var currentCompany = 1;
var hallsUrl = 'http://176.112.201.81/static/hallsCdn/';

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
       // var uniqueList = _.uniq(cartContents, "id");
        uniqueList = cartContents;
        var cartTable = null;

        $.each(uniqueList, function(key, value){
            cartTable += pasteCartElement(value,uniqueCount[value.id]);
            // console.log(value);
        });

        $('.checkout-contents').html(cartTable);

    } else console.log('refreshCart: Cart is empty');
}


function getHallsList(restaurantId, callback){
    $.getJSON(serverUrl+'/api/v2/reservation/halls/'+restaurantId, function(data){
        console.log('getHallsList: ', data)
        callback(data);
    });
}

function showReservationMap(halls){
    $.each(data, function(index,value){
        console.log(value);
    });
}

function getReservationPointsList(hallId, theDate){
    $.getJSON(serverUrl+'/api/v2/reservation/tables/'+hallId+'/'+theDate, function(data){
        console.log('getReservationPointsList: Using Timestamp = ', theDate);
        console.log('getReservationPointsList: ', data);
        $('#roomBox').append(`
            <div class="the-room">
            <img src="${hallsUrl}${data.params.hall.hall_image}"></div>`);
            $.each(data.params.tables, function(index,value){
                $('#roomBox .the-room').append(`
                    <div class="table" id="table-${value.table_id}" data-id="${value.table_id}" data-reserved="${data.params.reservations[value.table_id]}" data-seats="${value.table_seats_count}" data-deposit="${value.table_deposit}" data-price="${value.table_price}" data-restaurant="${value.restaurant_id}" data-hall="${value.hall_id}" style="left:${value.table_coord_x-20}px; top:${value.table_coord_y-20}px">
                        <span>${value.table_number}</span>
                    </div>
                `);
            });
    });
}

$(function() {

    $('#reservationTimePicker').datetimepicker({
        format: 'LT',
        locale: 'ru',
        defaultDate: moment().valueOf()
    });

    $('#reservationDatePicker').datetimepicker({
        format: 'DD-MM-YYYY',
        locale: 'ru',
        defaultDate: moment().valueOf()
    });

    $(document).on('click', '.the-room .table', function(event) {
        $(this).addClass('reserved');
    });

    $(document).on('click', '#buttonReserve', function(event) {
        console.log('#buttonReserve clicked');
        flyToCart($('#buttonReserve'));
        $('.the-room .table.reserved').each(function(){
            jsonObj = {};
            jsonObj['id'] = $(this).data('id');
            jsonObj['name'] = $('section.company-about .title h2').html()+', Стол #'+$('span', this).html();
            jsonObj['price'] = $(this).data('price');
            jsonObj['type'] = 'table';
            theCart.contents.push(jsonObj);
            console.log('addToCart: Table = ', jsonObj);
            console.log('addToCart: theCart = ', theCart);
            setStorage('theCart', theCart.contents);

            refreshCart();
        });
    })

    $(document).on('dp.change', function(e) {
        var dateTime = e.date.format('DD-MM-YY')+' '+e.date.format('HH-MM');
        var theTime = $('#reservationTimePicker').val();
        var dateTime = $('#reservationDatePicker').val()+' '+$('#reservationTimePicker').val();
        var unixTime = moment(dateTime, 'DD-MM-YYYY HH:mm').zone(350).unix();
        getReservationPointsList(currentCompany, unixTime);
    });

    var currentTime = moment().add(30, 'm').unix();

    getReservationPointsList(currentCompany, currentTime);

});
