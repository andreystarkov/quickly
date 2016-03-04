
    function getCuisinesList(callback){
      var result = null;
      console.log('getCuisines: init');
      $.getJSON(serverUrl+'/api/v2/cuisines/get', function(data){
        cuisinesList = data;
        console.log(data);
        callback(data);
      });
    }

    function pasteMenu(categoryId){
        $.getJSON(serverUrl+'/api/v2/menu-items/get/'+categoryId, function(data){
            $('#foodItems').html('');
            $.each(data.result.menuItems, function(key, item){
                if( item.menu_item_image == ""){
                    item.menu_item_image = "images/samples/9-tiny.jpg";
                } else item.menu_item_image = "http://176.112.201.81/static/cdn/"+item.menu_item_image;

                var output = '<div class="col-lg-4 col-xs-6 food-item"><a href="#">'+
                '<img src="'+item.menu_item_image+'" alt="..." />'+
                '<div class="overlay"><div class="price"><i class="icon icon-basket"></i>'+
                '<span>'+item.menu_item_price+' <i class="rouble">a</i></span></div></div></a>'+
                '<b>'+item.menu_item_name+'</b></div>';
                $('#foodItems').append(output);
            });
        });
    }

    function pasteCategories(restId){
        $.getJSON(serverUrl+'/api/v2/categories/get/'+restId, function(data){
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
        $.getJSON(serverUrl+'/api/v2/comments/get/'+restId, function(data){
            var imageUrl = data.imagesBaseUrl;
        //    console.log(data);
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

    $(document).on('click', '.category-toggle', function(event) {
        event.preventDefault();
        $('.category-line a').removeClass('active');
        $(this).addClass('active');
        pasteMenu($(this).attr('data-category'));
    });
