/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:39:19
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-21 22:22:04
*/

var ReservationHistoryActions = require('../actions/reservationHistoryActions.js');

var ReservationHistoryStore = Reflux.createStore({
    listenables: [ReservationHistoryActions],
    historyList: [],
    sourceUrl: serverUrl+'/api/v3/history/reservations/'+userToken,
    init: function() {
        this.fetchList();
    },
    updateData: function(){
      //  console.log('ReservationHistoryStore updateData()');
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
      $.getJSON(this.sourceUrl, function (data) {
        var result = data.result;
        if( result !== undefined ){
            some.historyList = data.result.reservations;
            some.trigger(some.historyList);
          //  console.log('ReservationHistoryStore fetchList', some.historyList);
        } // else console.log('ReservationHistoryStore: no data', data);
      });
    }
});

module.exports = ReservationHistoryStore;
