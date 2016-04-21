/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:40:22
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-08 18:36:29
*/

var MenuItemsActions = require('../actions/menuItemsActions.js');

var MenuItemsStore = Reflux.createStore({
    listenables: [MenuItemsActions],
    currentCategory:0,
    menuItems: [],
    sourceUrl: serverUrl+'/api/v2/menu-items/get/',
    init: function() {
//        this.fetchList();
    },
    updateDataById: function(newId){
        this.sourceUrl = serverUrl+'/api/v3/menu-items/get/by-restaurant?restaurantId='+newId;
        console.log('MenuItemsStore: updateDataById() companyId = '+newId);
        this.fetchList();
    },
    updateData: function(newId){
        this.currentCategory = newId;
        this.sourceUrl = serverUrl+'/api/v2/menu-items/get/'+newId;
        console.log('MenuItemsStore: updateData() companyId = '+newId);
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
    //  var url = this.sourceUrl+this.currentCategory;
      console.log('MenuItemsStore: fetchList() url = ', this.sourceUrl);
      $.getJSON(this.sourceUrl, function (data) {
        console.log('MenuItemsStore fetchList', data);
        some.menuItems = data.result.menuItems;
        some.trigger(some.menuItems);
      });
    }
});

module.exports = MenuItemsStore;
