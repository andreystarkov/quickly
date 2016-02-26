// someday

$(function() {

        $.ajax( {
            type: 'GET',
            datatype: 'jsonp',
            data: {},
            crossDomain: 'true',
            url: "http://176.112.201.81/api/v2/restaurants/get?restaurantType=3",
            error: function(textStatus, errorThrown) {
                console.log(textStatus+' :(( '+errorThrown);
            },
            success: function(msg) {
                console.log(msg);
            }
        });
/*    $.getJSON('http://176.112.201.81/api/v2/restaurants/get?restaurantType=3', { get_param: 'result' }, function(data) {
        console.log(data);
        $.each(data, function(index, element) {
            $('#section-list').append(element);
            console.log(index+' - '+element);
        });
    });*/
});