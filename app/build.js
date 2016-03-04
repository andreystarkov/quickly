(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global variables */

var cuisinesList;
var isAuth;

var userSMSCode = Cookies.get('code');
var userToken = Cookies.get('token');
var userPhone = Cookies.get('phone');
var serverUrl = 'http://176.112.201.81';
var imageBaseUrl = 'http://176.112.201.81/static/cdn';

if (userToken !== undefined) {
    isAuth = 1;
}

},{}],2:[function(require,module,exports){
function registerUser(phone, callback) {
    console.log('phone = ' + phone);
    $.ajax({
        type: 'POST',
        url: serverUrl + '/api/v2/user/register',
        data: {
            'phone': phone
        },
        success: function (data) {
            Cookies.set('phone', phone);
            console.log('registerUser: success');
            callback(data);
        }
    });
}

function sendSMSCode(phone, code, callback) {
    console.log('SendSMSCode: phone = ' + phone);
    console.log('SendSMSCode: code = ' + code);
    $.ajax({
        type: 'POST',
        url: serverUrl + '/api/v2/user/auth',
        data: {
            'phone': phone,
            'code': code
        },
        success: function (data) {
            if (data.err === undefined || data.err === null) {
                console.log('SendSMSCode: success');
                Cookies.set('token', data.result.userToken);
                callback(data);
            } else {
                console.log('SendSMSCode: error');
                console.log(data);
            }
        }
    });
}

function registrationStepTwo() {
    easyVelocity('#formRegisterPhone', 'transition.flipXOut', function () {
        easyVelocity('#formRegisterSMSCode', 'transition.flipXIn');
    });
}

function registrationStepThree() {
    easyVelocity('#formRegisterSMSCode', 'transition.flipXOut', function () {
        easyVelocity('#userAuthorizedTop', 'transition.flipXIn');
    });
}

var buttonRegisterPhone = $('#buttonRegisterPhone'),
    buttonSMSCodeSend = $('#buttonRegisterSMSCode');

$(function () {
    $('#formRegisterSMSCode').hide();
    $('#formRegisterPhone').show();
    $('#userBadgeTop').hide();
});

$(document).on('click', '#buttonRegisterPhone', function (event) {
    event.preventDefault();

    registerUser($('#inputRegisterPhone').val(), function (data) {
        console.log('registerPhone: callback');

        if (data.err === undefined || data.err === null) {
            registrationStepTwo();
        } else {
            console.log('registerPhone: error');console.log(data);
            createNotice('#formRegisterPhone', 'Ошибка', 'Введите корректный номер телефона в формате 79619478823');
        }
    });
});

$(document).on('click', '#buttonRegisterSMSCode', function (event) {

    event.preventDefault();

    var userPhone = Cookies.get('phone'),
        userCode = $('#inputRegisterSMSCode').val();

    sendSMSCode(userPhone, userCode, function (data) {
        console.log('sendSMSCode: callback');

        if (data.err === undefined || data.err === null) {
            console.log('sendSMSCode: fine');
            registrationStepThree();
        }
    });
});

function userAuthorized() {
    $('.form-code').hide();
    $('.form-register').hide();
    $('.mini-profile').show();
    $('.user-top').show();
}

function notAuthorized() {
    $('.form-code').hide();
    $('.form-register').show();
    $('.mini-profile').hide();
}

function waitingForCode() {
    $('.form-code').show();
    $('.form-register').hide();
    $('.mini-profile').hide();
}

$(document).on('click', '.control-logout', function (event) {
    event.preventDefault();
    Cookies.remove('token');
    Cookies.remove('phone');
});

},{}],3:[function(require,module,exports){
(function () {
    [].slice.call(document.querySelectorAll('.checkout')).forEach(function (el) {
        var openCtrl = el.querySelector('.checkout-button'),
            closeCtrl = el.querySelector('.checkout-cancel'),
            closeMenuCtrl = el.querySelector('.button-close');

        openCtrl.addEventListener('click', function (ev) {
            ev.preventDefault();
            classie.add(el, 'checkout-active');
            $('.overlay').addClass('visible');
        });

        closeCtrl.addEventListener('click', function () {
            classie.remove(el, 'checkout-active');
            $('.overlay').removeClass('visible');
        });
    });
})();

},{}],4:[function(require,module,exports){
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function removeHoverCSSRule() {
  if ('createTouch' in document) {
    try {
      var ignore = /:hover/;
      for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];
        if (!sheet.cssRules) {
          continue;
        }
        for (var j = sheet.cssRules.length - 1; j >= 0; j--) {
          var rule = sheet.cssRules[j];
          if (rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText)) {
            sheet.deleteRule(j);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

function easyVelocity(element, animationType, callback) {
  $(element).velocity(animationType, {
    duration: 200, complete: callback
  });
}

function createNotice(targetObject, noticeTitle, noticeText) {
  var obj = $(targetObject);
  obj.popover({
    animation: true,
    trigger: 'manual',
    placement: 'bottom',
    content: noticeText,
    title: noticeTitle
  });
  obj.on('show.bs.popover', function (e) {
    var $pop = $(this);
    setTimeout(function () {
      $pop.popover('hide');
    }, 3000);
  });
  obj.popover('show');
  return obj;
}

function appendEach(obj, what) {
  $(obj).each(function () {
    $(this).append(what);
  });
}

function aniMagic(obj, aniClass) {
  $(obj).addClass('magictime ' + aniClass);
}

function animateThis(obj, aniClass) {
  $(obj).addClass('animated ' + aniClass);
}

},{}],5:[function(require,module,exports){

function getCompanyDetails(restId, callback) {
    console.log('getCompanyDetails: init');
    $.getJSON(serverUrl + '/api/v2/restaurants/get/' + restId, function (data) {
        console.log('getCompanyDetails: success');
        console.log(data);
        callback(data);
    });
}

function pasteCompanyDetails(company, callback) {
    var output = '<div class="container"><div class="row">' + '<div class="col-lg-2 text-center">' + '<div class="logo round" style="background-image:url(' + imageBaseUrl + company.restaurant_main_image + ')"></div>' + '<div class="title"><h2>' + company.restaurant_name + '</h2><span>' + company.restaurant_info + '</span></div>' + '</div>' + '<div class="col-lg-10 the-info">' + '<div class="line types">' + '<i class="icon icn-restaurant"></i>' + '<a class="food" href="#">Европейская</a>' + '<a class="food" href="#">Японская</a>' + '<a class="food" href="#">Китайская</a>' + '</div>' + '<div class="line delivery">' + '<i class="icon icn-cab"></i>' + '<div class="box cost">' + ' <span>стоимость</span>' + '<p>' + company.restaurant_delivery_cost + '</p>' + '</div>' + '<div class="box time">' + '<span>среднее время</span>' + '<p>' + company.restaurant_delivery_time + ' минут</p>' + '</div>' + '<div class="box min">' + '<span>мин. сумма</span>' + '<p>' + company.restaurant_min_order + ' <i class="rouble">Р.</i></p>' + '</div>' + '<div class="box min">' + '<span>средний чек</span>' + '<p>' + company.restaurant_average_check + ' <i class="rouble">Р.</i></p>' + '</div>' + '<div class="box pay">' + '<div class="cards">' + '<div class="card-icon mastercard"><img src="images/cards/mastercard.png"></div>' + '<div class="card-icon visa"><img src="images/cards/visa.png"></div>' + '</div>' + '<span>оплата курьеру<br>оплата онлайн</span>' + '</div>' + '</div>' + '</div>' + '</div>' + '<div class="row buttons-line">' + '<div class="col-lg-2">' + '</div>' + '<div class="col-lg-6 buttons-tabs">' + '<a class="button tab-toggle light" data-tab="tab-comments" href="#tab-comments">' + '<span>Отзывы</span>' + '</a>' + '<a class="button tab-toggle light active" data-tab="tab-food" href="#tab-food">' + '<span>Доставка</span>' + '</a>' + '<a class="button tab-toggle light" data-tab="tab-reservation" href="#tab-reservation">' + '<span>Бронирование</span>' + '</a>' + '</div>' + '<div class="col-lg-4 buttons-reserv">' + '<a class="button light" href="#">' + '<i class="icon icon-eye"></i>' + '<span>3D тур</span>' + '</a>' + '<a class="button main" href="#">' + '<i class="icon icon-anchor"></i>' + '<span>Забронировать стол</span>' + '</a>' + '</div>' + '</div>' + '</div>';
    callback(output);
    return output;
}

function pasteCompanyItem(that, cuisines) {
    var out = '<section class="as-u-wish">' + '<div class="row" style="margin-bottom:30px;">' + '<div class="col-lg-4">' + '<div class="image-thumb">' + '<img src="http://176.112.201.81/static/cdn/' + that.restaurant_main_image + '">' + '</div>' + '</div>' + '<div class="col-lg-8">' + '<h2>' + that.restaurant_name + ' <a href="#" class="like-me"><i class="fa fa-heart"></i></a></h2>' + '<span class="text-line">' + '<i>Расстояние:</i> <span>4,4 км</span>' + '</span>' + '<span class="text-line">' + '<i>Кухня:</i> <span>Итальянская / Европейская, Японская / Китайская</span>' + '</span>' + '<div class="row bt-line">' + '<div class="col-lg-8">' + '<div class="payment-ccards">' + '<img src="images/samples/cc.png">' + '</div>' + '</div>' + '<div class="col-lg-4 likes">' + '<a href="#" class="like">' + '<i class="fa fa-thumbs-up"></i>' + '</a>' + '</div>' + '</div>' + '</div>' + '</div>' + '<div class="row btm-line">' + '<div class="col-lg-3 kal">' + '<div class="box-info">' + '<b>' + that.restaurant_min_order + ' Р</b>' + '<span>мин.сумма заказа</span>' + '</div>' + '</div>' + '<div class="col-lg-3 kal">' + '<div class="box-info">' + '<b>' + that.restaurant_delivery_cost + '</b>' + '<span>стоимость доставки</span>' + '</div>' + '</div>' + '<div class="col-lg-3 kal">' + '<div class="box-info">' + '<b>' + that.restaurant_delivery_time + ' минут</b>' + '<span>среднее время доставки</span>' + '</div>' + '</div>' + '<div class="col-lg-3 kal">' + '<div class="box-info">' + '<b>' + that.restaurant_average_check + ' Р</b>' + '<span>средний чек</span>' + '</div>' + '</div>' + '</div>' + '</section>';
    return out;
}

$.getJSON(serverUrl + '/api/v2/cuisines/get', function (data) {
    theCuisines = data.result.cuisines;
    $.getJSON(serverUrl + '/api/v2/restaurants/get?restaurantType=3', function (data) {
        $.each(data, function (key, item) {
            $.each(item.restaurants, function (index, value) {
                $('#hellOnEarth').append(pasteCompanyItem(value, theCuisines));
            });
        });
    });
});

},{}],6:[function(require,module,exports){
function initSlideRange(obj, units, range, bindMin, bindMax) {
    if ($(obj).length > 0) $(obj).noUiSlider({
        start: units,
        step: 10,
        margin: 20,
        connect: true,
        range: range
    });

    var min = $(bindMin),
        max = $(bindMax);
    min.val(parseInt(units[0]));
    max.val(parseInt(units[1]));

    $(obj).on('change', function () {
        min.val(parseInt(value[0]));
        max.val(parseInt(value[1]));
    });
    return $(obj);
}

$('.control-minus').click(function () {
    var curr = $('input', $(this).parent());
    if (!(curr.val() <= 1)) {
        curr.val(parseInt(curr.val()) - 1);
    }
});

$('.control-plus').click(function () {
    var curr = $('input', $(this).parent());
    curr.val(parseInt(curr.val()) + 1);
});

},{}],7:[function(require,module,exports){
function getUserProfile(token, callback) {
    console.log('getUserProfile: token = ' + token);

    var remote = serverUrl + '/api/v2/user/profile/get';
    var result = {};

    if (token === undefined || token === null) {
        console.log('getUserProfile: no token');
    } else {
        $.ajax({
            type: 'POST',
            async: 'false',
            dataType: 'json',
            url: remote,
            data: {
                'userToken': token
            },
            success: function (data) {
                console.log('getUserProfile: success');
                console.log(data.result.profile);
                result = data.result.profile;
                callback(result);
            }
        });
    }
}

function editUserProfile(userToken, cityId, birthdate, name, surname, email, avatar) {
    console.log('editUserProfile: start');

    $.ajax({
        type: 'POST',
        url: serverUrl + '/api/v2/user/profile/edit',
        data: {
            'userToken': userToken,
            'cityId': cityId,
            'birthdate': birthdate,
            'name': name,
            'surname': surname,
            'email': email,
            'avatar': avatar
        },
        success: function (data) {
            console.log('editUserProfile: success');
            console.log(data);
        }
    });
}

$(function () {

    getUserProfile(userToken, function (data) {
        userInfo = data;
        $('#userBadgeTop').append('<div class="user-text">' + '<b class="user-name">' + data.userName + ' ' + data.userSurname + '</b>' + '<a class="r-bonus"><b>20</b> <span class="fa fa-rouble"></span>-бонусов</a>' + '</div>' + '<div class="user-avatar" style="background-image:url(' + data.userAvatarUrl + ')"></div>');
    });
});

function pasteProfileEditor() {
    var output = "";
}

},{}],8:[function(require,module,exports){

function getCuisinesList(callback) {
    var result = null;
    console.log('getCuisines: init');
    $.getJSON(serverUrl + '/api/v2/cuisines/get', function (data) {
        cuisinesList = data;
        console.log(data);
        callback(data);
    });
}

function pasteMenu(categoryId) {
    $.getJSON(serverUrl + '/api/v2/menu-items/get/' + categoryId, function (data) {
        $('#foodItems').html('');
        $.each(data.result.menuItems, function (key, item) {
            if (item.menu_item_image == "") {
                item.menu_item_image = "images/samples/9-tiny.jpg";
            } else item.menu_item_image = "http://176.112.201.81/static/cdn/" + item.menu_item_image;

            var output = '<div class="col-lg-4 col-xs-6 food-item"><a href="#">' + '<img src="' + item.menu_item_image + '" alt="..." />' + '<div class="overlay"><div class="price"><i class="icon icon-basket"></i>' + '<span>' + item.menu_item_price + ' <i class="rouble">a</i></span></div></div></a>' + '<b>' + item.menu_item_name + '</b></div>';
            $('#foodItems').append(output);
        });
    });
}

function pasteCategories(restId) {
    $.getJSON(serverUrl + '/api/v2/categories/get/' + restId, function (data) {
        $.each(data.result.categories, function (key, item) {
            //   console.log(item);
            var kal = '<li class="category-line"><a href="#' + item.category_id + '" class="category-toggle" data-category="' + item.category_id + '">' + '<i class="icon"></i>' + item.category_name + '</a></li>';
            //      console.log(kal);
            $('#theMenu').append(kal);
        });
    });
}

function pasteComments(restId) {
    $.getJSON(serverUrl + '/api/v2/comments/get/' + restId, function (data) {
        var imageUrl = data.imagesBaseUrl;
        //    console.log(data);
        $.each(data.result.comments, function (key, item) {
            var stars = "";
            for (i = 0; i < item.comment_rating; i++) {
                stars = stars + '<i class="star yes fa fa-star"></i>';
            }
            for (i = 0; i < 5 - item.comment_rating; i++) {
                stars = stars + '<i class="star yes fa fa-star-o"></i>';
            }
            $('#theComments').append('<div class="comment row">' + '<div class="col-lg-2 col-xs-2 align-center">' + '<div class="avatar"><img src="http://176.112.201.81/static/cdn/' + item.user_avatar + '" alt="..."></div>' + '<div class="likes"><a href="#" class="like"><i class="fa-thumbs-o-up fa"></i>' + '<span class="count">' + item.comment_likes + '</span></a></div></div>' + '<div class="text col-lg-10 col-xs-10">' + '<b>' + item.user_name + '<span class="stars">' + stars + '</span></b>' + '<p>' + item.comment_text + '</p>' + '</div></div>');
        });
    });
}

$(document).on('click', '.category-toggle', function (event) {
    event.preventDefault();
    $('.category-line a').removeClass('active');
    $(this).addClass('active');
    pasteMenu($(this).attr('data-category'));
});

},{}],9:[function(require,module,exports){
function initTabs() {
    $(document).on('click', 'ul.tabs li', function (event) {
        var tab_id = $(this).attr('data-tab');
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    });
}

$(document).on('click', '.tab-toggle', function (event) {
    var aniInClass = "fadeOutRight animated";
    var aniOutClass = "slideOutLeft animated";
    $('.buttons-tabs .button').removeClass('active');
    $(this).addClass('active');
    event.preventDefault();
    $('.tab-active').removeClass('tab-active');
    var theTab = $(this).attr('href');
    $(theTab).addClass('tab-active animated fadeInRight');
});

},{}],10:[function(require,module,exports){
/*
      ___           ___                       ___           ___           ___       ___
     /\  \         /\__\          ___        /\  \         /\__\         /\__\     |\__\
    /::\  \       /:/  /         /\  \      /::\  \       /:/  /        /:/  /     |:|  |
   /:/\:\  \     /:/  /          \:\  \    /:/\:\  \     /:/__/        /:/  /      |:|  |
   \:\~\:\  \   /:/  /  ___      /::\__\  /:/  \:\  \   /::\__\____   /:/  /       |:|__|__
    \:\ \:\__\ /:/__/  /\__\  __/:/\/__/ /:/__/ \:\__\ /:/\:::::\__\ /:/__/        /::::\__\
     \:\/:/  / \:\  \ /:/  / /\/:/  /    \:\  \  \/__/ \/_|:|~~|~    \:\  \       /:/~~/~
      \::/  /   \:\  /:/  /  \::/__/      \:\  \          |:|  |      \:\  \     /:/  /
      /:/  /     \:\/:/  /    \:\__\       \:\  \         |:|  |       \:\  \    \/__/
     /:/  /       \::/  /      \/__/        \:\__\        |:|  |        \:\__\
     \/__/         \/__/                     \/__/         \|__|         \/__/

*/

$(function () {

    var userInfo = {};
    var profile = {};

    setTimeout(function () {
        console.log(userInfo);
        profile = userInfo;
    }, 0);

    getCuisinesList(function (data) {
        console.log(data.result.cuisines);
    });

    $.material.init();

    removeHoverCSSRule();
    initTabs();

    var isMobile = false;

    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;

    $('#reservation-datetime').datetimepicker({
        inline: true,
        locale: moment.locale('ru'),
        icons: {
            time: 'picker-time glyphicon glyphicon-time',
            date: 'glyphicon glyphicon-calendar',
            up: 'glyphicon glyphicon-chevron-up',
            down: 'glyphicon glyphicon-chevron-down',
            previous: 'glyphicon glyphicon-chevron-left',
            next: 'glyphicon glyphicon-chevron-right',
            today: 'glyphicon glyphicon-screenshot',
            clear: 'glyphicon glyphicon-trash',
            close: 'glyphicon glyphicon-remove'
        }
    });

    if (isMobile) $('#sidebar').appendTo(document.body);

    $('#choose').barrating({ theme: 'fontawesome-stars' });

    $('.tip').tooltip({ animation: true });

    $('.picker-time').append('<i>Выбрать время</i>');

    $('.the-room .point.free').click(function () {
        $(this).toggleClass('mine');
    });

    initSlideRange('#control-price', [400, 1500], {
        'min': 300,
        'max': 2000
    }, '#filter-price-min', '#filter-price-max');

    $('.button-open').click(function () {
        $(this).parent().removeClass('mobile');
    });

    $('.button-close').click(function () {
        $(this).parent().addClass('mobile');
    });

    // testing

    pasteCategories(1);
    pasteMenu(1);
    pasteComments(1);

    getCompanyDetails(1, function (data) {
        console.log(data.result);
        pasteCompanyDetails(data.result.restaurant, function (output) {
            $('#companyDetails').append(output);
        });
    });

    console.log('userToken = ' + userToken);

    if (userToken === undefined || userToken === null) {
        if (userPhone) {
            waitingForCode();
        } else notAuthorized();
    } else {
        userAuthorized();
    }
});

},{}]},{},[1,4,2,3,5,6,7,8,9,10])


//# sourceMappingURL=app/build.js.map
