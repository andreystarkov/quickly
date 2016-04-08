(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _checkoutFunc = require('./engine/checkout.func.jsx');

(function () {
    [].slice.call(document.querySelectorAll('.checkout')).forEach(function (el) {
        var openCtrl = el.querySelector('.checkout-button'),
            closeCtrl = el.querySelector('.checkout-cancel'),
            closeMenuCtrl = el.querySelector('.button-close');

        openCtrl.addEventListener('click', function (ev) {
            ev.preventDefault();
            classie.add(el, 'checkout-active');
            $('.overlay').addClass('visible');
            $('#cartBottomPanel').removeClass('checkout-hidden');
            (0, _checkoutFunc.refreshCart)();
        });

        closeCtrl.addEventListener('click', function () {
            classie.remove(el, 'checkout-active');
            $('.overlay').removeClass('visible');
            $('#cartBottomPanel').addClass('checkout-hidden');
            (0, _checkoutFunc.refreshCart)();
        });
    });
})();

},{"./engine/checkout.func.jsx":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addToCart = addToCart;
exports.repeatOrder = repeatOrder;

var _checkoutFunc = require('../engine/checkout.func.jsx');

function addToCart(id, name, price, flyObj) {
    var jsonObj = {};
    jsonObj['id'] = id;
    jsonObj['name'] = name;
    jsonObj['price'] = price;
    theCart.contents.push(jsonObj);
    console.log('addToCart: theCart = ', theCart);
    setStorage('theCart', theCart.contents);
    flyToCart($(flyObj));cartBottomPanel;
    (0, _checkoutFunc.refreshCart)();
} /*
  * @Author: Andrey Starkov
  * @Date:   2016-03-24 16:23:35
  * @Last Modified by:   Andrey Starkov
  * @Last Modified time: 2016-03-24 17:22:55
  */

function repeatOrder(items) {
    console.log('repeatOrder: items = ', items);
    var hey = items.map(function (the, i) {
        addToCart(the.menu_item_id, the.menu_item_name, the.menu_item_price, "#" + 'singleItem-' + the.menu_item_id);
    });
}

},{"../engine/checkout.func.jsx":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clearCart = clearCart;
exports.refreshCart = refreshCart;
function templateCartFooter() {
    var totalPrice = 0;
    var totalCount = 0;
    $.each(theCart.contents, function (index, value) {
        totalPrice += value.price;
        totalCount++;
    });
    var out = '\n        <div class="row">\n            <div class="col-lg-8">\n                <div class="price-total">\n                    <b>Итого</b>: <span>' + totalCount + '</span> товаров на сумму <span>' + totalPrice + ' <i class="fa fa-rouble"></i></span>\n                </div>\n            </div>\n        </div>\n    ';

    return out;
}

function hideCart() {
    //  $('.checkout-active').removeClass('checkout-active');
    $('.checkout-close').click();
    $('#cartBottomPanel').velocity('transition.slideDownOut', { duration: 400 });
    $('#cartBottomPanel').addClass('cart-empty');
}

function clearCart(callback) {
    localStorage.removeItem('theCart');
    theCart.contents = [];
    console.log('clearCart: cleared');
    Cookies.remove('shop');
    $('.checkout-close').click();
    $('#cartBottomPanel').addClass('cart-empty');

    $('#cartBottomPanel').velocity('transition.slideDownOut', { duration: 400 }, function () {
        if (callback) callback();
    });
}

function refreshCart() {
    var cartPanel = $('#cartBottomPanel');
    var cartContents = getStorage('theCart');
    var tables = getStorage('theReservation');

    var foodCount = 0,
        tablesCount = 0,
        totalCount;

    if (cartContents) foodCount = cartContents.length;
    if (tables) tablesCount = 1;

    totalCount = tablesCount + foodCount;

    if (totalCount == 0) {
        console.log('refreshCart: Cart is empty');
        localStorage.removeItem('theCart');
        Cookies.remove('shop');
        clearCart();
    } else {
        $('.checkout-total').html(totalCount);

        if (cartPanel.hasClass('cart-empty')) {
            console.log('refreshCart: cart empty is set');
            cartPanel.removeClass('cart-empty');
            cartPanel.css({ opacity: 1 }).velocity('transition.slideUpBigIn', { duration: 600 });
        }

        var uniqueList;
        var uniqueCount = _.countBy(cartContents, "id");
        var uniqueList = _.uniq(cartContents, "id");
        var tablesList = _.uniq(tables, "id");
        var cartTable = null;
        var tablesList, foodList;

        if (tables !== null) tablesList += pasteCartTable(tables);

        $.each(uniqueList, function (key, value) {
            foodList += pasteCartElement(value, uniqueCount[value.id], key);
        });

        $('.checkout-contents').html(tablesList + foodList);
        $('.checkout-footer').html(templateCartFooter());
    }
}

function pasteCartTable(cartElement, elementCount, key) {
    var el = '\n    <tr class="reservation-' + cartElement.type + '" data-id="' + cartElement.id + '">\n        <td>' + cartElement.name + ' </td>\n        <td>' + cartElement.price + ' р.</td>\n        <td>\n            <div class="form-group label-placeholder is-empty" data-id="' + cartElement.id + '" data-name="' + cartElement.name + '" data-price="' + cartElement.price + '">\n                <input type="text" value="' + cartElement.count + '" class="form-control" id="cartItem-' + cartElement.id + '">\n            </div>\n        </td>\n        <td>\n            <button class="checkout-action"><i class="icon icn-trash"></i></button>\n        </td>\n    </tr>\n    ';

    return el;
}

function pasteCartElement(cartElement, elementCount) {
    var el = '\n    <tr class="reservation-' + cartElement.type + '" data-id="' + cartElement.id + '">\n        <td>' + cartElement.name + '</td>\n        <td>' + cartElement.price + ' р.</td>\n        <td>\n            <div class="form-group label-placeholder is-empty" data-id="' + cartElement.id + '" data-name="' + cartElement.name + '" data-price="' + cartElement.price + '">\n                <span class="control-minus" data-id="cartItem-' + cartElement.id + '">-</span>\n                <input type="text" value="' + elementCount + '" class="form-control" id="cartItem-' + cartElement.id + '">\n                <span class="control-plus" data-id="cartItem-' + cartElement.id + '">+</span>\n            </div>\n        </td>\n        <td>\n            <button class="checkout-action"><i class="icon icn-trash"></i></button>\n        </td>\n    </tr>\n    ';

    return el;
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createOrder = createOrder;

var _checkoutFunc = require('./checkout.func.jsx');

function orderSuccess(data) {
    swal({
        title: 'Ваш заказ обработан! ',
        text: 'В течении нескольких минут вам перезвонит сотрудник ресторана для подтверждения заказа.',
        type: 'success',
        confirmButtonText: 'Продолжить',
        buttonsStyling: 'false',
        animation: 'slide-from-top'
    }, function () {
        toastr.success('Посмотреть статус заказа можно в разделе "История"', 'Заказ принят!');
    });
}

function createOrder(callback) {
    var cartContents = getStorage('theCart');
    var uniqueList = _.uniq(cartContents, "id");
    var uniqueCount = _.countBy(cartContents, "id");
    var userProfile = getStorage('profile');

    var paymentType = $('.checkout-payment-type').val(),
        personsCount = $('#checkout-persons').val(),
        street = $('#checkout-street').val(),
        building = $('#checkout-building').val(),
        usedBonus = $('#checkout-bonus').val(),
        cash = $('#checkout-cash').val(),
        comment = $('#checkout-comment').val(),
        phone = $('#checkout-phone').val(),
        porch = $('#checkout-porch').val(),
        floor = $('#checkout-floor').val(),
        apartment = $('#checkout-apartment').val(),
        restaurauntId = currentCompany;

    console.log('createOrder: uniqueList = ', uniqueList);
    console.log('createOrder: uniqueCount = ', uniqueCount);
    console.log('createOrder: userProfile = ', userProfile);

    var summary = [];
    var tables = [];

    for (i = 0; i < uniqueList.length; i++) {
        var row = {};

        if (uniqueList[i].type == 'food') {
            row['menu_item_id'] = uniqueList[i].id, row['menu_item_price'] = uniqueList[i].price, row['count'] = uniqueCount[uniqueList[i].id];
            summary.push(row);
        } else {
            row['id'] = uniqueList[i].id, row['price'] = uniqueList[i].price, row['count'] = uniqueList[i].count, row['hall'] = uniqueList[i].hall;
            tables.push(row);
        }
    }

    console.log('createOrder: summary = ', summary);

    var reservation = getStorage('theReservation');

    var params = {
        token: userToken,
        restaurantId: currentCompany,
        menuItems: summary,
        street: street,
        usedBonus: usedBonus,
        porch: porch,
        floor: floor,
        apartment: apartment,
        building: building,
        payment_type: paymentType,
        cash: cash,
        persons_count: parseInt(personsCount),
        comment: comment
    };

    $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        url: serverUrl + '/api/v3/orders/create',
        data: JSON.stringify(params),
        success: function success(data) {
            if (!data.err) {
                $('.checkout-cancel').click();
                (0, _checkoutFunc.clearCart)();
                console.log('createOrder: success: ', data);
                orderSuccess(data);
                if (callback) callback(data);
            } else {
                console.log('createOrder: ERROR: ', data.err);
                toastr.error('Заполните пожалуйста все обязательные поля', 'Недостаточно информации');
            }
        }
    });
}

},{"./checkout.func.jsx":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reservationAdded = reservationAdded;
exports.createReservation = createReservation;
function reservationAdded() {
    toastr.success('Заявка на резервацвацию в вашей корзине', 'Стол добавлен');
    swal({
        title: 'Стол добавлен в корзину! ',
        text: 'Вы можете прикрепить блюда, которые подадут к заказанному столу. Перейдите в меню для выбора блюд. Или продолжите самостоятельно.',
        type: 'success',
        confirmButtonText: 'Перейти в меню',
        cancelButtonText: 'Продолжить',
        showCancelButton: true
    }, function (isConfirm) {
        if (isConfirm) {
            $('a[href="#tab-food"').click();
        }
    });
}

function reservationSuccess() {
    localStorage.removeItem('theReservation');
    swal({
        title: 'Стол забронирован! ',
        text: 'В течении нескольких минут вам перезвонит сотрудник ресторана для подтверждения. Статус вашего заказа смотрите в разделе "История"',
        type: 'success',
        confirmButtonText: 'Продолжить',

        animation: 'slide-from-top'
    }, function () {
        toastr.success('Стол успешно забронирован!');
    });
}

function createReservation() {
    var table = getStorage('theReservation');

    if (table == null) {
        toastr.error('Вы не выбрали ни одного стола на резервацию', 'Стол не выбран!');
    } else {
        var params = {
            token: userToken,
            restaurantId: currentCompany,
            hallId: table.hall,
            phone: $('#checkout-phone').val(),
            tableId: table.id,
            date: table.date
        };

        console.log('createReservation: params = ', params);

        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            url: serverUrl + '/api/v3/reservation/create',
            data: JSON.stringify(params),
            success: function success(data) {
                if (!data.err) {
                    $('.checkout-cancel').click();
                    console.log('createReservation: Success', data);
                    reservationSuccess(data);
                } else {
                    console.log('createReservation: ERROR: ', data.err);
                    if (data.err == 'Table already reserved') {
                        toastr.error('Стол уже зарезервирован на это время', 'Ошибка');
                        localStorage.removeItem('theReservation');
                    }
                }
            }
        });
    }
    console.log('createReservation: Table = ', table);
}

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.refreshUserProfile = refreshUserProfile;

function editUserField(fieldId, callback) {
    var theOptions = {};
    var theParameter = $('#' + fieldId).data('id');
    var currentCity = getStorage('city');
    var cityId = currentCity.city_id || 3;
    var setValue = $('#' + fieldId).val();

    theOptions['userToken'] = userToken;
    theOptions['cityId'] = cityId;

    if (fieldId == "userBirthdate") {
        console.log('Editing: userBirthdate, ', setValue + ' = ' + moment(setValue).utc().format('X'));
        setValue = moment(setValue).utc().format('X');
        console.log('setValue: ', setValue);
    }

    theOptions[theParameter] = setValue;

    console.log('editUserField: Options: ', theOptions);
    $.ajax({
        url: serverUrl + '/api/v2/user/profile/edit',
        dataType: 'json',
        type: 'POST',
        data: theOptions,
        success: function success(data) {
            console.log('editUserField: ', data);
            if (data.err === undefined || data.err === null) {
                toastr.success('Данные профиля сохранены');
            }
            $('#' + fieldId).parent().addClass('has-success');
            refreshUserProfile();
            if (callback) callback(data);
        }
    });
}

function emptyProfile() {
    var token = userToken;
    getUserProfile(token, function (data) {
        var userBonus = getUserBonus(userToken);
        var userInfo = data;
        $('#userBadgeTop').html('\n              <div class="user-text" id="buttonEmptyProfile">\n                <b class="user-name">Добро пожаловать!</b>\n                <a class="r-bonus">У вас <b>' + userBonus + '</b> <span class="fa fa-rouble"></span>-бонусов</a>\n              </div>\n            ');
    });
}

function refreshUserProfile() {
    var token = userToken;
    getUserProfile(token, function (data) {
        var userBonus = getUserBonus(userToken);
        var userInfo = data;
        var userAvatar = data.userAvatarUrl;
        if (data.userAvatarUrl === undefined || data.userAvatarUrl === null) {
            userAvatar = 'images/samples/user.png';
        }
        $('#userBadgeTop').html('\n          <div class="user-text">\n            <b class="user-name">' + data.userName + ' ' + data.userSurname + '</b>\n            <a class="r-bonus"><b>' + userBonus + '</b> <span class="fa fa-rouble"></span>-бонусов</a>\n          </div>\n          <div class="user-avatar" style="background-image:url(' + userAvatar + ')"></div>\n        ');
    });
}

function getUserBonus(userToken) {
    var bonus;
    $.ajax({
        url: serverUrl + '/api/v2/user/bonus/' + userToken,
        async: false,
        dataType: 'json',
        success: function success(data) {
            bonus = data.result.userBonus;
        }
    });
    return bonus;
}

