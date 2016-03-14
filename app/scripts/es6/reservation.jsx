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
/*
function getReservationScheme(hallId, theDate){
    $.getJSON(serverUrl+'/api/v2/reservation/scheme/'+hallId+'')
}*/

function getReservationPointsList(hallId, theDate){
    $.getJSON(serverUrl+'/api/v2/reservation/tables/'+hallId+'/'+theDate, function(data){
        console.log('getReservationPointsList: ', data);
        $('#roomBox').append(`
            <div class="the-room">
            <img src="http://176.112.201.81/static/hallsCdn/${data.params.hall.hall_image}"></div>`);
        $.each(data.params.tables, function(index,value){
            $('#roomBox .the-room').append(`<div class="table" style="left:${value.table_coord_x-20}px; top:${value.table_coord_y-20}px">
            <span>${value.table_id}</span></div>`);
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

    $(document).on('dp.change', function(e) {
        var dateTime = e.date.format('DD-MM-YY')+' '+e.date.format('HH-MM');
        var theTime = $('#reservationTimePicker').val();
       // var theDateTime = moment(theTime).unix();
        var dateTime = $('#reservationDatePicker').val()+' '+$('#reservationTimePicker').val();
        var unixTime = moment(dateTime, 'DD-MM-YYYY HH:mm').zone(350).unix();

        console.log('Unix = ', unixTime, 'WTF = ', unixTime*300*1000);
    });

    getReservationPointsList(1, 1457611949);

});
