/*
* @Author: Andrey Starkov
* @Date:   2016-03-24 13:48:30
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-21 22:22:37
*/

var HistoryActions = require('../actions/historyActions');

var HistoryStore = Reflux.createStore({
    listenables: [HistoryActions],
    historyList: [],
    sourceUrl: serverUrl+'/api/v2/history/orders/'+userToken,
    init: function() {

    },
    updateData: function(){
     //   console.log('HistoryStore updateData()');
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
      $.getJSON(this.sourceUrl, function (data) {
        some.historyList = data.result.orders;
        some.trigger(some.historyList);
     //  console.log('HistoryStore fetchList', some.historyList);
      });
    }
});

module.exports = HistoryStore;