$(function () {

    refreshUserProfile();
    var oldFieldVal;

    $(document).on('focusin', ".profile-autoupdate", function () {
        oldFieldVal = $(this).val();
    });

    $(document).on('focusout', ".profile-autoupdate", function () {
        var fieldId = $(this).attr('id');
        var newFieldVal = $(this).val();
        if (!(oldFieldVal == newFieldVal)) {
            console.log('Editing: #' + fieldId + ', data-id=' + $(this).data('id'), 'Old val = ' + oldFieldVal);
            editUserField(fieldId);
        } else console.log('AutoField: Nothing changed');
    });
});

},{}],7:[function(require,module,exports){
'use strict';

var CampaignsActions = Reflux.createActions(['fetchList', 'updateData']);

module.exports = CampaignsActions;

},{}],8:[function(require,module,exports){
'use strict';

/*
* @Author: Andrey Starkov
* @Date:   2016-04-02 14:06:53
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-02 14:07:37
*/

var CardsActions = Reflux.createActions(['fetchList', 'updateData', 'bindCard']);

module.exports = CardsActions;

},{}],9:[function(require,module,exports){
'use strict';

var CategoriesListActions = Reflux.createActions(['fetchList', 'updateData']);

module.exports = CategoriesListActions;

},{}],10:[function(require,module,exports){
'use strict';

var CityActions = Reflux.createActions(['fetchList']);

module.exports = CityActions;

},{}],11:[function(require,module,exports){
'use strict';

var CompanyDetailsActions = Reflux.createActions(['fetchList', 'updateData']);

module.exports = CompanyDetailsActions;

},{}],12:[function(require,module,exports){
'use strict';

/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 13:41:13
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-29 22:30:31
*/

var CompanyListActions = Reflux.createActions(['fetchList', 'updateData', 'filterData', 'selectByCuisine', 'getCurrentCuisine', 'setCurrentCity']);

module.exports = CompanyListActions;

},{}],13:[function(require,module,exports){
'use strict';

/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 20:10:48
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-29 20:37:37
*/

var CuisinesActions = Reflux.createActions(['fetchList', 'getCuisineById']);

module.exports = CuisinesActions;

},{}],14:[function(require,module,exports){
'use strict';

/*
* @Author: Andrey Starkov
* @Date:   2016-03-31 23:13:33
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-01 00:37:36
*/

var MenuItemsActions = Reflux.createActions(['fetchList', 'updateData']);

module.exports = MenuItemsActions;

},{}],15:[function(require,module,exports){
'use strict';

/*
* @Author: Andrey Starkov
* @Date:   2016-04-02 16:46:11
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-02 16:50:39
*/

var ProfileEditorActions = Reflux.createActions(['fetchList', 'updateData']);

module.exports = ProfileEditorActions;

},{}],16:[function(require,module,exports){
'use strict';

var CardsStore = require('./stores/cardsStore.js');
var CardsActions = require('./actions/cardsActions.js');

var CardsList = React.createClass({
    displayName: 'CardsList',

    mixins: [Reflux.connect(CardsStore, 'cardsData')],
    getInitialState: function getInitialState() {
        return {
            data: [],
            cardsData: []
        };
    },
    componentDidMount: function componentDidMount() {
        //   OrdersHistoryActions.updateData();
    },
    render: function render() {
        console.log(this.state.cardsData);
        return React.createElement(
            'div',
            null,
            'test'
        );
    }
});

},{"./actions/cardsActions.js":8,"./stores/cardsStore.js":37}],17:[function(require,module,exports){
'use strict';

var CategoriesListStore = require('./stores/categoriesListStore.js');
var CategoresListActions = require('./actions/categoriesListActions.js');
var MenuItemsActions = require('./actions/menuItemsActions.js');

var CategoryItem = React.createClass({
    displayName: 'CategoryItem',

    categoryToggle: function categoryToggle(el) {
        var newId = this.props.item.category_id;
        console.log('CategoryItem: categoryToggle: newId = ', newId);
        var the = el.target;
        var others = document.getElementsByClassName('category-toggle');
        console.log(others);
        /*    $('.category-toggle.active').removeClass('active');
            the.addClass('active');*/
        MenuItemsActions.updateData(newId);
    },
    render: function render() {
        var item = this.props.item;
        return React.createElement(
            'li',
            { className: 'category-line' },
            React.createElement(
                'button',
                { onClick: this.categoryToggle, className: 'category-toggle' },
                React.createElement('i', { className: 'icon' }),
                item.category_name
            )
        );
    }
});

var CategoriesList = React.createClass({
    displayName: 'CategoriesList',

    mixins: [Reflux.connect(CategoriesListStore, 'categories')],
    getInitialState: function getInitialState() {
        return {
            data: [],
            categories: []
        };
    },
    componentDidMount: function componentDidMount() {
        //   OrdersHistoryActions.updateData();
    },
    render: function render() {
        //   OrdersHistoryActions.updateData();
        var list = this.state.categories;

        console.log('CategoriesList: ', list);
        var everything = list.map(function (the, i) {
            return React.createElement(CategoryItem, { item: the, key: i });
        });
        return React.createElement(
            'div',
            { className: 'categories-list' },
            React.createElement(
                'ul',
                { className: 'menu' },
                everything
            )
        );
    }
});

module.exports = CategoriesList;

},{"./actions/categoriesListActions.js":9,"./actions/menuItemsActions.js":14,"./stores/categoriesListStore.js":38}],18:[function(require,module,exports){
'use strict';

var CityListActions = require('./actions/cityListActions.js');
var CityListStore = require('./stores/cityListStore.js');
var CompanyListActions = require('./actions/companyListActions.js');

var Option = React.createClass({
  displayName: 'Option',

  render: function render() {
    return React.createElement(
      'option',
      { value: this.props.value },
      this.props.name
    );
  }
});

var CityList = React.createClass({
  displayName: 'CityList',

  mixins: [Reflux.connect(CityListStore, 'cityList')],
  limit: 12,
  getInitialState: function getInitialState() {
    return {
      data: [],
      cityList: [],
      selected: 0,
      value: 3
    };
  },
  changeHandler: function changeHandler(e) {
    console.log('CityList: change value = ' + e.target.value);
    this.setState({
      value: e.target.value
    });
    CompanyListActions.setCurrentCity(e.target.value);
  },
  componentDidMount: function componentDidMount() {},
  render: function render() {
    var totalList = this.state.cityList.map(function (the, i) {
      return React.createElement(Option, { name: the.city_name, value: the.city_id, key: i });
    });
    CompanyListActions.setCurrentCity(this.state.value);
    return React.createElement(
      'div',
      { className: 'city-select' },
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement(
          'b',
          null,
          'Ваш город'
        ),
        React.createElement(
          'select',
          { id: 'cityListSelect', onChange: this.changeHandler, className: 'form-control' },
          totalList
        )
      )
    );
  }
});

module.exports = CityList;

ReactDOM.render(React.createElement(CityList, null), document.getElementById('selectCityField'));

},{"./actions/cityListActions.js":10,"./actions/companyListActions.js":12,"./stores/cityListStore.js":39}],19:[function(require,module,exports){
'use strict';

var _reservation = require('../reservation.jsx');

var CompanyDetailsStore = require('./stores/companyDetailsStore.js');
var CompanyListActions = require('./actions/companyListActions.js');
var CuisinesList = require('./cuisinesList.react.jsx');
var ButtonTabToggle = require('./components/buttonTabToggle.js');

// restaurant_type:
// 1 - только бронь
// 2 - только доставка
// 3 - и то и другое

var CompanyDetails = React.createClass({
    displayName: 'CompanyDetails',

    mixins: [Reflux.connect(CompanyDetailsStore, 'companyData')],
    limit: 12,
    isReservation: false,
    getInitialState: function getInitialState() {
        return {
            data: [],
            companyData: []
        };
    },
    componentWillUpdate: function componentWillUpdate() {
        var data = this.state.companyData;
        if (data) {
            var type = data.restaurant_type;
            if (type == 1 || type == 3) {
                console.log('companyDetails: Reservation Enabled (' + type + ')');
                this.isReservation = true;
                (0, _reservation.getHallsList)(data.restaurant_id, function (data) {
                    console.log('getHallsList: callback, data = ', data);
                });
            } else {
                console.log('CompanyDetails: Reservation Disabled (' + type + ')');
                this.isReservation = false;
            }
        } else console.log('CompanyDetails: data is undefined');
    },
    render: function render() {
        var company = this.state.companyData;
        var cuisinesSelect;

        if (company.restaurant_main_image) {
            var image = imageBaseUrl + company.restaurant_main_image;
            console.log('CompanyDetails: Is image exists? ', isImageExists(image));
        }

        if (company.restaurant_cuisines) cuisinesSelect = React.createElement(CuisinesList, { cuisines: company.restaurant_cuisines });

        var buttonReservation = this.isReservation ? React.createElement(ButtonTabToggle, { name: 'Бронирование', tab: 'tab-reservation' }) : React.createElement(ButtonTabToggle, { name: 'Бронирование', tab: 'tab-reservation', disabled: 'true' });

        if (company.restaurant_comments_count) {
            console.log('CompanyDetails: Has comments (' + company.comments_count + ')');
        } else {
            console.log('CompanyDetails: No comments (' + company.comments_count + ')');
        }

        var rating = company.restaurant_rating;
        return React.createElement(
            'div',
            { className: 'container' },
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-lg-2 col-xs-12 text-center' },
                    React.createElement(
                        'div',
                        { className: 'logo round' },
                        React.createElement('img', { src: image })
                    ),
                    React.createElement(
                        'div',
                        { className: 'title' },
                        React.createElement(
                            'h2',
                            null,
                            company.restaurant_name
                        ),
                        React.createElement(
                            'span',
                            null,
                            company.restaurant_info
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-lg-10 the-info' },
                    React.createElement(
                        'div',
                        { className: 'line types' },
                        React.createElement('i', { className: 'fi-dishes icon' }),
                        ' ',
                        cuisinesSelect,
                        React.createElement(
                            'div',
                            { className: 'rating' },
                            React.createElement(
                                'span',
                                null,
                                rating
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'line delivery' },
                        React.createElement('i', { className: 'icon fi-delivery' }),
                        React.createElement(
                            'div',
                            { className: 'box cost' },
                            React.createElement(
                                'span',
                                { className: 'detail-title' },
                                'доставка'
                            ),
                            React.createElement(
                                'b',
                                null,
                                company.restaurant_delivery_cost,
                                ' ',
                                React.createElement(
                                    'i',
                                    { className: 'rouble' },
                                    'o'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'box time' },
                            React.createElement(
                                'span',
                                { className: 'detail-title' },
                                'время'
                            ),
                            React.createElement(
                                'b',
                                null,
                                company.restaurant_delivery_time,
                                ' мин.'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'box min' },
                            React.createElement(
                                'span',
                                { className: 'detail-title' },
                                'минимум'
                            ),
                            React.createElement(
                                'b',
                                null,
                                company.restaurant_min_order,
                                ' ',
                                React.createElement(
                                    'i',
                                    { className: 'rouble' },
                                    'o'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'box min' },
                            React.createElement(
                                'span',
                                { className: 'detail-title' },
                                'средний чек'
                            ),
                            React.createElement(
                                'b',
                                null,
                                company.restaurant_average_check,
                                ' ',
                                React.createElement(
                                    'i',
                                    { className: 'rouble' },
                                    'o'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'box pay' },
                            React.createElement(
                                'div',
                                { className: 'cards' },
                                React.createElement(
                                    'div',
                                    { className: 'card-icon mastercard' },
                                    React.createElement('img', { src: 'images/cards/mastercard.png' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'card-icon visa' },
                                    React.createElement('img', { src: 'images/cards/visa.png' })
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'row buttons-line' },
                React.createElement('div', { className: 'col-lg-2' }),
                React.createElement(
                    'div',
                    { className: 'col-lg-6 buttons-tabs', 'data-tabs': 'tabs-shop' },
                    React.createElement(ButtonTabToggle, { name: 'Отзывы', tab: 'tab-comments' }),
                    React.createElement(ButtonTabToggle, { name: 'Доставка', active: 'true', tab: 'tab-food' }),
                    buttonReservation
                ),
                React.createElement(
                    'div',
                    { className: 'col-lg-4 buttons-reserv' },
                    React.createElement(
                        'a',
                        { className: 'button light', href: '#' },
                        React.createElement('i', { className: 'icon icon-eye' }),
                        React.createElement(
                            'span',
                            null,
                            '3D тур'
                        )
                    ),
                    React.createElement(
                        'button',
                        { className: 'button main screen-toggle', 'data-screen': 'pageCompanyList', id: 'buttonRestaurantList' },
                        React.createElement('i', { className: 'icon icon-list' }),
                        React.createElement(
                            'span',
                            null,
                            'К списку ресторанов'
                        )
                    )
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(CompanyDetails, { companyId: '1' }), document.getElementById('companyDetails'));

},{"../reservation.jsx":47,"./actions/companyListActions.js":12,"./components/buttonTabToggle.js":23,"./cuisinesList.react.jsx":29,"./stores/companyDetailsStore.js":40}],20:[function(require,module,exports){
'use strict';

var ButtonMore = require('./components/buttonMore.js');
var CuisinesList = require('./cuisinesList.react.jsx');
var CompanyListStore = require('./stores/companyListStore.js');
var CompanyListSidebar = require('./components/companyListSidebar.js');
var QuicklyLogo = require('./components/quicklyLogo.js');
var CuisinesActions = require('./actions/cuisinesActions.js');
var SingleCompany = require('./components/singleCompany.js');
var CompanyListActions = require('./actions/companyListActions.js');
var CuisinesList = require('./companyList.react.jsx');

var CompanyListHeader = React.createClass({
    displayName: 'CompanyListHeader',

    render: function render() {
        var cuisine = this.props.cuisine;
        return React.createElement(
            'section',
            { className: 'company-list-header' },
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-lg-4' },
                        React.createElement(
                            'div',
                            { className: 'row main-logo' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-6' },
                                React.createElement(
                                    'div',
                                    { className: 'cuisine-thumb' },
                                    React.createElement('img', { src: imageBaseUrl + cuisine.cuisine_image, alt: cuisine.cuisine_name })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-lg-6 text' },
                                React.createElement(
                                    'h1',
                                    null,
                                    cuisine.cuisine_name
                                ),
                                React.createElement(
                                    'p',
                                    null,
                                    'Выберите ресторан из списка'
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row bottom-line' },
                    React.createElement(
                        'div',
                        { className: 'col-lg-8' },
                        React.createElement(
                            'div',
                            { className: 'back-to-home align-left back-left' },
                            React.createElement(
                                'button',
                                { className: 'button light screen-toggle', 'data-screen': 'pageMain', id: 'buttonPageMain' },
                                React.createElement('i', { className: 'icon icon-arrow-left' }),
                                React.createElement(
                                    'span',
                                    null,
                                    ' К списку'
                                )
                            )
                        )
                    ),
                    React.createElement('div', { className: 'col-lg-4 align-right' })
                )
            )
        );
    }
});

var CompanyList = React.createClass({
    displayName: 'CompanyList',

    mixins: [Reflux.connect(CompanyListStore, 'companyData')],
    limit: 5,
    cuisineId: 0,
    getInitialState: function getInitialState() {
        return {
            data: [],
            companyData: [],
            cuisines: []
        };
    },
    componentDidMount: function componentDidMount() {
        ;
        this.state.cuisines = getStorage('cuisines');
    },
    loadMore: function loadMore() {
        this.limit += 5;
        CompanyStore.updateData();
    },
    render: function render() {
        var cuisineId = CompanyListStore.getCurrentCuisine();

        var theData = this.state.companyData;
        console.log('CompanyList: companyData = ', this.state.companyData);
        var totalList = this.state.companyData.map(function (the, i) {
            return React.createElement(SingleCompany, { company: the, key: i });
        });

        console.log('CompanyList: this.state.cuisines = ', this.state.cuisines);

        var overall, single, cuisines, cuisine;

        console.log('CompanyListHeader: cuisineId = ', cuisineId);
        if (cuisineId > 0) {
            cuisines = getStorage('cuisines');
            single = _.where(cuisines, { cuisine_id: cuisineId });

            single.forEach(function (val, index) {
                cuisine = React.createElement(CompanyListHeader, { cuisine: val });
            });
        }
        console.log('CompanyListHeader: cuisine = ', cuisine);

        return React.createElement(
            'div',
            { className: 'company-list-wrap' },
            React.createElement(
                'div',
                { className: 'gray header-gray' },
                cuisine
            ),
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'no-padding col-lg-9' },
                        React.createElement(
                            'div',
                            { className: 'company-list', id: 'companyList' },
                            React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    'div',
                                    { className: 'row' },
                                    totalList
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'full-width align-center' },
                                    React.createElement(ButtonMore, { onClick: this.loadMore })
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-lg-3 mobile sidebar', id: 'companyListSidebarWrap' },
                        React.createElement(
                            'div',
                            { className: 'button-close', id: 'menu-close' },
                            React.createElement('i', { className: 'icn-cancel' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'button-open', id: 'menu-open' },
                            React.createElement('i', { className: 'icn-menu' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'sidebar-wrap' },
                            React.createElement(
                                'div',
                                { id: 'companyListSidebar', className: 'company-list-sidebar' },
                                React.createElement(CompanyListSidebar, null)
                            )
                        )
                    )
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(CompanyList, null), document.getElementById('pageCompanyList'));

},{"./actions/companyListActions.js":12,"./actions/cuisinesActions.js":13,"./companyList.react.jsx":20,"./components/buttonMore.js":22,"./components/companyListSidebar.js":25,"./components/quicklyLogo.js":27,"./components/singleCompany.js":28,"./cuisinesList.react.jsx":29,"./stores/companyListStore.js":41}],21:[function(require,module,exports){
"use strict";

/*
* @Author: Andrey Starkov
* @Date:   2016-03-30 02:11:05
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-30 02:22:37
*/

var ButtonBack = React.createClass({
    displayName: "ButtonBack",

    render: function render() {
        return React.createElement(
            "div",
            { className: "button-back" },
            React.createElement("i", { className: "icon-arrow-left" })
        );
    }
});

module.exports = ButtonBack;

},{}],22:[function(require,module,exports){
"use strict";

/*
* @Author: Andrey Starkov
* @Date:   2016-03-24 15:45:19
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-02 13:26:10
*/

var ButtonMore = React.createClass({
    displayName: "ButtonMore",

    render: function render() {
        return React.createElement(
            "button",
            { onClick: this.props.onClick, className: "button button-more" },
            React.createElement("i", { className: "icon-reload" }),
            " Загрузить ещё"
        );
    }
});

module.exports = ButtonMore;

},{}],23:[function(require,module,exports){
'use strict';

/*
* @Author: Andrey Starkov
* @Date:   2016-04-07 14:04:04
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-07 14:55:49
*/

var ButtonTabToggle = React.createClass({
    displayName: 'ButtonTabToggle',

    render: function render() {
        var classNames = "tab-toggle btn button light";
        var disabled = false;

        if (this.props.disabled) {
            disabled = true;
        }
        if (this.props.active) {
            console.log('ButtonTabToggle: "' + this.props.name + '" is active');
            classNames += " active";
        }
        return React.createElement(
            'button',
            { className: classNames, id: this.props.id, 'data-tab': this.props.tab, disabled: disabled },
            React.createElement(
                'span',
                null,
                this.props.name
            )
        );
    }
});

module.exports = ButtonTabToggle;

},{}],24:[function(require,module,exports){
'use strict';

var CampaignsStore = require('../stores/campaignsStore.js');
var CampaignsActions = require('../actions/campaignsActions.js');
var CampaignsLimitedStore = require('../stores/CampaignsLimitedStore.js');

var SliderItem = React.createClass({
    displayName: 'SliderItem',

    render: function render() {
        var className,
            expires = "Акция действительна до ";
        if (this.props.pos == '0') className = "selected";
        if (this.props.expires) {
            expires += moment.unix(this.props.expires).format("MM/DD/YYYY HH:mm");
        } else expires = "Постоянная акция";
        return React.createElement(
            'li',
            { className: className },
            React.createElement(
                'div',
                { className: 'half-width' },
                React.createElement(
                    'h2',
                    null,
                    this.props.title
                ),
                React.createElement(
                    'p',
                    null,
                    expires
                ),
                React.createElement(
                    'a',
                    { href: '#0', className: 'button main' },
                    'Подробнее об акции'
                )
            ),
            React.createElement(
                'div',
                { className: 'half-width img-container' },
                React.createElement('img', { src: imageBaseUrl + this.props.image, alt: '...' })
            )
        );
    }
});

var CampaignsSlider = React.createClass({
    displayName: 'CampaignsSlider',

    mixins: [Reflux.connect(CampaignsStore, 'campaignsData'), Reflux.connect(CampaignsLimitedStore, 'campaignsLimitedData')],
    getInitialState: function getInitialState() {
        return {
            data: [],
            campaignsData: [],
            campaignsLimitedData: []
        };
    },
    render: function render() {
        console.log('CampagainsSlider: ', this.state.campaignsData, this.state.campaignsLimitedData);
        var campaigns = this.state.campaignsData;
        var campaignsLimited = this.state.campaignsLimitedData;
        var count = 0;
        var slides = campaigns.map(function (the, i) {
            return React.createElement(SliderItem, { title: the.campaign_name, image: the.campaign_image, pos: i, key: i });
        });
        var slidesLimited = campaignsLimited.map(function (the, i) {
            return React.createElement(SliderItem, { title: the.campaign_name, expires: the.campaign_end, image: the.campaign_image, pos: i, key: i });
        });
        console.log(slidesLimited);
        return React.createElement(
            'section',
            { className: 'hero' },
            React.createElement(
                'ul',
                { className: 'quickly-slider autoplay' },
                slides,
                ' ',
                slidesLimited
            ),
            React.createElement(
                'div',
                { className: 'slider-nav' },
                React.createElement(
                    'nav',
                    null,
                    React.createElement('span', { className: 'marker item-1' }),
                    React.createElement(
                        'ul',
                        null,
                        React.createElement(
                            'li',
                            { className: 'selected' },
                            React.createElement('a', { href: '#0' })
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement('a', { href: '#0' })
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement('a', { href: '#0' })
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement('a', { href: '#0' })
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement('a', { href: '#0' })
                        )
                    )
                )
            )
        );
    }
});

module.exports = CampaignsSlider;

},{"../actions/campaignsActions.js":7,"../stores/CampaignsLimitedStore.js":35,"../stores/campaignsStore.js":36}],25:[function(require,module,exports){
'use strict';

/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 19:17:52
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-07 18:42:37
*/

var CompanyListSidebar = React.createClass({
  displayName: 'CompanyListSidebar',

  filterCardCourier: function filterCardCourier(e) {
    console.log(e.target.value);
    if (e.target.value == 'on') {
      CompanyListActions.filterData(3);
    }
  },
  render: function render() {
    console.log('CompanyListSidebar: init');
    return React.createElement(
      'div',
      { className: 'sidebar-wrap company-list-sidebar' },
      React.createElement(
        'div',
        { className: 'checkbox control-item' },
        React.createElement(
          'label',
          null,
          React.createElement('input', { type: 'checkbox', name: 'somename' }),
          ' ',
          React.createElement(
            'span',
            { className: 'filter-name' },
            'Бесплатная доставка'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'checkbox control-item' },
        React.createElement(
          'label',
          null,
          React.createElement('input', { type: 'checkbox', name: 'somename' }),
          ' ',
          React.createElement(
            'span',
            { className: 'filter-name' },
            'Есть акции'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'checkbox control-item' },
        React.createElement(
          'label',
          null,
          React.createElement('input', { type: 'checkbox', onChange: this.filterCardCourier, name: 'somename' }),
          ' ',
          React.createElement(
            'span',
            { className: 'filter-name' },
            'Оплата картой курьеру'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'checkbox control-item' },
        React.createElement(
          'label',
          null,
          React.createElement('input', { type: 'checkbox', name: 'somename' }),
          ' ',
          React.createElement(
            'span',
            { className: 'filter-name' },
            'Онлайн оплата'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'checkbox control-item' },
        React.createElement(
          'label',
          null,
          React.createElement('input', { type: 'checkbox', name: 'somename' }),
          ' ',
          React.createElement(
            'span',
            { className: 'filter-name' },
            'Работает сейчас'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'checkbox control-item' },
        React.createElement(
          'label',
          null,
          React.createElement('input', { type: 'checkbox', name: 'somename' }),
          ' ',
          React.createElement(
            'span',
            { className: 'filter-name' },
            'Рядом со мной'
          )
        )
      )
    );
  }
});

module.exports = CompanyListSidebar;

},{}],26:[function(require,module,exports){
'use strict';

var _screens = require('../../screens.jsx');

var CuisinesStore = require('../stores/cuisinesStore.js');
var CompanyListActions = require('../actions/companyListActions.js');

var SingleCuisine = React.createClass({
    displayName: 'SingleCuisine',

    toggleCategory: function toggleCategory(cuisine) {
        CompanyListActions.selectByCuisine(this.props.cuisine);
        (0, _screens.showScreen)('pageCompanyList');
    },
    render: function render() {
        return React.createElement(
            'div',
            { onClick: this.toggleCategory, className: 'cuisine-select-item col-lg-4 col-xs-6 category-item', 'data-id': this.props.cuisine.cuisine_id },
            React.createElement(
                'a',
                { href: '#' },
                React.createElement(
                    'div',
                    { className: 'image' },
                    React.createElement('img', { src: imageBaseUrl + this.props.cuisine.cuisine_image, alt: '...' }),
                    React.createElement('div', { className: 'overlay' })
                ),
                React.createElement(
                    'div',
                    { className: 'food-type' },
                    React.createElement(
                        'b',
                        null,
                        this.props.cuisine.cuisine_name
                    ),
                    React.createElement(
                        'div',
                        { className: 'information' },
                        React.createElement(
                            'span',
                            { className: 'total total-delivery' },
                            React.createElement(
                                'span',
                                null,
                                'Доставка:'
                            ),
                            React.createElement(
                                'span',
                                { className: 'sum' },
                                ' ',
                                this.props.cuisine.delivery_count
                            )
                        ),
                        React.createElement(
                            'span',
                            { className: 'total total-delivery' },
                            React.createElement(
                                'span',
                                null,
                                'Бронь:'
                            ),
                            React.createElement(
                                'span',
                                { className: 'sum' },
                                ' ',
                                this.props.cuisine.reservations_count
                            )
                        )
                    )
                )
            )
        );
    }
});

var CuisinesSelectList = React.createClass({
    displayName: 'CuisinesSelectList',

    mixins: [Reflux.connect(CuisinesStore, 'cuisinesData')],
    limit: 5,
    getInitialState: function getInitialState() {
        return {
            data: [],
            cuisinesData: []
        };
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        var allCuisines = this.state.cuisinesData;
        var list = allCuisines.map(function (the, key) {
            if (key < 6) return React.createElement(SingleCuisine, { cuisine: the, key: key });
        });
        return React.createElement(
            'section',
            { className: 'the-tab tab-active main-categories types-grid' },
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'row', id: 'cuisinesList' },
                    list
                )
            )
        );
    }
});

module.exports = CuisinesSelectList;

},{"../../screens.jsx":48,"../actions/companyListActions.js":12,"../stores/cuisinesStore.js":42}],27:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 19:22:53
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-29 19:24:29
*/

var QuicklyLogo = React.createClass({
  displayName: "QuicklyLogo",

  render: function render() {
    return React.createElement(
      "svg",
      { className: "logo-svg zoomer-image", xmlns: "http://www.w3.org/2000/svg", id: "svg-quickly", "fill-rule": "evenodd", viewBox: "0 0 13214.144 12912.382", "clip-rule": "evenodd", "image-rendering": "optimizeQuality", "shape-rendering": "geometricPrecision", "text-rendering": "geometricPrecision" },
      React.createElement(
        "g",
        null,
        React.createElement(
          "g",
          null,
          React.createElement("path", _defineProperty({ className: "disappear svg-text", "fill-rule": "nonzero", d: "M2552.117 9764.941c-82.4915 24.232-156.2183 36.6058-220.1493 36.6058-163.4363 0-323.2637-48.9794-477.4198-147.4537-97.4433-62.8997-225.3052-172.201-384.617-327.3882-100.5365 11.3426-188.6994 17.014-264.4885 17.014-347.4957 0-636.7317-121.1596-867.1924-363.994C112.4296 8741.5302-.481 8448.1697-.481 8099.643c0-354.198 121.1596-645.4964 363.994-874.4105 238.71-224.7894 535.6796-336.6686 889.8777-336.6686 351.1047 0 638.2784 117.5503 860.49 353.6824 218.087 231.492 327.3883 524.337 327.3883 877.504 0 452.1567-176.8412 793.981-530.5237 1026.504 117.0348 168.0766 210.3534 286.6582 278.9245 355.2293 86.1006 85.0695 206.7445 172.7167 362.4473 263.4574zm-499.5894-1567.855c0-265.5196-74.2424-496.496-224.274-693.4445-163.4363-216.0247-374.3053-323.7793-634.6693-323.7793-244.3812 0-441.3298 82.4915-591.3613 247.9902-142.8135 159.3118-214.478 362.9628-214.478 608.8908 0 263.4573 75.2735 493.918 226.3362 691.8978 166.0142 216.0248 376.8833 323.7794 634.6694 323.7794 238.71 0 434.6273-84.0383 586.2055-253.146 144.876-161.8896 217.5716-362.4472 217.5716-602.1883zM4091.1 9309.1754h-395.4438v-280.9868l-250.0525 274.2844c-79.3982 27.3252-153.125 41.2457-219.6338 41.2457-183.5438 0-310.3745-53.6196-378.9456-160.343-52.5884-83.007-79.9137-221.696-80.945-417.098-1.031-57.744-.5155-140.2355 1.5468-247.4745 3.609-114.457 5.1558-196.9486 5.1558-249.0214 0-252.1148-24.232-459.3748-72.6957-621.78h464.5305c-43.8236 117.0348-65.4776 256.2393-65.4776 415.551v628.9982c0 123.2217 16.4983 207.7756 50.0105 254.177 40.2146 56.713 118.5816 85.0695 234.5853 85.0695 85.0694 0 187.6683-28.872 308.3122-86.616v-838.836c0-166.53-22.1696-319.1393-65.9933-458.3438H4091.1c-44.3392 142.298-65.9932 252.6304-65.9932 330.4818v806.8705c0 211.3846 21.654 385.648 65.9932 523.8213zm756.86-2089.0985c0 64.962-18.5606 122.7062-55.1662 174.779-41.7613 55.1662-93.834 83.007-156.2184 83.007-67.54 0-122.1906-26.294-164.983-79.398-38.1524-48.9794-57.2286-107.7546-57.2286-178.388 0-67.54 19.0762-125.7996 57.2285-175.81 41.7614-55.1663 95.381-83.0072 161.374-83.0072 61.3532 0 113.9416 28.3564 156.2185 85.0694 39.1835 51.5572 58.7752 109.817 58.7752 173.7478zm21.1385 2089.0985h-465.046c43.8235-135.5955 65.993-300.5786 65.993-494.9493v-622.2956c0-146.938-2.5778-239.741-6.7023-279.9557-6.7025-75.789-26.8098-163.4364-59.2908-263.973h465.046c-32.481 126.3152-52.5883 214.478-59.2907 262.9418-4.6402 42.7925-6.7025 131.471-6.7025 266.0353v637.2472c0 196.9486 21.654 361.416 65.9933 494.9493zm1494.1282-343.371l-130.9553 318.6236c-110.848 39.699-219.1182 59.2907-324.295 59.2907-246.959 0-443.392-76.8203-586.721-230.4608-140.2357-149.0005-210.3536-348.0113-210.3536-596.517 0-271.191 80.945-489.7937 243.35-654.7768 161.8898-166.0143 378.9457-248.5058 650.6522-248.5058 133.0176 0 239.741 11.858 320.1703 35.5745l-17.0138 387.7102c-76.8203-69.0867-131.9865-114.457-167.561-134.5644-59.2908-35.059-128.3775-53.104-205.7133-53.104-152.6094 0-272.7377 60.8376-361.9317 182.5126-78.8825 109.817-118.5816 243.35-118.5816 402.1463 0 182.5126 40.73 332.0285 122.1905 448.5478 93.8342 131.9865 227.883 197.9798 402.662 197.9798 118.066 0 246.4434-38.1524 384.1012-114.457zm1617.8655 343.371h-492.3714c7.7336-53.104-64.962-201.073-217.5715-443.9076-92.2874-141.2668-185.0904-282.018-278.409-423.2848v447.001c0 118.066 2.0623 190.7617 6.7025 218.6026 5.1557 43.308 25.263 110.3324 59.2908 201.5887h-465.046c32.481-87.6473 53.1038-170.1388 60.8374-245.4123 3.609-38.1524 5.1557-125.7997 5.1557-260.8796V7410.323c0-137.1423-22.1696-263.4574-65.9932-379.4612l465.046-93.834c-44.339 148.4847-65.9932 311.921-65.9932 489.278v997.1165c82.4916-118.066 164.983-237.1632 248.5058-356.776 112.395-180.9658 167.561-320.686 163.952-418.6446h551.6623c-130.9553 100.5366-244.3812 215.5092-341.8243 345.4334-15.4672 20.623-108.7858 160.8586-278.9246 421.2226 151.0627 236.6476 251.0837 391.8348 300.5786 464.015 117.5505 169.1076 232.0075 313.4678 344.4022 430.5027zm583.1122 0h-464.5306c43.8237-168.0765 65.9933-337.1842 65.9933-506.292V7571.1816c0-172.7167-22.1695-353.167-65.9932-540.3197l464.5306-93.834c-43.8237 230.9762-65.9933 436.6895-65.9933 616.1086v1288.415c0 161.8896 22.1697 317.5924 65.9934 467.624zm1744.1807-1661.1736c-111.879 159.3118-226.336 405.7553-344.9177 738.815-160.343 455.2502-260.8795 726.4412-300.5786 813.573-128.893 288.2047-277.8934 496.496-447.001 625.389H8800.852c139.72-116.0038 250.568-232.523 331.513-349.0424 68.571-97.9587 144.8757-240.2567 228.914-426.8938l-293.8762-722.3166c-124.7684-287.1738-252.6303-513.51-385.648-679.5243h457.828c24.7476 125.284 86.6163 313.468 184.575 564.036 73.7268 180.9658 146.4225 361.9317 218.6026 542.8975 62.3842-180.9658 124.253-362.4472 186.637-544.4442 72.6958-227.883 107.239-415.5512 103.63-562.4893h475.3577z" }, "className", "fil0")),
          React.createElement("path", _defineProperty({ className: "disappear svg-line", "fill-rule": "nonzero", d: "M6594.203 1912.7767c1257.9962-46.4015 2415.9713 421.738 3271.3056 1215.7192 831.1023 771.8115 1376.0622 1852.4508 1448.2423 3068.17l.5154 13.405-202.6198 7.7335 202.6198-7.7336c2.0623 30.4186 3.0935 60.3218 4.6402 90.7406 40.2146 1094.0442-308.3122 2112.2993-922.3587 2921.7476l-188.184-88.163c602.704-778.514 946.5906-1764.8035 907.407-2825.851-1.031-30.4188-2.5777-60.8375-4.1244-90.7407l-1.0312-11.3426c-69.0867-1160.553-589.8146-2192.213-1383.2802-2929.4813-817.182-758.4067-1923.5998-1205.4078-3125.3986-1161.0686-1202.3143 44.3393-2272.6422 571.7697-3031.5645 1388.436-758.4066 817.182-1205.4076 1923.6-1161.0684 3125.3986-146.938 4.6402-137.1422 22.6852-203.1355 7.7336-46.4014-1258.5117 421.7382-2415.9713 1215.7193-3271.3055 793.9812-854.8187 1914.3196-1406.9965 3172.3157-1453.398z" }, "className", "fil0")),
          React.createElement("path", _defineProperty({ className: "the-path disappear svg-red-angle", id: "svg-logo-red", fill: "#e80707", d: "M9674.2313 9575.726l3266.6654 1479.6923-1312.6468 1493.097z" }, "className", "fil2")),
          React.createElement("path", _defineProperty({ className: "the-path disappear svg-blue", id: "svg-logo-blue", fill: "#1620e0", d: "M1893.7314 6475.075l-1593.6337 2.0623c-2.0623-1716.3398 677.462-3363.593 1889.572-4578.7966l1123.9475 1120.854c-877.504 880.0816-1420.4014 2094.254-1420.4014 3435.2574 0 6.7025.5156 13.9206.5156 20.623z" }, "className", "fil3")),
          React.createElement("path", _defineProperty({ className: "the-path disappear svg-green", id: "svg-logo-green", fill: "#109634", d: "M3303.3057 3030.0216l-1131.1653-1128.072C3384.2506 686.2305 5029.4414 2.5817 6745.7814.004c945.0437-1.0313 1878.745 204.682 2736.1415 602.7037L8812.1945 2043.732c-624.358-291.2983-1319.8648-454.219-2054.0396-454.219-1351.3147 0-2573.2208 551.1466-3454.8493 1440.5086z" }, "className", "fil4")),
          React.createElement("path", _defineProperty({ className: "the-path disappear svg-yellow", id: "svg-logo-yellow", fill: "#f0c800", d: "M8800.852 2038.5763l668.697-1439.4776c2280.8915 1060.0165 3741.5075 3345.548 3744.601 5860.509 2.0622 1325.0207-402.662 2610.8577-1148.695 3689.9503l-1446.6955-735.7215c629.5137-819.7598 1003.819-1845.7485 1003.819-2959.3844 0-1957.112-1155.3972-3644.064-2821.7265-4415.8757z" }, "className", "fil5")),
          React.createElement("path", _defineProperty({ className: "the-path disappear svg-red", id: "svg-logo-red-2", fill: "#e00909", d: "M6600.39 12910.447c-2169.528-53.104-4062.1934-1170.3488-5192.8432-2839.7716h2080.8494c865.13 782.123 2011.7626 1259.0273 3269.7588 1259.0273 1071.359 0 2062.2887-345.949 2867.097-932.1545l768.2025 1394.6228c-1078.0615 735.7215-2388.646 1152.3038-3793.0646 1118.276z" }, "className", "fil6"))
        )
      )
    );
  }
});

module.exports = QuicklyLogo;

},{}],28:[function(require,module,exports){
'use strict';

var _screens = require('../../screens.jsx');

/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 20:59:52
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-30 02:26:15
*/

var CuisinesList = require('../cuisinesList.react.jsx');
var MenuItemsActions = require('../actions/menuItemsActions.js');
var CategoriesListActions = require('../actions/categoriesListActions.js');
var CompanyDetailsActions = require('../actions/companyDetailsActions.js');


//<span className="desc"><i>наличными</i><i>картой курьеру</i></span>
//<span className="desc">только наличные</span>

var PaymentTypes = React.createClass({
    displayName: 'PaymentTypes',

    render: function render() {
        console.log('payment: ', this.props.type);
        if (this.props.type == 0) return React.createElement(
            'div',
            { className: 'payment-type' },
            React.createElement(
                'div',
                { className: 'payment-icons' },
                React.createElement(
                    'span',
                    null,
                    React.createElement('i', { className: 'pay-icon fi-payment-cash' })
                )
            ),
            React.createElement(
                'div',
                { className: 'payment-text' },
                React.createElement(
                    'span',
                    null,
                    'только наличными'
                )
            )
        );
        if (this.props.type == 1) return React.createElement(
            'div',
            { className: 'payment-type' },
            React.createElement(
                'div',
                { className: 'payment-icons' },
                React.createElement(
                    'span',
                    null,
                    React.createElement('i', { className: 'pay-icon fi-card-detail' })
                ),
                React.createElement(
                    'span',
                    null,
                    React.createElement('i', { className: 'pay-icon fi-payment-cash' })
                )
            ),
            React.createElement(
                'div',
                { className: 'payment-text' },
                React.createElement(
                    'span',
                    null,
                    'наличными'
                ),
                React.createElement(
                    'span',
                    null,
                    'картой курьеру'
                )
            )
        );
    }
});

var PaymentTypesCards = React.createClass({
    displayName: 'PaymentTypesCards',

    render: function render() {
        console.log('payment: ', this.props.type);
        if (this.props.type == 0) return React.createElement(
            'div',
            { className: 'payment-type' },
            React.createElement(
                'div',
                { className: 'payment-icons' },
                React.createElement(
                    'span',
                    null,
                    React.createElement('i', { className: 'pay-icon fi-payment-cash' })
                )
            ),
            React.createElement(
                'div',
                { className: 'payment-text' },
                React.createElement(
                    'span',
                    null,
                    'только наличными'
                )
            )
        );
        if (this.props.type == 1) return React.createElement(
            'div',
            { className: 'payment-type' },
            React.createElement(
                'div',
                { className: 'payment-icons' },
                React.createElement(
                    'span',
                    null,
                    React.createElement('i', { className: 'pay-icon fi-card-detail' })
                ),
                React.createElement(
                    'span',
                    null,
                    React.createElement('i', { className: 'pay-icon fi-payment-cash' })
                )
            ),
            React.createElement(
                'div',
                { className: 'payment-text' },
                React.createElement(
                    'span',
                    null,
                    'наличными'
                ),
                React.createElement(
                    'span',
                    null,
                    'картой курьеру'
                )
            )
        );
    }
});

var StarYes = React.createClass({
    displayName: 'StarYes',

    render: function render() {
        return React.createElement('i', { className: 'fa yes fa-star' });
    }
});

var StarNo = React.createClass({
    displayName: 'StarNo',

    render: function render() {
        return React.createElement('i', { className: 'fa yes fa-star-o' });
    }
});

var RatingStars = React.createClass({
    displayName: 'RatingStars',

    render: function render() {
        var count = this.props.count;
        var stars = '';
        for (var i = 0; i < count; i++) {
            stars += '<i className="fa yes fa-star"></i>';
        }
        return React.createElement(
            'div',
            { className: 'rating' },
            stars
        );
    }
});

var SingleCompany = React.createClass({
    displayName: 'SingleCompany',

    toggleCompany: function toggleCompany(el) {
        var company = this.props.company.restaurant_id;
        console.log('SingleCompany: Next ID: ', company);
        currentCompany = company;
        CompanyDetailsActions.updateData(company);
        MenuItemsActions.updateData(company);
        CategoriesListActions.updateData(company);
        (0, _screens.showScreen)('pageCompany');
    },
    render: function render() {
        var total = 0;
        var that = this.props.company;
        var paymentType;

        var imageUrl = imageBaseUrl + that.restaurant_main_image;
        var bgImage = imageBaseUrl + that.restaurant_interior_image;

        var style = { backgroundImage: 'url(' + bgImage + ')' };

        var cardsPaymentStyle = { display: 'none' };

        var rating = that.restaurant_rating;
        var online;

        if (that.restaurant_online_payment == 1) {
            online = "онлайн оплата";
        }

        if (that.restaurant_payment_type == 0) {
            cardsPaymentStyle = { display: 'inline-block' };
        }

        return React.createElement(
            'div',
            { className: 'col-lg-6' },
            React.createElement(
                'section',
                { style: style, onClick: this.toggleCompany, className: 'company-item company-toggle', 'data-company': that.restaurant_id },
                React.createElement(
                    'div',
                    { className: 'the-box row' },
                    React.createElement(
                        'div',
                        { className: 'company-logo col-lg-3 col-xs-4 col-sm-4' },
                        React.createElement(
                            'div',
                            { className: 'image-thumb' },
                            React.createElement('img', { src: imageUrl })
                        ),
                        React.createElement(
                            'div',
                            { className: 'c-payment' },
                            React.createElement('img', { style: cardsPaymentStyle, src: 'images/cards/mastercard.png', alt: '...' }),
                            React.createElement('img', { style: cardsPaymentStyle, src: 'images/cards/visa.png', alt: '...' }),
                            React.createElement(
                                'div',
                                { className: 'is-online' },
                                online
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'company-description col-lg-9 col-xs-8 col-sm-8' },
                        React.createElement(
                            'h2',
                            null,
                            that.restaurant_name,
                            React.createElement(
                                'div',
                                { className: 'rating' },
                                rating
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'address' },
                            React.createElement(
                                'span',
                                null,
                                that.restaurant_address
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'text-line cuisines-list' },
                            React.createElement(
                                'span',
                                { className: 'text-line' },
                                React.createElement(CuisinesList, { cuisines: that.restaurant_cuisines })
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row btm-line' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-3 col-xs-3 kal' },
                                React.createElement(
                                    'div',
                                    { className: 'box-info' },
                                    React.createElement(
                                        'b',
                                        { className: 'value' },
                                        that.restaurant_min_order,
                                        ' ',
                                        React.createElement('i', { className: 'fa fa-rouble' })
                                    ),
                                    React.createElement(
                                        'span',
                                        { className: 'description' },
                                        'заказ от'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-lg-3 col-xs-3 kal' },
                                React.createElement(
                                    'div',
                                    { className: 'box-info' },
                                    React.createElement(
                                        'b',
                                        { className: 'value' },
                                        that.restaurant_delivery_cost,
                                        ' ',
                                        React.createElement('i', { className: 'fa fa-rouble' })
                                    ),
                                    React.createElement(
                                        'span',
                                        { className: 'description' },
                                        'доставка'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-lg-3 col-xs-3 kal' },
                                React.createElement(
                                    'div',
                                    { className: 'box-info' },
                                    React.createElement(
                                        'b',
                                        { className: 'value' },
                                        that.restaurant_delivery_time,
                                        ' ',
                                        React.createElement('i', { className: 'icon icon-clock' })
                                    ),
                                    React.createElement(
                                        'span',
                                        { className: 'description' },
                                        'время'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-lg-3 col-xs-3 kal' },
                                React.createElement(
                                    'div',
                                    { className: 'box-info' },
                                    React.createElement(
                                        'b',
                                        { className: 'value' },
                                        that.restaurant_average_check,
                                        ' ',
                                        React.createElement('i', { className: 'fa fa-rouble' })
                                    ),
                                    React.createElement(
                                        'span',
                                        { className: 'description' },
                                        'средний чек'
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'c-payment mobile' },
                            React.createElement('img', { style: cardsPaymentStyle, src: 'images/cards/mastercard.png', alt: '...' }),
                            React.createElement('img', { style: cardsPaymentStyle, src: 'images/cards/visa.png', alt: '...' }),
                            React.createElement(
                                'div',
                                { className: 'is-online' },
                                online
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row btm-line mobile' },
                    React.createElement(
                        'div',
                        { className: 'col-lg-3 col-xs-3 kal' },
                        React.createElement(
                            'div',
                            { className: 'box-info' },
                            React.createElement(
                                'b',
                                { className: 'value' },
                                that.restaurant_min_order,
                                ' ',
                                React.createElement('i', { className: 'fa fa-rouble' })
                            ),
                            React.createElement(
                                'span',
                                { className: 'description' },
                                'заказ от'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-lg-3 col-xs-3 kal' },
                        React.createElement(
                            'div',
                            { className: 'box-info' },
                            React.createElement(
                                'b',
                                { className: 'value' },
                                that.restaurant_delivery_cost,
                                ' ',
                                React.createElement('i', { className: 'fa fa-rouble' })
                            ),
                            React.createElement(
                                'span',
                                { className: 'description' },
                                'доставка'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-lg-3 col-xs-3 kal' },
                        React.createElement(
                            'div',
                            { className: 'box-info' },
                            React.createElement(
                                'b',
                                { className: 'value' },
                                that.restaurant_delivery_time,
                                ' ',
                                React.createElement('i', { className: 'icon icon-clock' })
                            ),
                            React.createElement(
                                'span',
                                { className: 'description' },
                                'время'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-lg-3 col-xs-3 kal' },
                        React.createElement(
                            'div',
                            { className: 'box-info' },
                            React.createElement(
                                'b',
                                { className: 'value' },
                                that.restaurant_average_check,
                                ' ',
                                React.createElement('i', { className: 'fa fa-rouble' })
                            ),
                            React.createElement(
                                'span',
                                { className: 'description' },
                                'средний чек'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'the-footer' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'align-left col-xs-6 col-lg-6' },
                            React.createElement(
                                'div',
                                { className: 'comments-count' },
                                React.createElement('i', { className: 'icon fi-comment' }),
                                React.createElement(
                                    'span',
                                    { className: 'count' },
                                    that.restaurant_comments_count
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'align-right col-xs-6 col-lg-6' },
                            React.createElement(
                                'div',
                                { className: 'right-icons' },
                                React.createElement(
                                    'button',
                                    { className: 'bt-round delivery' },
                                    React.createElement('i', { className: 'icon fi-dish' })
                                ),
                                React.createElement(
                                    'button',
                                    { className: 'bt-round reservation' },
                                    React.createElement('i', { className: 'icon fi-table' })
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});

module.exports = SingleCompany;

},{"../../screens.jsx":48,"../actions/categoriesListActions.js":9,"../actions/companyDetailsActions.js":11,"../actions/menuItemsActions.js":14,"../cuisinesList.react.jsx":29}],29:[function(require,module,exports){
'use strict';

var CuisinesStore = require('./stores/cuisinesStore.js');

var CuisinesList = React.createClass({
    displayName: 'CuisinesList',

    mixins: [Reflux.connect(CuisinesStore, 'cuisinesData')],
    limit: 3,
    getInitialState: function getInitialState() {
        return {
            data: [],
            cuisinesData: []
        };
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        var companyCuisines = JSON.parse(this.props.cuisines);
        var limit = this.limit;
        var allCuisines = getStorage('cuisines');

        var sorted = _.sortBy(allCuisines, function (o) {
            return o.cuisine_id;
        });

        console.log('CuisinesList: sorted = ', sorted);
        var totalList = companyCuisines.map(function (the, key) {
            if (key < limit) {
                var pick = sorted[key + 1];
                return React.createElement(
                    'button',
                    { className: 'button light button-cuisine', key: key },
                    pick.cuisine_name
                );
            }
        });
        return React.createElement(
            'div',
            { className: 'cuisinesList' },
            totalList
        );
    }
});

module.exports = CuisinesList;

},{"./stores/cuisinesStore.js":42}],30:[function(require,module,exports){
'use strict';

var _screens = require('../screens.jsx');

var CuisinesStore = require('./stores/cuisinesStore.js');
var QuicklyLogo = require('./components/quicklyLogo.js');
var ButtonBack = require('./components/buttonBack.js');
var CuisinesSelectList = require('./components/cuisinesSelectList.js');
var CityList = require('./cityList.react.jsx');
var CampaignsSlider = require('./components/campaignsSlider.js');

var ButtonBackTop = React.createClass({
    displayName: 'ButtonBackTop',

    render: function render() {
        React.createElement(ButtonBack, null);
    }
});

var MainPageHeader = React.createClass({
    displayName: 'MainPageHeader',

    render: function render() {
        return React.createElement(
            'section',
            { className: 'main-header' },
            React.createElement(CampaignsSlider, null)
        );
    }
});

var ButtonBack = React.createClass({
    displayName: 'ButtonBack',

    render: function render() {
        return React.createElement(
            'div',
            { className: 'button-back' },
            React.createElement('i', { className: 'icon-arrow-left' })
        );
    }
});

ReactDOM.render(React.createElement(MainPageHeader, null), document.getElementById('mainPageHeader'));
ReactDOM.render(React.createElement(CuisinesSelectList, null), document.getElementById('cuisinesSelectList'));

},{"../screens.jsx":48,"./cityList.react.jsx":18,"./components/buttonBack.js":21,"./components/campaignsSlider.js":24,"./components/cuisinesSelectList.js":26,"./components/quicklyLogo.js":27,"./stores/cuisinesStore.js":42}],31:[function(require,module,exports){
'use strict';

/*
* @Author: Andrey Starkov
* @Date:   2016-03-24 17:32:25
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-24 17:41:56
*/

var MenuItemsStore = require('./stores/menuItemsStore.js');
var CategoriesListActions = require('./actions/categoriesListActions.js');
var CategoriesList = require('./categoriesList.react.jsx');

var SingleMenuItem = React.createClass({
    displayName: 'SingleMenuItem',

    addToCart: function addToCart(e) {
        console.log('clicked', this.props.item.restaurant_id);
    },
    render: function render() {
        var item = this.props.item;
        var itemImage = imageBaseUrl + item.menu_item_image;
        if (item.menu_item_image === undefined || item.menu_item_image === null || item.menu_item_image == '') {
            itemImage = 'images/samples/2.png';
        }
        console.log(this.props.item, this.props.item.restaurant_id);
        return React.createElement(
            'div',
            { className: 'col-lg-4 col-xs-6 food-item' },
            React.createElement(
                'div',
                { className: 'inner' },
                React.createElement(
                    'div',
                    { className: 'product-image' },
                    React.createElement('img', { src: itemImage }),
                    React.createElement(
                        'div',
                        { className: 'product-controls' },
                        React.createElement(
                            'button',
                            { onClick: this.addToCart, className: 'button main add-to-cart',
                                'data-name': item.menu_item_name,
                                'data-price': item.menu_item_price,
                                'data-id': item.menu_item_id, 'data-restaurant': item.restaurant_id },
                            'В корзину'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'product-info' },
                    React.createElement(
                        'div',
                        { className: 'major' },
                        React.createElement(
                            'div',
                            { className: 'product-name' },
                            React.createElement(
                                'b',
                                null,
                                item.menu_item_name
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'product-price' },
                            React.createElement(
                                'span',
                                null,
                                item.menu_item_price,
                                ' ',
                                React.createElement(
                                    'i',
                                    { className: 'rouble' },
                                    'i'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'product-description' },
                        React.createElement(
                            'span',
                            null,
                            item.menu_item_full_description
                        )
                    )
                )
            )
        );
    }
});

var MenuItemsSidebar = React.createClass({
    displayName: 'MenuItemsSidebar',

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'button-close', id: 'menu-close' },
                React.createElement('i', { className: 'icon-close' })
            ),
            React.createElement(
                'div',
                { className: 'button-open', id: 'menu-open' },
                React.createElement('i', { className: 'icn-menu' })
            ),
            React.createElement(
                'div',
                { className: 'sidebar-wrap' },
                React.createElement(
                    'div',
                    { className: 'form-group label-floating is-empty' },
                    React.createElement(
                        'label',
                        { htmlFor: 'i5', className: 'control-label' },
                        'Поиск блюда'
                    ),
                    React.createElement('input', { type: 'search', className: 'form-control', id: 'i5' }),
                    React.createElement('span', { className: 'help-block' }),
                    React.createElement('span', { className: 'material-input' })
                ),
                React.createElement(CategoriesList, null)
            )
        );
    }
});

var MenuItemsList = React.createClass({
    displayName: 'MenuItemsList',

    mixins: [Reflux.connect(MenuItemsStore, 'menuItems')],
    getInitialState: function getInitialState() {
        return {
            data: [],
            menuItems: []
        };
    },
    componentWillMount: function componentWillMount() {
        // sure it will
    },
    render: function render() {
        var theData = this.state.menuItems;
        var total = 0;
        var items = theData.map(function (the, i) {
            return React.createElement(SingleMenuItem, { item: the, key: i });
        });
        return React.createElement(
            'div',
            null,
            items
        );
    }
});

var MenuItems = React.createClass({
    displayName: 'MenuItems',

    render: function render() {
        return React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-lg-9' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(MenuItemsList, null)
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-3 mobile sidebar', id: 'sidebar' },
                React.createElement(MenuItemsSidebar, null)
            )
        );
    }
});

ReactDOM.render(React.createElement(MenuItems, null), document.getElementById('menuItems'));

},{"./actions/categoriesListActions.js":9,"./categoriesList.react.jsx":17,"./stores/menuItemsStore.js":43}],32:[function(require,module,exports){
'use strict';

var _addToCart = require('../engine/addToCart.js');

var ButtonMore = require('./components/buttonMore.js');

var OrdersHistoryStore = require('./stores/ordersHistoryStore.js');

var SingleOrderItem = React.createClass({
    displayName: 'SingleOrderItem',

    render: function render() {
        var single = this.props.item,
            thumb = 'http://fakeimg.pl/37x37/ddd/';
        if (single.menu_item_image !== '') thumb = imageBaseUrl + single.menu_item_image;
        var idAttr = "singleItem-" + single.menu_item_id;
        return React.createElement(
            'div',
            { className: 'item', id: idAttr },
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-lg-3 no-padding-right align-right' },
                    React.createElement(
                        'div',
                        { className: 'thumb-tiny' },
                        React.createElement('img', { src: thumb })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-lg-9 no-padding-left' },
                    React.createElement(
                        'div',
                        { className: 'text' },
                        React.createElement(
                            'b',
                            null,
                            single.menu_item_name
                        ),
                        React.createElement(
                            'span',
                            { className: 'price' },
                            single.menu_item_price * single.count,
                            ' ',
                            React.createElement(
                                'i',
                                { className: 'rouble' },
                                'o'
                            ),
                            ',  ',
                            React.createElement(
                                'span',
                                { className: 'count' },
                                single.count,
                                ' шт.'
                            )
                        )
                    )
                )
            )
        );
    }
});

var SingleOrder = React.createClass({
    displayName: 'SingleOrder',

    repeatThis: function repeatThis() {
        (0, _addToCart.repeatOrder)(this.props.list.order_menu_items);
    },
    render: function render() {
        var total = 0;
        var data = this.props.list;
        console.log('DATA signle: ', data);

        var items = data.order_menu_items.map(function (the, i) {
            total += the.menu_item_price * the.count;
            return React.createElement(SingleOrderItem, { item: the, key: i });
        });

        return React.createElement(
            'div',
            { className: 'history-item row', key: this.props.key },
            React.createElement(
                'div',
                { className: 'date-time' },
                moment.unix(data.created_at).format("DD MMMM YYYY HH:mm")
            ),
            React.createElement(
                'div',
                { className: 'col-lg-2' },
                React.createElement(
                    'div',
                    { className: 'box-company medium' },
                    React.createElement(
                        'div',
                        { className: 'thumb-round' },
                        React.createElement('img', { src: imageBaseUrl + data.restaurant_main_image, alt: '...' })
                    ),
                    React.createElement(
                        'span',
                        { className: 'title' },
                        data.restaurant_name
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-5' },
                React.createElement(
                    'div',
                    { className: 'history-items' },
                    items
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-2 summary' },
                React.createElement(
                    'div',
                    { className: 'total' },
                    React.createElement(
                        'span',
                        { className: 'total-title' },
                        'итого:'
                    ),
                    React.createElement(
                        'b',
                        { className: 'sum-total' },
                        total,
                        ' ',
                        React.createElement(
                            'i',
                            { className: 'rouble' },
                            'o'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'bonus' },
                    React.createElement(
                        'span',
                        { className: 'total-title' },
                        React.createElement('i', { className: 'r fa fa-rub' }),
                        '-бонусов'
                    ),
                    React.createElement(
                        'b',
                        { className: 'sum-bonus' },
                        '+ ',
                        data.bonus
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-3 actions' },
                React.createElement(
                    'span',
                    { className: 'title' },
                    'поделится:'
                ),
                React.createElement(
                    'div',
                    { className: 'social-share' },
                    React.createElement(
                        'a',
                        { href: '#' },
                        React.createElement('i', { className: 'fa fa-facebook' })
                    ),
                    React.createElement(
                        'a',
                        { href: '#' },
                        React.createElement('i', { className: 'fa fa-vk' })
                    ),
                    React.createElement(
                        'a',
                        { href: '#' },
                        React.createElement('i', { className: 'fa fa-twitter' })
                    ),
                    React.createElement(
                        'a',
                        { href: '#' },
                        React.createElement('i', { className: 'fa fa-odnoklassniki' })
                    )
                ),
                React.createElement(
                    'button',
                    { onClick: this.repeatThis, className: 'button light round button-history-repeat', id: 'button-history-repeat' },
                    React.createElement('i', { className: 'icon-refresh' }),
                    React.createElement(
                        'span',
                        null,
                        'Повторить заказ'
                    )
                )
            )
        );
    }
});

var OrdersHistory = React.createClass({
    displayName: 'OrdersHistory',

    mixins: [Reflux.connect(OrdersHistoryStore, 'historyData')],
    limit: 5,
    getInitialState: function getInitialState() {
        return {
            data: [],
            historyData: []
        };
    },
    componentDidMount: function componentDidMount() {
        //   OrdersHistoryActions.updateData();
    },
    loadMore: function loadMore() {
        this.limit += 5;
        OrdersHistoryActions.updateData();
    },
    render: function render() {
        //   OrdersHistoryActions.updateData();
        var theData = this.state.historyData;
        var total = 0;
        var sorted = _.first(_.sortBy(theData, 'order_id').reverse(), this.limit);
        var messages = sorted.map(function (the, i) {
            return React.createElement(SingleOrder, { list: the, key: i });
        });
        return React.createElement(
            'div',
            null,
            messages,
            React.createElement(
                'div',
                { className: 'full-width align-center' },
                React.createElement(ButtonMore, { onClick: this.loadMore })
            )
        );
    }
});

ReactDOM.render(React.createElement(OrdersHistory, null), document.getElementById('ordersHistory'));

},{"../engine/addToCart.js":2,"./components/buttonMore.js":22,"./stores/ordersHistoryStore.js":44}],33:[function(require,module,exports){
'use strict';

var _profile = require('../profile.jsx');

var ButtonMore = require('./components/buttonMore.js');
var ProfileEditorStore = require('./stores/profileEditorStore.js');
var ProfileEditorActions = require('./actions/profileEditorActions.js');
var CardsActions = require('./actions/cardsActions.js');
var CardsStore = require('./stores/cardsStore.js');
var ButtonTabToggle = require('./components/buttonTabToggle.js');

var FieldDefault = React.createClass({
  displayName: 'FieldDefault',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'form-group' },
      React.createElement(
        'label',
        { className: 'control-label', htmlFor: this.props.id },
        this.props.name
      ),
      React.createElement('input', {
        type: this.props.type || "text",
        className: 'form-control profile-autoupdate',
        'data-id': this.props.field,
        onChange: this.props.onChange,
        id: this.props.id })
    );
  }
});

var FieldControlled = React.createClass({
  displayName: 'FieldControlled',

  getInitialState: function getInitialState() {
    console.log('FieldControlled: default = ', this.props.defaultValue);
    return {
      value: this.props.defaultValue
    };
  },
  componentWillUpdate: function componentWillUpdate() {
    console.log('FieldControlled: willUpdate');
  },
  componentDidUpdate: function componentDidUpdate() {
    console.log('FieldControlled: didUpdate');
  },
  handleChange: function handleChange(event) {
    this.setState({
      value: event.target.value
    });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'form-group' },
      React.createElement(
        'label',
        { className: 'control-label', htmlFor: this.props.id },
        this.props.name
      ),
      React.createElement('input', { type: this.props.type || "text", className: 'form-control profile-autoupdate',
        value: this.state.value,
        'data-id': this.props.field,
        onChange: this.handleChange,
        id: this.props.id })
    );
  }
});

var CardsEditor = React.createClass({
  displayName: 'CardsEditor',

  mixins: [Reflux.connect(CardsStore, 'cardsData')],
  bindUrl: serverUrl + '/api/v3/payments/cards/bind/' + userToken,
  getInitalState: function getInitalState() {
    return {
      cardsData: []
    };
  },
  bindCard: function bindCard() {
    $.getJSON(this.bindUrl, function (data) {
      console.log('CardsEditor bindCard', data.result);
      openNewTab(data.result);
    });
  },
  render: function render() {
    console.log('CardsEditor: ', this.state.cardsData);
    return React.createElement(
      'div',
      { className: 'cards-editor' },
      React.createElement(
        'b',
        { className: 'group-title' },
        'Банковские карты'
      ),
      React.createElement(
        'div',
        { className: 'profile-cards' },
        React.createElement(
          'div',
          { className: 'card-item' },
          React.createElement('i', { className: 'fi-card-detail' }),
          React.createElement(
            'span',
            { className: 'number' },
            '**** **** **** 1125'
          )
        )
      ),
      React.createElement(
        'button',
        { onClick: this.bindCard, className: 'button main' },
        'Добавить карту'
      )
    );
  }
});

var ProfileEditorForm = React.createClass({
  displayName: 'ProfileEditorForm',

  getInitalState: function getInitalState() {
    console.log('ProfileEditorForm getInitalState');
  },
  componentWillUpdate: function componentWillUpdate() {
    console.log('ProfileEditorForm willUpdate');
  },
  componentDidUpdate: function componentDidUpdate() {
    console.log('ProfileEditorForm didUpdate');
    $('#userSurname').val(this.props.profile.userSurname);
    $('#userName').val(this.props.profile.userName);
    $('#userEmail').val(this.props.profile.userEmail);

    var birthDate = moment.unix(this.props.profile.userBirthdate).format("YYYY-MM-DD");
    $('#userBirthdate').val(birthDate);
  },
  onFieldChange: function onFieldChange(value) {
    console.log('ProfileEditorForm onFieldChange: value = ', value.target);
  },
  onBirthChange: function onBirthChange(e) {
    console.log('onBirthChange: ', e.target.value);
  },
  onNameChange: function onNameChange(e) {
    this.setState({
      userName: e.target.value
    });
  },
  addCardForm: function addCardForm() {
    swal({
      title: 'Введите номер карты',
      html: '<input id="inputCardNumber" type="text" className="form-control">',
      showCancelButton: true,
      closeOnConfirm: false,
      allowOutsideClick: false
    }, function () {
      swal({
        html: 'Номер карты: <strong>' + $('#inputCardNumber').val() + '</strong>'
      });
    });
  },
  setGender: function setGender(e) {
    console.log('setGender: ', e.target.value);
    this.editUserField('gender', e.target.value);
  },
  editUserField: function editUserField(theParameter, theValue) {
    var currentCity = getStorage('city');
    var cityId = currentCity.city_id || 3;

    var theOptions = {};
    theOptions['userToken'] = userToken;
    theOptions['cityId'] = cityId;
    theOptions[theParameter] = theValue;

    console.log('ProfileEditorForm: editUserField: Options: ', theOptions);

    $.ajax({
      url: serverUrl + '/api/v2/user/profile/edit',
      dataType: 'json',
      type: 'POST',
      data: theOptions,
      success: function success(data) {
        console.log('ProfileEditorForm: editUserField: ', data);
        if (data.err === undefined || data.err === null) {
          toastr.success('Данные профиля сохранены');
        }
        (0, _profile.refreshUserProfile)();
      }
    });
  },
  render: function render() {
    var total = 0;
    var profile = this.props.profile;
    var userAvatar, maleChecked, femaleChecked;

    console.log('ProfileEditorForm: profile = ', profile);

    if (profile.userAvatarUrl === undefined || profile.userAvatarUrl === null) {
      userAvatar = 'images/samples/user.png';
    } else userAvatar = profile.userAvatarUrl;

    if (profile.userGender == 1) {
      maleChecked = "checked";
      $('#profileMaleRadio').prop('checked', true);
    }

    if (profile.userGender == 2) {
      femaleChecked = "checked";
      $('#profileFemaleRadio').prop('checked', true);
    }

    return React.createElement(
      'div',
      { className: 'user-editor container' },
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col-lg-2 text-center' },
          React.createElement(
            'div',
            { className: 'avatar round' },
            React.createElement('img', { src: userAvatar, alt: '...' })
          ),
          React.createElement(
            'div',
            { className: 'form-group gender-select' },
            React.createElement(
              'div',
              { className: 'radio radio-primary' },
              React.createElement(
                'label',
                null,
                React.createElement('input', { onChange: this.setGender, type: 'radio', id: 'profileMaleRadio', name: 'profileGender', 'data-id': 'gender', value: '1' }),
                React.createElement(
                  'span',
                  { className: 'radio-label-text' },
                  'Мужской'
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'radio radio-primary' },
              React.createElement(
                'label',
                null,
                React.createElement('input', { onChange: this.setGender, type: 'radio', id: 'profileFemaleRadio', name: 'profileGender', 'data-id': 'gender', value: '2' }),
                React.createElement(
                  'span',
                  { className: 'radio-label-text' },
                  'Женский'
                )
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'col-lg-5 the-info' },
          React.createElement(
            'div',
            { className: 'row delivery' },
            React.createElement(
              'div',
              { className: 'profile-field col-lg-6' },
              React.createElement(FieldControlled, { type: 'text', field: 'name', defaultValue: profile.userName, name: 'Имя', id: 'userName' })
            ),
            React.createElement(
              'div',
              { className: 'profile-field col-lg-6' },
              React.createElement(FieldControlled, { type: 'text', field: 'surname', defaultValue: profile.userSurname, name: 'Фамилия', id: 'userSurname' })
            ),
            React.createElement(
              'div',
              { className: 'profile-field col-lg-6' },
              React.createElement(FieldControlled, { type: 'date', field: 'birthdate', defaultValue: profile.userBirthdate, name: 'Дата рождения', id: 'userBirthdate' })
            ),
            React.createElement(
              'div',
              { className: 'profile-field col-lg-6' },
              React.createElement(FieldControlled, { type: 'text', field: 'email', defaultValue: profile.userEmail, name: 'Электронная почта', id: 'userEmail' })
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'col-lg-5' },
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col-lg-6' },
              React.createElement(CardsEditor, null)
            ),
            React.createElement('div', { className: 'col-lg-6' })
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'row buttons-line' },
        React.createElement('div', { className: 'col-lg-2' }),
        React.createElement(
          'div',
          { className: 'col-lg-10 buttons-tabs' },
          React.createElement(
            'div',
            { className: 'btn-group btn-group-justified', 'data-tabs': 'tabs-profile' },
            React.createElement(ButtonTabToggle, { name: 'История заказов', active: 'true', tab: 'tab-order-history', id: 'tabOrdersHistory' }),
            React.createElement(ButtonTabToggle, { name: 'История бронирования', tab: 'tab-reservation-history' }),
            React.createElement(ButtonTabToggle, { name: 'Оставленные отзывы', tab: 'tab-comments-history' }),
            React.createElement(
              'button',
              { id: 'buttonReturnShop', className: 'btn button main float-right' },
              React.createElement(
                'span',
                null,
                'Вернуться к покупкам'
              )
            )
          )
        )
      )
    );
  }
});

var ProfileEditor = React.createClass({
  displayName: 'ProfileEditor',

  mixins: [Reflux.connect(ProfileEditorStore, 'profileData')],
  getInitialState: function getInitialState() {
    return {
      data: [],
      profileData: []
    };
  },
  /*        profileData: {
            userAvatarUrl: '',
            userBirthdate: null,
            userEmail: '',
            userGender: 0,
            userName: '',
            userSurname: '',
            userPhone: ''
          }*/
  componentDidMount: function componentDidMount() {
    ProfileEditorActions.updateData();
  },
  render: function render() {
    //   profileEditorActions.updateData();
    var theData = this.state.profileData;
    console.log('ProfileEditor: theData = ', theData);
    return React.createElement(ProfileEditorForm, { profile: theData });
  }
});

ReactDOM.render(React.createElement(ProfileEditor, null), document.getElementById('profileEditor'));

},{"../profile.jsx":6,"./actions/cardsActions.js":8,"./actions/profileEditorActions.js":15,"./components/buttonMore.js":22,"./components/buttonTabToggle.js":23,"./stores/cardsStore.js":37,"./stores/profileEditorStore.js":45}],34:[function(require,module,exports){
'use strict';

var ButtonMore = require('./components/buttonMore.js');
var ReservationHistoryStore = require('./stores/reservationHistoryStore.js');

var SingleReservation = React.createClass({
    displayName: 'SingleReservation',

    render: function render() {
        var total = 0;
        var data = this.props.list;
        // console.log('SingleReservation: data = ', data);

        return React.createElement(
            'div',
            { className: 'history-item row', key: this.props.key },
            React.createElement(
                'div',
                { className: 'date-time' },
                moment.unix(data.reservation_date).format("DD MMMM YYYY HH:mm")
            ),
            React.createElement(
                'div',
                { className: 'col-lg-2' },
                React.createElement(
                    'div',
                    { className: 'box-company medium' },
                    React.createElement(
                        'div',
                        { className: 'thumb-round' },
                        React.createElement('img', { src: imageBaseUrl + data.restaurant_main_image, alt: '...' })
                    ),
                    React.createElement(
                        'span',
                        { className: 'title' },
                        data.restaurant_name
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-5' },
                React.createElement(
                    'div',
                    { className: 'history-items' },
                    React.createElement(
                        'div',
                        { className: 'item item-table' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-3 no-padding-right align-right' },
                                React.createElement(
                                    'div',
                                    { className: 'icon-reservation' },
                                    React.createElement('i', { className: 'icon-anchor' })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-lg-9' },
                                React.createElement(
                                    'div',
                                    { className: 'text' },
                                    React.createElement(
                                        'div',
                                        { className: 'table-num' },
                                        'Столик №',
                                        React.createElement(
                                            'b',
                                            null,
                                            data.table_number
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'hall' },
                                        'Зал: ',
                                        React.createElement(
                                            'span',
                                            { className: 'hall-name' },
                                            data.hall_name
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'reservation-date' },
                                        moment.unix(data.reservation_date).format("DD MMMM YYYY HH:mm")
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-2 summary' },
                React.createElement(
                    'div',
                    { className: 'total' },
                    React.createElement(
                        'span',
                        { className: 'total-title' },
                        'итого:'
                    ),
                    React.createElement(
                        'b',
                        { className: 'sum-total' },
                        total,
                        ' ',
                        React.createElement(
                            'i',
                            { className: 'rouble' },
                            'o'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'bonus' },
                    React.createElement(
                        'span',
                        { className: 'total-title' },
                        React.createElement('i', { className: 'r fa fa-rub' }),
                        '-бонусов'
                    ),
                    React.createElement(
                        'b',
                        { className: 'sum-bonus' },
                        '+ ',
                        data.bonus
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'col-lg-3 actions' },
                React.createElement(
                    'span',
                    { className: 'title' },
                    'поделится:'
                ),
                React.createElement(
                    'div',
                    { className: 'social-share' },
                    React.createElement(
                        'a',
                        { href: '#' },
                        React.createElement('i', { className: 'fa fa-facebook' })
                    ),
                    React.createElement(
                        'a',
                        { href: '#' },
                        React.createElement('i', { className: 'fa fa-vk' })
                    ),
                    React.createElement(
                        'a',
                        { href: '#' },
                        React.createElement('i', { className: 'fa fa-twitter' })
                    ),
                    React.createElement(
                        'a',
                        { href: '#' },
                        React.createElement('i', { className: 'fa fa-odnoklassniki' })
                    )
                ),
                React.createElement(
                    'a',
                    { href: '#', className: 'button light round button-history-repeat', id: 'button-history-repeat' },
                    React.createElement(
                        'span',
                        null,
                        'Повторить заказ'
                    )
                )
            )
        );
    }
});

var OrdersReservation = React.createClass({
    displayName: 'OrdersReservation',

    mixins: [Reflux.connect(ReservationHistoryStore, 'historyData')],
    limit: 5,
    getInitialState: function getInitialState() {
        return {
            data: [],
            historyData: []
        };
    },
    componentDidMount: function componentDidMount() {
        //   OrdersHistoryActions.updateData();
    },
    loadMore: function loadMore() {
        this.limit += 5;
        ReservationHistoryActions.updateData();
    },
    render: function render() {
        //   OrdersHistoryActions.updateData();
        var theData = this.state.historyData;
        var total = 0;
        var sorted = _.first(_.sortBy(theData, 'order_id').reverse(), this.limit);
        var messages = sorted.map(function (the, i) {
            return React.createElement(SingleReservation, { list: the, key: i });
        });
        return React.createElement(
            'div',
            null,
            messages,
            React.createElement(
                'div',
                { className: 'full-width align-center' },
                React.createElement(ButtonMore, { onClick: this.loadMore })
            )
        );
    }
});

ReactDOM.render(React.createElement(OrdersReservation, null), document.getElementById('reservationHistory'));

},{"./components/buttonMore.js":22,"./stores/reservationHistoryStore.js":46}],35:[function(require,module,exports){
'use strict';

/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:33:15
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-29 22:20:25
*/
var CampaignsActions = require('../actions/campaignsActions.js');

var CampaignsLimitedStore = Reflux.createStore({
    listenables: [CampaignsActions],
    campaignsLimitedData: [],
    companyId: 0,
    sourceUrl: serverUrl + '/api/v2/campaigns/limited/get',
    init: function init() {
        this.fetchList();
    },
    updateData: function updateData(newId) {
        console.log('CampaignsLimitedStore updateData()');
        this.fetchList();
    },
    fetchList: function fetchList() {
        var some = this;
        var url = this.sourceUrl;

        console.log('CampaignsLimitedStore: fetchList Url = ', url);
        $.getJSON(url, function (data) {
            some.CampaignsLimitedData = data.result.campaigns;
            console.log('CampaignsLimitedStore: result = ', data);
            some.trigger(some.CampaignsLimitedData);
        });
    }
});

module.exports = CampaignsLimitedStore;

},{"../actions/campaignsActions.js":7}],36:[function(require,module,exports){
'use strict';

/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:33:15
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-29 22:20:25
*/
var CampaignsActions = require('../actions/campaignsActions.js');

var CampaignsStore = Reflux.createStore({
    listenables: [CampaignsActions],
    campaignsData: [],
    companyId: 0,
    sourceUrl: serverUrl + '/api/v2/campaigns/permanent/get',
    init: function init() {
        //   this.companyId = currentCompany;
        this.fetchList();
    },
    updateData: function updateData(newId) {
        console.log('CampaignsStore updateData() newId = ', newId);
        this.companyId = newId;
        this.fetchList();
    },
    fetchList: function fetchList() {
        var some = this;
        var url = this.sourceUrl;

        console.log('CampaignsStore: fetchList Url = ', url);
        $.getJSON(url, function (data) {
            some.campaignsData = data.result.campaigns;
            console.log('CampaignsStore: result = ', data);
            some.trigger(some.campaignsData);
        });
    }
});

module.exports = CampaignsStore;

},{"../actions/campaignsActions.js":7}],37:[function(require,module,exports){
'use strict';

/*
* @Author: Andrey Starkov
* @Date:   2016-04-02 14:02:06
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-07 11:21:17
*/

var CardsActions = require('../actions/cardsActions.js');

var CardsStore = Reflux.createStore({
    listenables: [CardsActions],
    cardsData: [],
    sourceUrl: serverUrl + '/api/v2/cards/get/' + userToken,
    bindUrl: serverUrl + '/api/v3/payments/cards/bind/' + userToken,
    init: function init() {
        this.fetchList();
    },
    updateData: function updateData() {
        console.log('CardsStore updateData()');
        this.fetchList();
    },
    bindCard: function bindCard() {
        $.getJSON(this.bindUrl, function (data) {
            console.log('CardsStore bindCard', data);
        });
    },
    fetchList: function fetchList() {
        var some = this;
        $.getJSON(this.sourceUrl, function (data) {
            var result = data.result;
            if (result !== undefined) {
                console.log('CardsStore fetchList', data);
                some.cardsData = data.result.cards;
                some.trigger(some.cardsData);
            } else console.log('CardsStore: No Data: ', data);
        });
    }
});

module.exports = CardsStore;

},{"../actions/cardsActions.js":8}],38:[function(require,module,exports){
'use strict';

var CategoriesListActions = require('../actions/categoriesListActions.js');
var MenuItemsActions = require('../actions/menuItemsActions.js');

var CategoriesListStore = Reflux.createStore({
  listenables: [CategoriesListActions],
  currentCompany: 0,
  categories: [],
  sourceUrl: serverUrl + '/api/v2/categories/get/',
  init: function init() {
    //something
  },
  updateData: function updateData(companyId) {
    this.currentCompany = companyId;
    console.log('CategoriesListStore: updateData: categoryId = ' + companyId);
    this.fetchList();
  },
  fetchList: function fetchList() {
    var some = this;
    var url = this.sourceUrl + this.currentCompany;
    console.log('CategoriesListStore: fetchList: url = ', url);
    $.getJSON(url, function (data) {
      console.log('CategoriesListStore: fetchList: data = ', data);
      some.categories = data.result.categories;
      var firstCategory = some.categories[0];
      if (firstCategory) {
        console.log('CategoriesListStore: First Id = ', firstCategory.category_id);
        MenuItemsActions.updateData(firstCategory.category_id);
      }
      some.trigger(some.categories);
    });
  }
});

module.exports = CategoriesListStore;

},{"../actions/categoriesListActions.js":9,"../actions/menuItemsActions.js":14}],39:[function(require,module,exports){
'use strict';

var CityListActions = require('../actions/cityListActions.js');
var resultCity;

function selectCityByName(cityName) {
    var cities = getStorage('cities');
    var single = _.where(cities, { city_name: cityName.trim() });
    var selected;

    console.log('selectCityByName: cityName = ' + cityName, 'Cities = ', cities, single);

    single.forEach(function (val, index) {
        console.log('selectCityByName: selected: ', val);
        selected = val;
    });
    if (selected) {
        var isLocked = getStorage('cityLocked', 1);

        if (isLocked !== 1) {
            setStorage('city', selected);

            var currentCityId = selected.city_id;

            $('#cityListSelect option').each(function (el) {
                if (currentCityId == $(this).val()) {
                    console.log('selectCityByName: selected');
                    $(this).attr('selected', 'selected');
                }
            });

            currentCity = selected;
        } else {
            console.log('City is locked!');
            var city = getStorage('city');
            currentCity = city.city_id;
        }
    } else {
        console.log('selectCityByName: Wrong city or whatever');
    }
}

function getCity(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    console.log('getCity: ' + lat + ' / ' + long);
    console.log('getCity: ', position);
    var geocoder;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, long);
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log('getCity: results = ', results);
            if (results[0]) {
                var add = results[0].formatted_address;
                var value = add.split(",");
                console.log('getCity: ');
                var count = value.length;
                var country = value[count - 1];
                var state = value[count - 2];
                var city = value[count - 4];
                console.log('getCity: City detected: ', city.trim());
                selectCityByName(city.trim());
            } else {
                alert("address not found");
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }
    });
}

var CityListStore = Reflux.createStore({
    listenables: [CityListActions],
    cityList: [],
    sourceUrl: serverUrl + '/api/v4/cities/get',
    init: function init() {
        this.fetchList();
    },
    getCity: function getCity() {
        getCurrentCity();
        console.log('getCIty: ' + resultCity);
    },
    fetchList: function fetchList() {
        var some = this;
        $.getJSON(this.sourceUrl, function (data) {
            setStorage('cityList', data.result.cities);
            some.cityList = data.result.cities;
            some.trigger(some.cityList);
            //     this.getCity();
            cities = some.cityList;
            setStorage('cities', cities);
            navigator.geolocation.getCurrentPosition(getCity);
            console.log('REFLUX: CityListStore fetchList', some.cityList);
        });
    }
});

module.exports = CityListStore;

},{"../actions/cityListActions.js":10}],40:[function(require,module,exports){
'use strict';

/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:33:15
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-29 22:20:25
*/
var CompanyDetailsActions = require('../actions/companyDetailsActions.js');

var CompanyDetailsStore = Reflux.createStore({
    listenables: [CompanyDetailsActions],
    companyData: [],
    companyId: 0,
    sourceUrl: serverUrl + '/api/v2/restaurants/get/',
    init: function init() {
        //   this.companyId = currentCompany;
        //   this.fetchList();
    },
    updateData: function updateData(newId) {
        console.log('CompanyDetailsStore updateData() newId = ', newId);
        this.companyId = newId;
        this.fetchList();
    },
    fetchList: function fetchList() {
        var some = this;
        var url = this.sourceUrl + this.companyId;

        console.log('CompanyDetailsStore: fetchList Url = ', url);
        $.getJSON(url, function (data) {
            some.companyData = data.result.restaurant;
            console.log('CompanyDetailsStore: result = ', some.companyData);
            some.trigger(some.companyData);
        });
    }
});

module.exports = CompanyDetailsStore;

},{"../actions/companyDetailsActions.js":11}],41:[function(require,module,exports){
'use strict';

/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:41:34
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-29 22:49:28
*/

var CompanyListActions = require('../actions/companyListActions.js');
var CuisinesActions = require('../actions/cuisinesActions.js');
var CuisinesStore = require('./cuisinesStore.js');

var CompanyListStore = Reflux.createStore({
    listenables: [CompanyListActions],
    cuisine: [],
    currentCuisine: 0,
    currentCity: 0,
    companyList: [],
    sourceUrl: serverUrl + '/api/v4/restaurants/get',
    init: function init() {
        //  this.fetchList();
    },
    setCurrentCity: function setCurrentCity(cityId) {
        console.log('CompanyListStore: setCurrentCity(' + cityId + ')');
        this.currentCity = cityId;
        this.fetchList();
    },
    updateData: function updateData() {
        console.log('CompanyStore updateData()');
        this.fetchList();
    },
    showAll: function showAll() {
        this.cuisine = 0;
    },
    selectByCuisine: function selectByCuisine(cuisine) {
        console.log('CompanyListStore: selectByCuisine, cuisine = ', cuisine);
        this.cuisine = cuisine;
        currentCuisine = cuisine;
        this.currentCuisine = cuisine.cuisine_id;
        this.fetchList(cuisine.cuisine_id);
    },
    getCurrentCuisine: function getCurrentCuisine() {
        console.log('CompanyListStore: getCurrentCuisine, CurrentCuisine = ', this.currentCuisine);
        return this.currentCuisine;
    },
    filterData: function filterData(cuisine, type) {
        var data = this.companyList;
        var filtered;

        console.log('CompanyListStore: filterData: type = ' + type);

        if (type == 3) filtered = _.filter(data, function (element) {
            return element.restaurant_payment_type == 1;
        });

        if (type == 0) {
            this.fetchList();
        } else {
            this.companyList = filtered;
            this.trigger(this.companyList);
            console.log('CompanyListStore: filterData: ', filtered);
        }
        return filtered;
    },

    fetchList: function fetchList(cuisineId) {
        var some = this;
        var queryUrl = this.sourceUrl;

        this.cuisine = CuisinesActions.getCuisineById(cuisineId);

        console.log('CompanyListStore: fetchList: this.cuisine = ' + this.cuisine, 'this.currentCity', this.currentCity);

        queryUrl += '?restaurantType=3';
        if (cuisineId) {
            queryUrl += '&cuisineId=' + cuisineId;
        }
        if (this.currentCity > 0) {
            queryUrl += '&cityId=' + this.currentCity;
        }
        console.log('CompanyListStore: queryUrl = ', queryUrl);

        $.getJSON(queryUrl, function (data) {

            console.log('CompanyListStore fetchList', data);
            some.companyList = data.result.restaurants;
            some.trigger(some.companyList);
        });
    }
});

module.exports = CompanyListStore;

},{"../actions/companyListActions.js":12,"../actions/cuisinesActions.js":13,"./cuisinesStore.js":42}],42:[function(require,module,exports){
'use strict';

var CuisinesActions = require('../actions/cuisinesActions.js');

var CuisinesStore = Reflux.createStore({
    listenables: [CuisinesActions],
    cuisinesData: [],
    sourceUrl: serverUrl + '/api/v2/cuisines/get',
    init: function init() {
        this.fetchList();
    },
    getCuisineById: function getCuisineById(id) {
        var cuisine = _.where(this.cuisinesData, { cuisine_id: id });
        console.log('CuisinesStore: getCuisineById(' + id + '): ', cuisine);
        return cuisine;
    },
    fetchList: function fetchList() {
        var some = this;
        $.getJSON(this.sourceUrl, function (data) {
            setStorage('cuisines', data.result.cuisines);
            some.cuisinesData = data.result.cuisines;
            some.trigger(some.cuisinesData);
            console.log('REFLUX: CuisinesStore fetchList', some.cuisinesData);
        });
    }
});

module.exports = CuisinesStore;

},{"../actions/cuisinesActions.js":13}],43:[function(require,module,exports){
'use strict';

/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:40:22
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-07 21:11:24
*/

var MenuItemsActions = require('../actions/menuItemsActions.js');

var MenuItemsStore = Reflux.createStore({
    listenables: [MenuItemsActions],
    currentCategory: 0,
    menuItems: [],
    sourceUrl: serverUrl + '/api/v2/menu-items/get/',
    init: function init() {
        //        this.fetchList();
    },
    updateData: function updateData(newId) {
        this.currentCategory = newId;
        console.log('MenuItemsStore: updateData() companyId = ' + newId);
        this.fetchList();
    },
    fetchList: function fetchList() {
        var some = this;
        var url = this.sourceUrl + this.currentCategory;
        console.log('MenuItemsStore: fetchList() url = ', url);
        $.getJSON(url, function (data) {
            console.log('MenuItemsStore fetchList', data.result.menuItems);
            some.menuItems = data.result.menuItems;
            some.trigger(some.menuItems);
        });
    }
});

module.exports = MenuItemsStore;

},{"../actions/menuItemsActions.js":14}],44:[function(require,module,exports){
'use strict';

/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:35:29
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-07 11:18:15
*/

var OrdersHistoryActions = Reflux.createActions(['fetchList', 'updateData']);

var OrdersHistoryStore = Reflux.createStore({
    listenables: [OrdersHistoryActions],
    historyList: [],
    sourceUrl: serverUrl + '/api/v2/history/orders/' + userToken,
    init: function init() {
        this.fetchList();
    },
    updateData: function updateData() {
        console.log('OrdersHistoryStore: updateData()');
        this.fetchList();
    },
    fetchList: function fetchList() {
        var some = this;
        $.getJSON(this.sourceUrl, function (data) {
            var result = data.result;
            if (result !== undefined) {
                some.historyList = data.result.orders;
                some.trigger(some.historyList);
                console.log('OrdersHistoryStore: fetchList', some.historyList);
            } else console.log('OrdersHistoryStore: no data', data);
        });
    }
});

module.exports = OrdersHistoryStore;

},{}],45:[function(require,module,exports){
'use strict';

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:37:12
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-07 14:59:48
*/
var ProfileEditorActions = require('../actions/profileEditorActions.js');


var ProfileEditorStore = Reflux.createStore({
    listenables: [ProfileEditorActions],
    profileData: [],
    userToken: _reactCookie2.default.load('token'),
    sourceUrl: serverUrl + '/api/v2/user/profile/get',
    init: function init() {
        this.fetchList();
    },
    updateData: function updateData() {
        console.log('ProfileEditorStore updateData()');
        this.fetchList();
    },
    fetchList: function fetchList() {
        if (this.userToken) {
            console.log('ProfileEditorStore: Token = ', this.userToken);
            var some = this;
            $.ajax({
                type: 'POST',
                async: 'false',
                dataType: 'json',
                url: this.sourceUrl,
                data: {
                    'userToken': userToken
                },
                success: function success(data) {
                    var result = data.result;
                    if (result !== undefined) {
                        some.profileData = data.result.profile;
                        console.log('profileEditorStore: AJAX result: ', data);
                        some.trigger(some.profileData);
                        console.log('ProfileEditorStore some.profileData = ', some.profileData);
                        setStorage('profile', data.result.profile);
                    } else console.log('ProfileEditorStore: No Data: ', data);
                }
            });
        } else console.log('ProfileEditorStore: User token not specifed');
    }
});

module.exports = ProfileEditorStore;

},{"../actions/profileEditorActions.js":15,"react-cookie":51}],46:[function(require,module,exports){
'use strict';

/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:39:19
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-07 11:19:37
*/

var ReservationHistoryActions = Reflux.createActions(['fetchList', 'updateData']);

var ReservationHistoryStore = Reflux.createStore({
    listenables: [ReservationHistoryActions],
    historyList: [],
    sourceUrl: serverUrl + '/api/v3/history/reservations/' + userToken,
    init: function init() {
        this.fetchList();
    },
    updateData: function updateData() {
        console.log('ReservationHistoryStore updateData()');
        this.fetchList();
    },
    fetchList: function fetchList() {
        var some = this;
        $.getJSON(this.sourceUrl, function (data) {
            var result = data.result;
            if (result !== undefined) {
                some.historyList = data.result.reservations;
                some.trigger(some.historyList);
                console.log('ReservationHistoryStore fetchList', some.historyList);
            } else console.log('ReservationHistoryStore: no data', data);
        });
    }
});

module.exports = ReservationHistoryStore;

},{}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getHallsList = getHallsList;
exports.getReservationPointsList = getReservationPointsList;

var _checkoutFunc = require("./engine/checkout.func.jsx");

var _createOrder = require("./engine/createOrder.jsx");

var _createReservation = require("./engine/createReservation.jsx");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// menuItems - массив при заказе с едой

function pasteMenu(categoryId) {
    $.getJSON(serverUrl + '/api/v2/menu-items/get/' + categoryId, function (data) {
        $('#foodItems').html('');
        console.log(data);
        $.each(data.result.menuItems, function (key, item) {
            if (item.menu_item_image == "") {
                item.menu_item_image = "images/samples/9-tiny.jpg";
            } else item.menu_item_image = "http://176.112.201.81/static/cdn/" + item.menu_item_image;

            var output = "\n                <div class=\"col-lg-4 col-xs-6 food-item\">\n                    <a href=\"#\">\n                        <div class=\"product-image\">\n                            <img src=\"" + item.menu_item_image + "\" />\n                            <div class=\"product-controls\">\n                                <button class=\"button main add-to-cart\"\n                                data-name=\"" + item.menu_item_name + "\"\n                                data-price=\"" + item.menu_item_price + "\"\n                                data-id=\"" + item.menu_item_id + "\">В корзину</button>\n                            </div>\n                        </div>\n\n                        <div class=\"product-info\">\n                            <div class=\"major\">\n                                <div class=\"product-name\">\n                                    <b>" + item.menu_item_name + "</b>\n                                </div>\n                                <div class=\"product-price\">\n                                    <span>" + item.menu_item_price + " <i class=\"rouble\">i</i></span>\n                                </div>\n                            </div>\n                            <div class=\"product-description\">\n                                <span>" + item.menu_item_full_description + "</span>\n                            </div>\n                        </div>\n                    </a>\n                </div>";
            $('#foodItems').append(output);
        });
    });
}

function pasteCartElement(cartElement, elementCount) {
    var el = "\n    <tr class=\"reservation-" + cartElement.type + "\">\n        <td>" + cartElement.name + "</td>\n        <td>" + cartElement.price + " р.</td>\n        <td>\n            <div class=\"form-group label-placeholder is-empty\" data-id=\"" + cartElement.id + "\" data-name=\"" + cartElement.name + "\" data-price=\"" + cartElement.price + "\">\n                <span class=\"control-minus\" data-id=\"cartItem-" + cartElement.id + "\">-</span>\n                <input type=\"text\" value=\"" + elementCount + "\" class=\"form-control\" id=\"cartItem-" + cartElement.id + "\">\n                <span class=\"control-plus\" data-id=\"cartItem-" + cartElement.id + "\">+</span>\n            </div>\n        </td>\n        <td>\n            <button class=\"checkout-action\"><i class=\"icon icn-trash\"></i></button>\n        </td>\n    </tr>\n    ";

    return el;
}

function getHallsList(restaurantId, callback) {
    var box = $('#hallsBox');
    $.getJSON(serverUrl + '/api/v2/reservation/halls/' + restaurantId, function (data) {
        console.log('getHallsList: ', data);
        if (data.result) {
            var halls = data.result.halls;
            console.log('getHallsList: ', halls);
            $.each(halls, function (hall, index) {
                box.append("\n                    <button class=\"button light button-hall\" data-id=\"" + hall.hall_id + "\">" + hall.hall_name + "</button>\n                ");
            });

            callback(data.result.halls);
        }
    });
}

function showReservationMap(halls) {
    $.each(data, function (index, value) {
        console.log(value);
    });
}

function getReservationPointsList(hallId, theDate) {
    $.getJSON(serverUrl + '/api/v2/reservation/tables/' + hallId + '/' + theDate, function (data) {
        console.log('getReservationPointsList: Using Timestamp = ', theDate);
        console.log('getReservationPointsList: ', data);
        var tableType = 0;
        $('#roomBox').append("\n            <div class=\"the-room\">\n            <img src=\"" + hallsUrl + data.params.hall.hall_image + "\"></div>");
        $.each(data.params.tables, function (index, value) {

            if (value.table_type == 0) tableType = "\n                    <div class=\"type\">Беплатный</div>\n                    ";

            if (value.table_type == 1) tableType = "\n                    <div class=\"type\">Платный</div>\n                    <div class=\"price\">Стоимость заказа: <b></b></div>\n                    ";

            if (value.table_type == 2) tableType = "\n                    <div class=\"type\">Депозитный</dive>\n                    <div class=\"price\">Стоимость депозита: <b>" + table_deposit + "</b></div>;\n                    ";

            var theOptions;
            for (var i = 1; i <= value.table_seats_count; i++) {
                theOptions += '<option>' + i + '</option>';
            }

            $('#roomBox .the-room').append("\n                    <div class=\"table\" data-hall=\"" + value.hall_id + "\" id=\"table-" + value.table_id + "\" data-id=\"" + value.table_id + "\" data-reserved=\"" + data.params.reservations[value.table_id] + "\" data-seats=\"" + value.table_seats_count + "\" data-deposit=\"" + value.table_deposit + "\" data-price=\"" + value.table_price + "\" data-restaurant=\"" + value.restaurant_id + "\" data-hall=\"" + value.hall_id + "\" style=\"left:" + (value.table_coord_x - 10) + "px; top:" + (value.table_coord_y - 20) + "px\">\n                        <div class=\"table-number\">" + value.table_number + "</div>\n                        <div class=\"table-everything\">\n                            <div class=\"table-desc\">\n                                " + tableType + "\n                                <span>Мест: " + value.table_seats_count + "</span>\n                            </div>\n                            <div class=\"form-group label-static\" style=\"margin-top:35px\">\n                                <label for=\"tableOption-" + value.table_id + "\" class=\"control-label\">На сколько человек?</label>\n                                <select id=\"tableOption-" + value.table_id + "\" data-object=\"table-" + value.table_id + "\" class=\"form-control\">\n                                  " + theOptions + "\n                                </select>\n                                <button class=\"button main round\" style=\"width:100%; margin-top:10px;\">Забронировать</button>\n                            </div>\n                        </div>\n                    </div>\n                ");
        });
    });
}

function getReservationUnixTime(e) {
    var theTime = $('#reservationTimePicker').val();
    var dateTime = $('#reservationDatePicker').val() + ' ' + $('#reservationTimePicker').val();
    var unixTime = moment(dateTime, 'DD-MM-YYYY HH:mm').zone(350).unix();

    console.log('getReservationUnixTime: dateTime = ', dateTime);
    console.log('getReservationUnixTime: UNIX Timestamp = ', unixTime);
    return unixTime;
}

$(function () {
    var _$$datetimepicker;

    $('#reservationTimePicker').datetimepicker((_$$datetimepicker = {
        format: 'LT'
    }, _defineProperty(_$$datetimepicker, "format", 'HH:mm'), _defineProperty(_$$datetimepicker, "locale", 'ru'), _defineProperty(_$$datetimepicker, "defaultDate", moment().valueOf()), _$$datetimepicker));

    $('#reservationDatePicker').datetimepicker({
        format: 'DD-MM-YYYY',
        locale: 'ru',
        defaultDate: moment().valueOf()
    });

    $(document).on('click', '#buttonCheckoutDelivery', function (event) {
        (0, _createOrder.createOrder)();
    });

    $(document).on({
        mouseenter: function mouseenter() {
            $('.the-room .table').removeClass('reserved');
            $(this).parent().addClass('reserved');
        }
    }, '.the-room .table .table-number');

    $(document).on('mouseleave', '.the-room .table .table-everything', function (event) {
        $(this).parent().removeClass('reserved');
    });

    $(document).on('click', '#buttonCheckoutReservation', function (event) {
        (0, _createReservation.createReservation)();
    });

    var currentReservationTime;

    $(document).on('click', '.reserved .button', function (event) {
        console.log('#buttonReserve clicked');
        flyToCart($(this));
        console.log('currentReservationTime: ', getReservationUnixTime());

        $('.the-room .table.reserved').each(function () {
            var jsonObj = {};
            var reservation = getStorage('theReservation');

            jsonObj['id'] = $(this).data('id');
            jsonObj['name'] = $('section.company-about .title h2').html() + ', Стол #' + $(this).data('id');
            jsonObj['count'] = $('select', $(this).parent()).val();
            jsonObj['price'] = $(this).data('price');
            jsonObj['hall'] = $(this).data('hall');

            jsonObj['date'] = getReservationUnixTime();
            jsonObj['type'] = 'table';

            console.log('RES = ', isEmpty(reservation));

            if (isEmpty(reservation) === false) {
                swal({
                    title: 'В корзине уже есть один стол.',
                    text: "Одновременно в корзине может быть только один стол на резервацию! Отменить прошлый заказ и добавить этот?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Да, заменить!',
                    cancelButtonText: 'Нет, оставить тот',
                    closeOnConfirm: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        setStorage('theReservation', jsonObj);
                        toastr.warning('Предидущий заказ стола отменён', 'Внимание!');
                        (0, _createReservation.reservationAdded)();
                        (0, _checkoutFunc.refreshCart)();
                    } else {
                        toastr.warning('Завершите предидущий заказ', 'Стол не добавлен!');
                    }
                });
            } else {
                setStorage('theReservation', jsonObj);
                (0, _createReservation.reservationAdded)();

                (0, _checkoutFunc.refreshCart)();
            }
        });

        $('.reserved').removeClass('reserved').addClass('yours');
    });

    $(document).on('click', '.reservation-table .checkout-action', function (e) {
        $(this).parent().parent().velocity({ opacity: 0 }, 500, function () {
            setTimeout(function () {
                $('.reservation-table').remove();
                localStorage.removeItem('theReservation');
                (0, _checkoutFunc.refreshCart)();
            }, 500);
        });
    });

    $(document).on('dp.change', function (e) {
        currentReservationTime = getReservationUnixTime();
        getReservationPointsList(currentCompany, getReservationUnixTime());
    });
});

},{"./engine/checkout.func.jsx":3,"./engine/createOrder.jsx":4,"./engine/createReservation.jsx":5}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.showScreen = showScreen;
var CompanyDetailsActions = require('./react/stores/companyDetailsStore.js');
var MenuItemsActions = require('./react/stores/menuItemsStore.js');

function showScreen(screenId) {
    //  var aniOut = 'transition.flipXOut';
    //  var aniIn = 'transition.flipXIn'; // 'transition.flipXIn';
    var aniOut = 'transition.slideLeftOut';
    var aniIn = 'transition.slideRightBigIn'; // 'transition.flipXIn';
    var screenId = '#' + screenId;

    if ($(screenId).length) {
        $('.screen-toggle').removeClass('active');
        console.log('showScreen: Screen = ' + screenId);

        easyVelocity('.page-wrapper', aniOut, function () {
            easyVelocity(screenId, aniIn, function () {
                // im done yo
            });
        });

        $(this).addClass('active');
        $(screenId).addClass('screen-active');
    } else console.log('showScreen: Screen not exists. ID: ' + screenId);
}

$(function () {

    showScreen('pageMain');

    $(document).on('click', '#buttonReturnShop', function (event) {
        showScreen('pageMain');
    });

    /*
        $(document).on('click', '.company-toggle', function(event) {
            var company = $(this).data('company');
            console.log('CompanyToggle: Toggling: ', company);
            currentCompany = company;
            console.log(CompanyDetailsActions);
            CompanyDetailsActions.updateData(company);
            MenuItemsActions.updateData(company);
            showScreen('pageCompany');
        });*/

    $(document).on('click', '.screen-toggle', function (event) {
        event.preventDefault();
        var screenId = $(this).data('screen');
        showScreen(screenId);
    });
});

$(function () {

    var hash = window.location.hash.replace("#", "");

    if (hash !== '') {
        console.log('Hash = ' + hash);
        showScreen(hash);
    }

    $(document).on('click', '#buttonReturnShop', function (event) {
        showShop();
    });
});

},{"./react/stores/companyDetailsStore.js":40,"./react/stores/menuItemsStore.js":43}],49:[function(require,module,exports){
'use strict';

var _checkoutFunc = require('./engine/checkout.func.jsx');

function pasteCartElement(cartElement, elementCount) {
    var el = '\n    <tr class="reservation-' + cartElement.type + '">\n        <td>' + cartElement.name + '</td>\n        <td>' + cartElement.price + ' р.</td>\n        <td>\n            <div class="form-group label-placeholder is-empty" data-id="' + cartElement.id + '" data-name="' + cartElement.name + '" data-price="' + cartElement.price + '">\n                <span class="control-minus" data-id="cartItem-' + cartElement.id + '">-</span>\n                <input type="text" value="' + elementCount + '" class="form-control" id="cartItem-' + cartElement.id + '">\n                <span class="control-plus" data-id="cartItem-' + cartElement.id + '">+</span>\n            </div>\n        </td>\n        <td>\n            <button class="checkout-action"><i class="icon icn-trash"></i></button>\n        </td>\n    </tr>\n    ';
    return el;
}

function pasteCheckoutFormUnregistered() {
    var profile = getStorage('profile');
    var bonusCount = '100';
    var userName = '',
        userPhone = '';
    if (profile) {
        if (profile.userName) userName = profile.userName;
        if (profile.userPhone) userPhone = profile.userPhone;
    }
    var out = '\n    <div class="checkout-form">\n        <div class="control-group">\n            <div class="row">\n                <div class="col-lg-6 col-xs-6">\n                    <div class="form-group label-floating required">\n                        <label for="checkout-name" class="control-label">Ваше имя</label>\n                        <input type="text" class="form-control" id="checkout-name" value=' + userName + '>\n                    </div>\n                </div>\n                <div class="col-lg-6 col-xs-6">\n                    <div class="form-group label-floating required">\n                        <label for="checkout-phone" class="control-label">Телефон</label>\n                        <input type="text" class="form-control" id="checkout-phone" value="' + userPhone + '">\n                    </div>\n                </div>\n            </div>\n            <div class="row">\n                <div class="col-lg-4 col-xs-4">\n                    <div class="form-group label-floating required">\n                        <label for="checkout-street" class="control-label">Улица</label>\n                        <input type="text" class="form-control" id="checkout-street">\n                    </div>\n                </div>\n                <div class="col-lg-2 col-xs-2">\n                    <div class="form-group label-floating required">\n                        <label for="checkout-building" class="control-label">Дом</label>\n                        <input type="text" class="form-control" id="checkout-building">\n                    </div>\n                </div>\n                <div class="col-lg-2 col-xs-2">\n                    <div class="form-group label-floating required">\n                        <label for="checkout-apartment" class="control-label">Квартира</label>\n                        <input type="text" class="form-control" id="checkout-apartment">\n                    </div>\n                </div>\n                <div class="col-lg-2 col-xs-2">\n                    <div class="form-group label-floating">\n                        <label for="checkout-porch" class="control-label">Подьезд</label>\n                        <input type="text" class="form-control" id="checkout-porch">\n                    </div>\n                </div>\n                <div class="col-lg-2 col-xs-2">\n                    <div class="form-group label-floating">\n                        <label for="checkout-floor" class="control-label">Этаж</label>\n                        <input type="text" class="form-control" id="checkout-floor">\n                    </div>\n                </div>\n                <div class="col-lg-4 col-xs-12">\n                    <div class="form-group label-floating required" style="margin-top:30px">\n                        <label for="checkout-persons" class="control-label" value="1">Количество персон</label>\n                        <input type="search" class="form-control" id="checkout-persons">\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="control-group">\n            <div class="row radio-box">\n                <div class="col-lg-6">\n                    <div class="the-label">\n                        <span>Способ оплаты</span>\n                    </div>\n                    <div class="form-group radio-group">\n                        <div class="radio radio-primary">\n                            <label>\n                              <input type="radio" class="checkout-payment-type" name="checkout-payment-type" id="checkout-payment-type-cash" value="0" checked>\n                              <span class="circle"></span><span class="check"></span>\n                              Наличными\n                            </label>\n                        </div>\n                        <div class="radio radio-primary">\n                            <label>\n                              <input type="radio" class="checkout-payment-type" name="checkout-payment-type" id="checkout-payment-type-card-courier" value="1">\n                              <span class="circle"></span><span class="check"></span>\n                              По карте курьеру\n                            </label>\n                        </div>\n                        <div class="radio radio-primary" class="display:none">\n                            <label>\n                              <input type="radio" class="checkout-payment-type" name="checkout-payment-type" id="checkout-payment-type-card" value="2">\n                              <span class="circle"></span><span class="check"></span>\n                              По карте онлайн\n                            </label>\n                        </div>\n                    </div>\n                </div>\n                <div class="col-lg-6">\n                    <div class="form-group label-floating">\n                        <label for="checkout-phone" class="control-label">Сколько наличными?</label>\n                        <input type="text" class="form-control" id="checkout-cash">\n                    </div>\n                    <div class="form-group label-floating">\n                        <label for="checkout-phone" class="control-label">Сколько <span class="fa fa-rouble"></span>-бонусов использовать?</label>\n                        <input type="text" class="form-control" id="checkout-bonus">\n                        <div class="bonus-count">\n                            У вас есть ' + bonusCount + ' <span class="fa fa-rouble"></span>-бонусов\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="control-group">\n            <div class="row">\n                <div class="col-lg-8">\n                    <div class="form-group label-floating" style="margin-top:30px">\n                        <label for="checkout-comment" class="control-label">Комментарий</label>\n                        <input type="search" class="form-control" id="checkout-comment">\n                    </div>\n                </div>\n            </div>\n\n        </div>\n        <div class="checkout-buttons">\n            <div class="row">\n                <div class="col-lg-6 col-xs-6">\n                    <div class="button main" id="buttonCheckoutDelivery">оформить доставку</div>\n                </div>\n                <div class="col-lg-6 col-xs-6">\n                    <div class="button main" id="buttonCheckoutReservation">Забронировать стол</div>\n                </div>\n            </div>\n        </div>\n    </div>\n    ';
    return out;
}

function removeItemById(itemId) {
    var cart = getStorage('theCart');
    console.log('removeItemById: before = ', cart);
    cart = _.without(cart, _.findWhere(cart, { id: itemId }));
    console.log('removeItemById: after = ', cart);
    setStorage('theCart', cart);
    theCart.contents = cart;
    (0, _checkoutFunc.refreshCart)();
}

$(function () {

    if (localStorage.getItem('theCart') === null) {
        console.log('localStorage: no cart stored');
    } else {
        console.log('Getting Cart Contents..');
        theCart.contents = getStorage('theCart');
    }

    $('#checkoutForm').html(pasteCheckoutFormUnregistered());

    function addToCart(obj, clicked) {
        Cookies.set('shop', obj['restaurant']);
        theCart.contents.push(obj);
        console.log('addToCart: theCart = ', theCart);
        console.log('addToCart: Pushing = ', obj);
        setStorage('theCart', theCart.contents);
        flyToCart(clicked.parent().parent().find("img").eq(0));
        toastr.success(obj.name + ', ' + obj.price + ' р.');
        (0, _checkoutFunc.refreshCart)();
    }

    $(document).on('click', '.add-to-cart', function (event) {
        var jsonObj = {};
        var button = $(this);
        var currentShop = Cookies.get('shop');
        var thisShop = button.data('restaurant');

        jsonObj['id'] = button.data('id');
        jsonObj['name'] = button.data('name');
        jsonObj['price'] = button.data('price');
        jsonObj['restaurant'] = button.data('restaurant');

        var is = _.where(theCart.contents, { restaurant: thisShop });
        var one;
        $.each(is, function (the, index) {
            one = is;
        });
        var first;

        if (theCart.contents.length > 0) first = theCart.contents[0];

        console.log('ISSS = ', one, first);

        if (currentShop) {

            console.log('Current Shop: ' + currentShop);
            console.log('This Shop: ' + thisShop);

            if (thisShop == currentShop) {
                addToCart(jsonObj, button);
            } else {
                swal({
                    title: 'Внимание!', type: 'warning',
                    text: 'В корзину нельзя положить позиции из разных ресторанов. Удалить позиции другого ресторана?',
                    confirmButtonText: 'Да, удалить!', cancelButtonText: 'Нет, продолжить',
                    showCancelButton: true, closeOnConfirm: true, closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm === true) {
                        console.log('Old Shop = ', Cookies.get('shop'));
                        console.log('New Shop = ', thisShop);
                        (0, _checkoutFunc.clearCart)(function () {
                            Cookies.set('shop', thisShop);
                            console.log('Callback ClearCart: ', thisShop, jsonObj);
                            addToCart(jsonObj, button);
                        });
                    }
                });
            }
        } else {
            Cookies.set('shop', thisShop);
            console.log('Add to cart: First blood');
            addToCart(jsonObj, button);
        }
    });

    $(document).on('click', '.reservation-food .checkout-action', function (e) {
        var theItem = $(this).parent().parent();
        var theId = theItem.data('id');
        removeItemById(theId);
        theItem.velocity({ opacity: 0 }, 500, function () {
            setTimeout(function () {
                $('.reservation-table').remove();
            }, 500);
        });
    });

    $(document).on('click', '.checkout .control-plus', function (event) {
        var jsonObj = {};
        jsonObj['id'] = $(this).parent().data('id');
        jsonObj['name'] = $(this).parent().data('name');
        jsonObj['price'] = $(this).parent().data('price');
        jsonObj['type'] = 'food';
        theCart.contents.push(jsonObj);
        setStorage('theCart', theCart.contents);
        (0, _checkoutFunc.refreshCart)();
    });

    $(document).on('click', '.checkout .control-minus', function (event) {
        var theId = $(this).parents('tr:first').data('id');
        removeItemById(theId);
    });

    $(document).on('click', '.checkout-icon', function (event) {
        (0, _checkoutFunc.clearCart)();
    });

    $(document).on('click', '.category-toggle', function (event) {
        event.preventDefault();
        $('.category-toggle').removeClass('active');
        $(this).addClass('active');
    });

    (0, _checkoutFunc.refreshCart)();
});

},{"./engine/checkout.func.jsx":3}],50:[function(require,module,exports){
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

exports.parse = parse;
exports.serialize = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {}
  var opt = options || {};
  var pairs = str.split(/; */);
  var dec = opt.decode || decode;

  pairs.forEach(function(pair) {
    var eq_idx = pair.indexOf('=')

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      return;
    }

    var key = pair.substr(0, eq_idx).trim()
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  });

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var pairs = [name + '=' + value];

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    pairs.push('Max-Age=' + maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    pairs.push('Domain=' + opt.domain);
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    pairs.push('Path=' + opt.path);
  }

  if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
  if (opt.httpOnly) pairs.push('HttpOnly');
  if (opt.secure) pairs.push('Secure');

  return pairs.join('; ');
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

},{}],51:[function(require,module,exports){
var cookie = require('cookie');

var _rawCookie = {};
var _res = undefined;

function load(name, doNotParse) {
  var cookies = (typeof document === 'undefined') ? _rawCookie : cookie.parse(document.cookie);
  var cookieVal = cookies && cookies[name];

  if (!doNotParse) {
    try {
      cookieVal = JSON.parse(cookieVal);
    } catch(e) {
      // Not serialized object
    }
  }

  return cookieVal;
}

function save(name, val, opt) {
  _rawCookie[name] = val;

  // allow you to work with cookies as objects.
  if (typeof val === 'object') {
    _rawCookie[name] = JSON.stringify(val);
  }

  // Cookies only work in the browser
  if (typeof document !== 'undefined') {
    document.cookie = cookie.serialize(name, _rawCookie[name], opt);
  }

  if (_res && _res.cookie) {
    _res.cookie(name, val, opt);
  }
}

function remove(name, opt) {
  delete _rawCookie[name];

  if (typeof opt === 'undefined') {
    opt = {};
  } else if (typeof opt === 'string') {
    // Will be deprecated in future versions
    opt = { path: opt };
  }

  if (typeof document !== 'undefined') {
    opt.expires = new Date(1970, 1, 1, 0, 0, 1);
    document.cookie = cookie.serialize(name, '', opt);
  }

  if (_res && _res.clearCookie) {
    _res.clearCookie(name, opt);
  }
}

function setRawCookie(rawCookie) {
  if (rawCookie) {
    _rawCookie = cookie.parse(rawCookie);
  } else {
    _rawCookie = {};
  }
}

function plugToRequest(req, res) {
  if (req.cookie) {
    _rawCookie = req.cookie;
  } else if (req.headers && req.headers.cookie) {
    setRawCookie(req.headers.cookie);
  } else {
    _rawCookie = {};
  }

  _res = res;
}

var reactCookie = {
  load: load,
  save: save,
  remove: remove,
  setRawCookie: setRawCookie,
  plugToRequest: plugToRequest
};

if (typeof window !== 'undefined') {
  window['reactCookie'] = reactCookie;
}

module.exports = reactCookie;

},{"cookie":50}]},{},[49,6,47,1,48,19,32,34,31,33,20,30,16,18])


//# sourceMappingURL=es6.js.map
