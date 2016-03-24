/*
* @Author: Andrey Starkov
* @Date:   2016-03-24 17:32:25
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-24 17:44:08
*/

var SingleMenuItem = React.createClass({
    render: function(){
        var item = this.props.item;
        return(
        <div class="col-lg-4 col-xs-6 food-item">
            <a href="#">
                <div class="product-image">
                    <img src={item.menu_item_image} />
                    <div class="product-controls">
                        <button class="button main add-to-cart"
                        data-name={item.menu_item_name}
                        data-price={item.menu_item_price}
                        data-id={item.menu_item_id}>В корзину</button>
                    </div>
                </div>

                <div class="product-info">
                    <div class="major">
                        <div class="product-name">
                            <b>{item.menu_item_name}</b>
                        </div>
                        <div class="product-price">
                            <span>{item.menu_item_price} <i class="rouble">i</i></span>
                        </div>
                    </div>
                    <div class="product-description">
                        <span>{item.menu_item_full_description}</span>
                    </div>
                </div>
            </a>
        </div>
        );
    }
});

module.exports = SingleMenuItem;
