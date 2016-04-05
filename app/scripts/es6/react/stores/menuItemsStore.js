/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:40:22
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-04 22:33:02
*/

var MenuItemsActions = Reflux.createActions([
    'fetchList', 'updateData'
]);

var MenuItemsStore = Reflux.createStore({
    listenables: [MenuItemsActions],
    currentCategory:1,
    companyId: currentCompany,
    menuItems: [],
    sourceUrl: serverUrl+'/api/v2/menu-items/get/',
    init: function() {
//        this.fetchList();
    },
    updateData: function(newId){
        this.companyId = newId;
        console.log('MenuItemsStore: updateData() companyId = '+newId)
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
      var url = this.sourceUrl+this.companyId;
      console.log('MenuItemsStore: fetchList() url = ', url);
      $.getJSON(url, function (data) {
        console.log('REFLUX: MenuItemsStore fetchList', some.menuItems);
        some.menuItems = data.result.menuItems;
        some.trigger(some.menuItems);
      });
    }
});

module.exports = MenuItemsStore;
