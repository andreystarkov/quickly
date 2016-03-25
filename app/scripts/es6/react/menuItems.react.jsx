/*
* @Author: Andrey Starkov
* @Date:   2016-03-24 17:32:25
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-24 17:41:56
*/

var MenuItemsActions = Reflux.createActions([
    'fetchList', 'updateData'
]);

var MenuItemsStore = Reflux.createStore({
    listenables: [MenuItemsActions],
    currentCategory:1,
    companyId: currentCompany,
    menuItems: [],
    sourceUrl: serverUrl+'/api/v2/menu-items/get/'+currentCompany,
    init: function() {
        this.companyId = currentCompany;
        this.fetchList();
    },
    updateData: function(newId){
        this.companyId = newId;
        this.sourceUrl = serverUrl+'/api/v2/menu-items/get/'+newId;
        console.log('CompanyDetailsStore: updateData() = ', this.sourceUrl);
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
      $.getJSON(this.sourceUrl, function (data) {
        some.menuItems = data.result.menuItems;
        console.log('REFLUX: MenuItemsStore fetchList', some.menuItems);
        some.trigger(some.menuItems);
      });
    }
});

module.exports = MenuItemsStore;

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

var MenuItems = React.createClass({
    mixins: [Reflux.connect(MenuItemsStore, 'menuItems')],
    limit: 12,
    getInitialState: function() {
      return {
        data: [],
        menuItems: []
      };
    },
    componentDidMount: function() {
    },
    loadMore: function(){
        this.limit += 6;
        MenuItemsActions.updateData();
    },
    render: function() {
        var theData = this.state.menuItems;
        var total = 0;
        var messages = theData.map(function(the, i) {
            return <SingleMenuItem item={the} key={i} />
        });
        return (
            <div>{messages}</div>
        )
    }
});

ReactDOM.render(<MenuItems />, document.getElementById('menuItems'));
