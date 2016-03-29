/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:40:22
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-29 09:40:28
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
