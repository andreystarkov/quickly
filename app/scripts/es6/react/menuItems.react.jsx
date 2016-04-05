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
    render: function(){
        var item = this.props.item;
        var itemImage = imageBaseUrl+item.menu_item_image;
        if (item.menu_item_image === undefined || item.menu_item_image === null || item.menu_item_image == '') { itemImage = 'images/samples/2.png'; }
        return(
        <div className="col-lg-4 col-xs-6 food-item">
            <a href="#">
                <div className="product-image">
                    <img src={itemImage} />
                    <div className="product-controls">
                        <button className="button main add-to-cart"
                        data-name={item.menu_item_name}
                        data-price={item.menu_item_price}
                        data-id={item.menu_item_id}>В корзину</button>
                    </div>
                </div>

                <div className="product-info">
                    <div className="major">
                        <div className="product-name">
                            <b>{item.menu_item_name}</b>
                        </div>
                        <div className="product-price">
                            <span>{item.menu_item_price} <i className="rouble">i</i></span>
                        </div>
                    </div>
                    <div className="product-description">
                        <span>{item.menu_item_full_description}</span>
                    </div>
                </div>
            </a>
        </div>
        );
    }
});

var MenuItemsSidebar = React.createClass({
    render: function(){
        return (
            <div>
                <div className="button-close" id="menu-close"><i className="icon-close"></i></div>
                <div className="button-open" id="menu-open"><i className="icn-menu"></i></div>
                <div className="sidebar-wrap">
                    <div className="form-group label-floating is-empty">
                        <label htmlFor="i5" className="control-label">Поиск блюда</label>
                        <input type="search" className="form-control" id="i5" />
                        <span className="help-block"></span>
                        <span className="material-input"></span>
                    </div>
                    <CategoriesList />
                </div>
            </div>
        )
    }
});

var MenuItemsList = React.createClass({
    mixins: [Reflux.connect(MenuItemsStore, 'menuItems')],
    getInitialState: function() {
      return {
        data: [],
        menuItems: []
      };
    },
    render: function(){
        var theData = this.state.menuItems;
        var total = 0;
        var items = theData.map(function(the, i) {
            return <SingleMenuItem item={the} key={i} />
        });
        return (
            <div>{items}</div>
        )
    }
});

var MenuItems = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-lg-9">
                    <div className="row">
                        <MenuItemsList />
                    </div>
                </div>
                <div className="col-lg-3 mobile sidebar" id="sidebar">
                    <MenuItemsSidebar />
                </div>
            </div>
        )
    }
});

ReactDOM.render(<MenuItems />, document.getElementById('menuItems'));
