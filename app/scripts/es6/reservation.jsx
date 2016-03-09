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
    console.log('getHallsList: init');
    $.getJSON(serverUrl+'/api/v2/reservation/halls/'+restaurantId, function(data){
        console.log('getHallsList: complete')
        console.log(data);
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
        console.log(data);
        $('#roomBox').append(`
            <div class="the-room">
            <img src="http://176.112.201.81/static/hallsCdn/${data.params.hall.hall_image}"></div>`);
        $.each(data.params.tables, function(index,value){
            $('#roomBox .the-room').append(`<div class="table" style="left:${value.table_coord_x-20}px; top:${value.table_coord_y-20}px">
            <span>${value.table_id}</span></div>`);
        });



    });
}
/*                    <div class="point reserved" id="point-1" style="left:75px; top:65px;"></div>
                    <div class="point free" style="left:180px; top: 65px;" id="point-2"></div>
                    <div class="point free" id="point-3" style="left:285px; top: 65px;"></div>
                    <div class="point disabled" id="point-3" style="left:390px; top: 65px;"></div>
                    <div class="point free" id="point-3" style="left:495px; top: 65px;"></div>
                    <div class="point disabled" id="point-3" style="left:602px; top: 65px;"></div>*/
$(function() {
    getReservationPointsList(1, 1457611949);
/*    getHallsList(1, function(data){
        var halls = data.result.halls;
        var imageBase = data.result.imagesBaseUrl;
        var roomClass = "the-room active";
        $.each(halls, function(index,value){
            if(index > 0){
                roomClass = "the-room";
            }
            var out = `
                <div class="${roomClass}">
                    <img src="${imageBase+value.hall_image}">
                </div>
            `;
            getReservationPointsList(1, 1457611949);
            $('#roomBox').append(out);
            console.log(value);
            console.log(out)
        });
    });*/
});