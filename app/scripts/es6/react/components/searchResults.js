/*
* @Author: Andrey Starkov
* @Date:   2016-05-15 13:18:51
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-05-16 08:55:14
*/

var SearchMenuItem = React.createClass({
	render: function(){
		var item = this.props.item;
   		var styleProduct = { backgroundImage: 'url('+imageBaseUrl+item.menu_item_image+')' }
   		var companyLogo = { backgroundImage: 'url('+imageBaseUrl+item.restaurant_main_image+')' }
		return(
	        <div className="search-menu-item">
	            <div className="inner">

	                <div className="product-image" style={styleProduct}>
	                    <div className="product-controls">
	                        <button onClick={this.addToCart} className="button main add-to-cart"
	                        data-name={item.menu_item_name}
	                        data-price={item.menu_item_price}
	                        data-id={item.menu_item_id} data-restaurant={item.restaurant_id}>В корзину</button>
	                    </div>
                        <div className="restaurant-logo hint--bottom" data-hint={item.restaurant_name}>
                        	<div className="img" style={companyLogo} />
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
		)
	}
});

var SearchResults = React.createClass({
	render: function(){
		if( this.props.data.menuItems ){
			var menuItems = this.props.data.menuItems.map(function(the,key){

				return (
					<div className="col-lg-3 col-xs-6">
						<SearchMenuItem item={the} key={key} />
					</div>
				)
			});
		}
		return(
			<div className="search-results" id="search-results">
				<div className="container">
					<h3>Найденные блюда:</h3>
					<div className="row">
						{menuItems}
					</div>

				</div>
			</div>
		)
	}
});

module.exports = SearchResults;