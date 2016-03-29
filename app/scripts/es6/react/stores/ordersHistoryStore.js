/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:35:29
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-29 09:36:01
*/

var OrdersHistoryActions = Reflux.createActions([
    'fetchList', 'updateData'
]);

var OrdersHistoryStore = Reflux.createStore({
    listenables: [OrdersHistoryActions],
    historyList: [],
    sourceUrl: serverUrl+'/api/v2/history/orders/'+userToken,
    init: function() {
        this.fetchList();
    },
    updateData: function(){
        console.log('OrdersHistoryStore updateData()');
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
      $.getJSON(this.sourceUrl, function (data) {
        some.historyList = data.result.orders;
        some.trigger(some.historyList);
        console.log('REFLUX: OrdersHistoryStore fetchList', some.historyList);
      });
    }
});

module.exports = OrdersHistoryStore;
