/*
* @Author: Andrey Starkov
* @Date:   2016-03-24 17:32:25
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-24 17:41:56
*/
import LoadingOrderAnimation from 'react-loading-order-with-animation';

var MenuItemsStore = require('./stores/menuItemsStore.js');
var CategoriesListActions = require('./actions/categoriesListActions.js');
var CategoriesList = require('./categoriesList.react.jsx');
var Spinner = require('./ui/spinner.js');
var ButtonMore = require('./components/buttonMore.js');

var SingleMenuItem = React.createClass({
    addToCart: function(e){
     //   console.log('clicked', this.props.item.restaurant_id);
    },
    render: function(){
        var item = this.props.item;
        var itemImage = imageBaseUrl+item.menu_item_image;
        if (item.menu_item_image === undefined || item.menu_item_image === null || item.menu_item_image == '')
        { itemImage = '/images/placeholder-1.png'; }

        var styleProduct = {
            backgroundImage: 'url('+itemImage+')'
        }

        return (
        <div className="col-lg-4 col-xs-6 food-item">
            <div className="inner">
                <div className="product-image" style={styleProduct}>
                    <div className="product-controls">
                        <button onClick={this.addToCart} className="button main add-to-cart"
                        data-name={item.menu_item_name}
                        data-price={item.menu_item_price}
                        data-id={item.menu_item_id} data-restaurant={item.restaurant_id}>В корзину</button>
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
            </div>
        </div>
        );
    }
});

var MenuItemsSidebar = React.createClass({
    componentDidMount: function(){
        if(isMobile){
            $('#sidebar').appendTo(document.body);
            $('#menu-company-open').click(function(){
              $('#sidebar').removeClass('mobile');
              $('#sidebar').addClass('active')
            });
            $('#menu-company-close').click( function() {
              $('#sidebar').removeClass('active');
              $('#sidebar').addClass('mobile');
            });
        } else {
            if( $('#sidebar').length ){
                function sticky_relocate() {
                    var window_top = $(window).scrollTop();
                    var div_top = $('#sidebar').offset().top;
                    if (window_top > div_top) {
                        $('.side-wrap').addClass('stick');
                    } else {
                        $('.side-wrap').removeClass('stick');
                    }
                }
                $(window).scroll(sticky_relocate);
                sticky_relocate();
            }
        }
    },
    componentWillUnmount: function(){
        if(isMobile){
            $('#sidebar').remove();
        }
    },
    sidebarOpen: function(e){
        console.log('open');
        $('#sidebar').removeClass('mobile');
    },
    sidebarClose: function(e){

    },
    render: function(){
        return (
            <div id="sidebar" className="mobile sidebar sidebar-wrapper">
                <div className="button-close" id="menu-company-close"><i className="icn-cancel"></i></div>
                <div className="button-open" id="menu-company-open"><i className="icn-menu"></i></div>
                <div className="side-wrap" id="side-wrap">
                    <CategoriesList />
                </div>
            </div>
        )
    }
});

/*
                    <div className="form-group label-floating is-empty">
                        <label htmlFor="i5" className="control-label">Поиск блюда</label>
                        <input type="search" className="form-control" id="i5" />
                        <span className="help-block"></span>
                        <span className="material-input"></span>
                    </div>

 */
var MenuItemsList = React.createClass({
    mixins: [Reflux.connect(MenuItemsStore, 'menuItems')],
    perPage: 10,
    getInitialState: function() {
      return {
        data: [],
        menuItems: [],
        loadCount: this.perPage
      };
    },
    componentWillMount: function(){
        // sure it will
    },
    loadMore: function(){
        var was = this.state.loadCount;
        this.setState({
            loadCount: was+this.perPage
        });
    },
    render: function(){
        var that = this;
        var theData = this.state.menuItems;
        var total = 0;
        if (theData.length == 0) {
            items = <Spinner />
        } else {
            var items = theData.map(function(the, i, wait) {
                if( i < that.state.loadCount ){
                    if( that.state.loadCount >= that.perPage && i >= (parseInt(that.state.loadCount)-parseInt(that.perPage)) ){
                        wait = 150*(i-(parseInt(that.state.loadCount)-parseInt(that.perPage))); // omg wtf??
                    } else wait = i*150;
                    return (
                        <LoadingOrderAnimation animation="fade-in" move="from-bottom-to-top"
                           distance={30} speed={400} wait={wait}>
                        <SingleMenuItem item={the} key={i} />
                        </LoadingOrderAnimation>
                    )
                }
            });
        }
        return (
        <div>
            <div className="menu-items-wrap">
                <div>{items}</div>
            </div>
            <div>
                <ButtonMore onClick={this.loadMore} />
            </div>
        </div>
        )
    }
});

var MenuItems = React.createClass({
    _handleWaypointEnter: function(e){
    //    console.log('enter: ',e);
    },
    _handleWaypointLeave: function(e){
    //    console.log('leave: ',e);
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-lg-9">
                    <div className="row">
                        <MenuItemsList />
                    </div>
                </div>
                <div className="col-lg-3">
                    <MenuItemsSidebar />
                </div>
            </div>
        )
    }
});

module.exports = MenuItems;

// ReactDOM.render(<MenuItems />, document.getElementById('menuItems'));
