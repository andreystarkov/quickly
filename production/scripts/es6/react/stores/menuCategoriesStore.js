var MenuItemsActions = require('../actions/MenuItemsActions.js');

var MenuCategoriesStore = Reflux.createStore({
    listenables: [MenuCategoriesActions],
    categoriesList: [],
    sourceUrl: serverUrl+'/api/v2/categories/get/',
    init: function() {
       // this.fetchList();
    },
    updateData: function(restId){
  //      console.log('MenuCategoriesStore: updateData()');
        this.fetchList(restId);
    },
    fetchList: function(restId) {
        var some = this;
        if(restId) {
            var url = serverUrl+'/api/v2/categories/get/'+restId
            $.getJSON(this.sourceUrl, function (data) {
                some.historyList = data.result.categories;
      //          some.trigger(some.historyList);
                console.log('MenuCategoriesStore: fetchList('+restId+'): ', some.historyList);
            });
        } //else console.log('MenuCategoriesStore: error: no restId');
    }
});

module.exports = OrdersHistoryStore;
