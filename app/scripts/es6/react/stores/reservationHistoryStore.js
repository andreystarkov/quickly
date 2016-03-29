/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:39:19
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-29 09:39:24
*/

var ReservationHistoryActions = Reflux.createActions([
    'fetchList', 'updateData'
]);

var ReservationHistoryStore = Reflux.createStore({
    listenables: [ReservationHistoryActions],
    historyList: [],
    sourceUrl: serverUrl+'/api/v3/history/reservations/'+userToken,
    init: function() {
        this.fetchList();
    },
    updateData: function(){
        console.log('ReservationHistoryStore updateData()');
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
      $.getJSON(this.sourceUrl, function (data) {
        some.historyList = data.result.reservations;
        some.trigger(some.historyList);
        console.log('REFLUX: ReservationHistoryStore fetchList', some.historyList);
      });
    }
});

module.exports = ReservationHistoryStore;
