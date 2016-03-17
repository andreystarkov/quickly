
    function getCompanyDetails(restId, callback){
        $.getJSON(serverUrl+'/api/v2/restaurants/get/'+restId, function(data){
            console.log('getCompanyDetails: ',data);
            callback(data);
        });
    }

    function pasteCompanyDetails(company,callback){
        var output = '<div class="container"><div class="row">'+
                '<div class="col-lg-2 text-center">'+
                    '<div class="logo round" style="background-image:url('+imageBaseUrl+company.restaurant_main_image+')"></div>'+
                    '<div class="title"><h2>'+company.restaurant_name+'</h2><span>'+company.restaurant_info+'</span></div>'+
                '</div>'+
                '<div class="col-lg-10 the-info">'+
                    '<div class="line types">'+
                        '<i class="icon icn-restaurant"></i>'+
                        '<a class="food" href="#">Европейская</a>'+
                        '<a class="food" href="#">Японская</a>'+
                        '<a class="food" href="#">Китайская</a>'+
                    '</div>'+
                    '<div class="line delivery">'+
                        '<i class="icon icn-cab"></i>'+
                        '<div class="box cost">'+
                           ' <span>стоимость</span>'+
                            '<p>'+company.restaurant_delivery_cost+'</p>'+
                        '</div>'+
                        '<div class="box time">'+
                            '<span>среднее время</span>'+
                            '<p>'+company.restaurant_delivery_time+' минут</p>'+
                        '</div>'+
                        '<div class="box min">'+
                            '<span>мин. сумма</span>'+
                            '<p>'+company.restaurant_min_order+' <i class="rouble">Р.</i></p>'+
                        '</div>'+
                        '<div class="box min">'+
                            '<span>средний чек</span>'+
                            '<p>'+company.restaurant_average_check+' <i class="rouble">Р.</i></p>'+
                        '</div>'+
                        '<div class="box pay">'+
                            '<div class="cards">'+
                                '<div class="card-icon mastercard"><img src="images/cards/mastercard.png"></div>'+
                                '<div class="card-icon visa"><img src="images/cards/visa.png"></div>'+
                            '</div>'+
                            '<span>оплата курьеру<br>оплата онлайн</span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="row buttons-line">'+
                '<div class="col-lg-2">'+
                '</div>'+
                '<div class="col-lg-6 buttons-tabs" data-tabs="tabs-shop">'+
                    '<a class="button tab-toggle light" data-tab="tab-comments" href="#tab-comments">'+
                        '<span>Отзывы</span>'+
                    '</a>'+
                    '<a class="button tab-toggle light active" data-tab="tab-food" href="#tab-food">'+
                        '<span>Доставка</span>'+
                    '</a>'+
                    '<a class="button tab-toggle light" data-tab="tab-reservation" href="#tab-reservation">'+
                        '<span>Бронирование</span>'+
                    '</a>'+
                '</div>'+
                '<div class="col-lg-4 buttons-reserv">'+
                    '<a class="button light" href="#">'+
                        '<i class="icon icon-eye"></i>'+
                        '<span>3D тур</span>'+
                    '</a>'+
                    '<a class="button main" href="#">'+
                        '<i class="icon icon-anchor"></i>'+
                        '<span>Забронировать стол</span>'+
                    '</a>'+
                '</div>'+
            '</div>'+
        '</div>';
        callback(output);
        return output;
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
            $.each(data, function(key, item) {
               $.each( item.restaurants, function( index, value ){
                    $('#hellOnEarth').append(pasteCompanyItem(value,theCuisines));
               });
            });
        });
    });
