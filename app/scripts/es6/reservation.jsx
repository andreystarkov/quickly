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
Создание брони:
POST-запрос на /api/v2/reservation/create
Параметры:
    -*token – токен, полученный при авторизации
    -*restaurantId – id ресторана
    -*hallId – id зала
    -*tableId – id столика
    -*date – дата бронирования (timestamp)

Создание заказа:
POST-запрос на /api/v2/orders/create
Параметры:
    -*token – токен, полученный при авторизации
    -*restaurantId – id ресторана
    -*menuItems – массив объектов блюд, вида:
        {menu_item_id: id, menu_item_price: price, count: count}
    -*usedBonus – количество использованных при заказе бонусов
    -*street – улица
    -*building – дом
    -porch – подъезд
    -floor – этаж
    -apartment – квартира
    -*payment_type – тип платежа (0-наличные, 1-картой курьеру)
    -cash – наличные (со скольки потребуется сдача)
    -*persons_count – количество персон
    - comment – комментарий к заказу
//

*/

var currentCompany = 1;
var hallsUrl = 'http://176.112.201.81/static/hallsCdn/';

function createOrder(token, restaurauntId, menuItems, usedBonus, street, usedBonus, street, building, paymentType. cash, person_count, comment){
    $.ajax({
        type: 'POST',
        url: serverUrl + '/api/v2/user/register',
        data: {
            token: token,
            restaurauntId: restaurauntId, menuItems: menuItems, usedBonus: usedBonus, street: street, usedBonus: usedBonus, street: street, building: building, paymentType: paymentType, cash: cash, person_count: person_count, comment: comment
        },
        success: function(data) {
            console.log('createOrder: ', data);
        }
    });
}
function createReservation(hallId, tableId, dateTime){
    $.ajax({
        type: 'POST',
        url: serverUrl + '/api/v2/user/register',
        data: {
            token: userToken,
            restaurantId: currentCompany,
            hallId: hallId,
            tableId: tableId,
            date: dateTime
        },
        success: function(data) {
            console.log('createReservation: ', data);
        }
    });
}

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

                if( value.table_type == 0 ) tableType = `
                    <div class="type">Беплатный</div>
                    `;

                if( value.table_type == 1 ) tableType = `
                    <div class="type">Платный</div>
                    <div class="price">Стоимость заказа: <b></b></div>>
                    `;

                if( value.table_type == 2 ) tableType = `
                    <div class="type">Депозитный</dive>
                    <div class="price">Стоимость депозита: <b>${table_deposit}</b></div>;
                    `;

                var theOptions;
                for(i = 1; i <= value.table_seats_count; i++){
                    theOptions += '<option>'+i+'</option>';
                }

                $('#roomBox .the-room').append(`

                    <div class="table" id="table-${value.table_id}" data-id="${value.table_id}" data-reserved="${data.params.reservations[value.table_id]}" data-seats="${value.table_seats_count}" data-deposit="${value.table_deposit}" data-price="${value.table_price}" data-restaurant="${value.restaurant_id}" data-hall="${value.hall_id}" style="left:${value.table_coord_x-10}px; top:${value.table_coord_y-20}px">
                        <div class="table-number">${value.table_number}</div>
                            <div class="table-everything">
                                <div class="table-desc">
                                    ${tableType}
                                    <span>Мест: ${value.table_seats_count}</span>
                                </div>
                                <div class="form-group label-static" style="margin-top:35px">
                                    <label for="tableOption-${value.table_id}" class="control-label">На сколько человек?</label>
                                    <select id="tableOption-${value.table_id}" data-object="table-${value.table_id}" class="form-control">
                                      ${theOptions}
                                    </select>
                                    <button class="button main round" style="width:100%; margin-top:10px;">Забронировать</button>
                                </div>
                            </div>
                    </div>
                `);


/*                $('#table-'+value.table_id).popover({
                    trigger: 'manual',
                    placement: 'bottom',
                    animate:false,
                    html: true,
                    content: `
                        <select id="tableOption-${value.table_id}" data-object="table-${value.table_id}" class="form-control">
                          ${theOptions}
                        </select>
                        <button class=""></button>
                    `,
                    title: 'Выберите количество',
                    show: function(){

                        $(this).animate({opacity:1});
                    }
                }).on("mouseenter", function () {
                    var _this = this;
                    $(this).popover("show");
                    $(".popover").on("mouseleave", function () {
                        $(_this).popover('hide');
                    });
                }).on("mouseleave", function () {
                    var _this = this;
                    setTimeout(function () {
                        if (!$(".popover:hover").length) {
                            $(_this).popover("hide");
                        }
                    }, 300);
                });*/
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

    $(document).on('click', '.the-room .table .table-number', function(event) {
        $(this).parent().toggleClass('reserved');

        // $( '.table-everything', $(this).parent() ).velocity({translateX:0, translateY:0, scale:1, opacity:1});
/*        createPopover($(this), 'Выберите количество мест', `
         <select id="select111" class="form-control">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        `);*/
    });

    $(document).on('click', '.reserved .button', function(event) {
        console.log('#buttonReserve clicked');
        flyToCart( $(this) );
        // unction createNotice(targetObject, noticeTitle, noticeText)
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

        $('.reserved').removeClass('reserved');
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
