/*
* @Author: Andrey Starkov
* @Date:   2016-03-24 16:23:35
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-24 17:22:55
*/

import {refreshCart} from "../engine/checkout.func.jsx";

export function addToCart(id, name, price, flyObj){
    var jsonObj = {};
    jsonObj['id'] = id;
    jsonObj['name'] = name;
    jsonObj['price'] = price;
    theCart.contents.push(jsonObj);
    console.log('addToCart: theCart = ', theCart);
    setStorage('theCart', theCart.contents);
    flyToCart($(flyObj));cartBottomPanel
    refreshCart();
}

export function repeatOrder(items){
    console.log('repeatOrder: items = ', items);
    var hey = items.map(function(the, i) {
        addToCart(the.menu_item_id, the.menu_item_name, the.menu_item_price, "#"+'singleItem-'+the.menu_item_id);
    });

}
