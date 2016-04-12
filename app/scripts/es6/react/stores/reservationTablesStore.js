var ReservationActions = require('../actions/reservationActions.js');

var ReservationTablesStore = Reflux.createStore({
    listenables: [ReservationActions],
    hall: 0,
    date: 0,
    tablesList: [],
    init: function() {

    },
    updateTables: function(id, date){
        console.log('ReservationTablesStore updateTables(id='+id+',date='+date+')');
        this.hall = id;
        this.date = date;
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
      var url = serverUrl+'/api/v2/reservation/tables/'+this.hall+'/'+this.date;
      console.log('ReservationTablesStore url: ', url);
      $.getJSON( url, function (data) {
        some.tablesList = data.result.reservations;
        some.trigger(some.tablesList);
        console.log('ReservationTablesStore result: ', some.hallsList);
      });
    }
});

module.exports = ReservationTablesStore;
