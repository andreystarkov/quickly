
    function getCompanyDetails(restId, callback){
        $.getJSON(serverUrl+'/api/v2/restaurants/get/'+restId, function(data){
            console.log('getCompanyDetails: ',data);
            callback(data);
        });
    }

    function pasteCompanyItem(that, cuisines){
        var out = '<section class="as-u-wish">'+
            '<div class="row" style="margin-bottom:30px;">'+
                '<div class="col-lg-4">'+
                    '<div class="image-thumb">'+
                        '<img src="http://176.112.201.81/static/cdn/'+that.restaurant_main_image+'">'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-8">'+
                    '<h2>'+that.restaurant_name+' <a href="#" class="like-me"><i class="fa fa-heart"></i></a></h2>'+
                    '<span class="text-line">'+
                        '<i>Расстояние:</i> <span>4,4 км</span>'+
                    '</span>'+
                        '<span class="text-line">'+
                        '<i>Кухня:</i> <span>Итальянская / Европейская, Японская / Китайская</span>'+
                    '</span>'+
                   '<div class="row bt-line">'+
                        '<div class="col-lg-8">'+
                            '<div class="payment-ccards">'+
                                '<img src="images/samples/cc.png">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-lg-4 likes">'+
                            '<a href="#" class="like">'+
                                '<i class="fa fa-thumbs-up"></i>'+
                            '</a>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="row btm-line">'+
               '<div class="col-lg-3 kal">'+
                    '<div class="box-info">'+
                        '<b>'+that.restaurant_min_order+' Р</b>'+
                        '<span>мин.сумма заказа</span>'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-3 kal">'+
                    '<div class="box-info">'+
                        '<b>'+that.restaurant_delivery_cost+'</b>'+
                        '<span>стоимость доставки</span>'+
                    '</div>'+
                '</div>'+

                '<div class="col-lg-3 kal">'+
                    '<div class="box-info">'+
                        '<b>'+that.restaurant_delivery_time+' минут</b>'+
                        '<span>среднее время доставки</span>'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-3 kal">'+
                    '<div class="box-info">'+
                        '<b>'+that.restaurant_average_check+' Р</b>'+
                        '<span>средний чек</span>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</section>';
        return out;
    }

    $.getJSON(serverUrl+'/api/v2/cuisines/get', function(data) {
        theCuisines = data.result.cuisines;
        $.getJSON(serverUrl+'/api/v2/restaurants/get?restaurantType=3', function(data) {
            console.log(data);
            $.each(data, function(key, item) {
               $.each( item.restaurants, function( index, value ){
                    $('#hellOnEarth').append(pasteCompanyItem(value,theCuisines));
               });
            });
        });
    });
