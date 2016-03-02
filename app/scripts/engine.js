// someday

$(function() {

    function getCuisine(theId, theCuisines){
        var result = null;
          //  console.log(data);
            var cuis = theCuisines;
            $.each(cuis, function(key, item) {
             //   console.log(item.cuisine_id);
                if(item.cuisine_id == theId) {
                   // console.log('equal');
                        result = item;
                    }
            });
       // console.log(result);
        return result;
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

    function pasteCategories(restId){
        $.getJSON('http://176.112.201.81/api/v2/categories/get/'+restId, function(data){
            $.each(data.result.categories, function(key, item) {
             //   console.log(item);
                var kal = '<li class="category-line"><a href="#'+item.category_id+'" class="category-toggle" data-category="'+item.category_id+'">'
                +'<i class="icon"></i>'+item.category_name+'</a></li>';
          //      console.log(kal);
                $('#theMenu').append(kal);
            });
        });
    }

    function pasteComments(restId){
        $.getJSON('http://176.112.201.81/api/v2/comments/get/'+restId, function(data){
            var imageUrl = data.imagesBaseUrl;
            console.log(data);
            $.each(data.result.comments, function(key, item){
              var stars = "";
              for(i = 0; i < item.comment_rating; i++){
                stars = stars+'<i class="star yes fa fa-star"></i>';
              }
              for (i = 0; i < (5-item.comment_rating); i++){
                stars = stars+'<i class="star yes fa fa-star-o"></i>';
              }
              $('#theComments').append(
                  '<div class="comment row">'+
                  '<div class="col-lg-2 col-xs-2 align-center">'+
                  '<div class="avatar"><img src="http://176.112.201.81/static/cdn/'+item.user_avatar+'" alt="..."></div>'+
                  '<div class="likes"><a href="#" class="like"><i class="fa-thumbs-o-up fa"></i>'+
                  '<span class="count">'+item.comment_likes+'</span></a></div></div>'+
                  '<div class="text col-lg-10 col-xs-10">'+
                  '<b>'+item.user_name+
                  '<span class="stars">'+stars+'</span></b>'+
                  '<p>'+item.comment_text+'</p>'+
                 '</div></div>'
                );
            });
        });
    }

    function pasteMenu(categoryId){

        $.getJSON('http://176.112.201.81/api/v2/menu-items/get/'+categoryId, function(data){
         //   $('#foodItems').removeClass('animated fadeInLeft').addClass('animated fadeOutLeft');
            console.log(data);
            $('#foodItems').html('');
            $.each(data.result.menuItems, function(key, item){
           //     console.log(item);
                if( item.menu_item_image == ""){
                    item.menu_item_image = "images/samples/9-tiny.jpg";
                } else item.menu_item_image = "http://176.112.201.81/static/cdn/"+item.menu_item_image;

                var output = '<div class="col-lg-4 col-xs-6 food-item"><a href="#">'+
                '<img src="'+item.menu_item_image+'" alt="..." />'+
                '<div class="overlay"><div class="price"><i class="icon icon-basket"></i>'+
                '<span>'+item.menu_item_price+' <i class="rouble">a</i></span></div></div></a>'+
                '<b>'+item.menu_item_name+'</b></div>';
           //     console.log(output);
                $('#foodItems').append(output);
            });
        //    $('#foodItems').removeClass('animated fadeOutLeft').addCLass('animated fadeInLeft');
        });
    }

    function getRestDetails(restId){
        $.getJSON('http://176.112.201.81/api/v2/restaurants/get/'+restId, function(data){
            console.log(data);
        });
    }

    function registerUser(phone){
        console.log('hey');
        $.ajax({
          type: "POST",
          url: "http://176.112.201.81/api/v2/user/auth",
          data: {
            "phone": phone
          },
          success: function(data){
            console.log('success');
            console.log(data);
          }
        });
    }

    var theCuisines;

    pasteCategories(1);
    pasteMenu(1);
    pasteComments(1);
    getRestDetails(1);

    $(document).on('click', '.category-toggle', function(event) {
        event.preventDefault();
        $('.category-line a').removeClass('active');
        $(this).addClass('active');
        pasteMenu($(this).attr('data-category'));
    });

    $(document).on('click', '.the-comments .comment .likes .like', function(event) {
        event.preventDefault();
        $('.category-line a').removeClass('active');
        $(this).addClass('active');
        pasteMenu($(this).attr('data-category'));
    });

    $(document).on('click', '#buttonRegister', function(event) {
        event.preventDefault();
        console.log($('registration-phone').val());
        registerUser($('registration-phone').val());
    });

    $.getJSON('http://176.112.201.81/api/v2/cuisines/get', function(data) {
        theCuisines = data.result.cuisines;
        $.getJSON('http://176.112.201.81/api/v2/restaurants/get?restaurantType=3', function(data) {
            $.each(data, function(key, item) {
               $.each( item.restaurants, function( index, value ){
                    $('#hellOnEarth').append(pasteCompanyItem(value,theCuisines));
               });
            });
        });
    });

    console.log(theCuisines);



});