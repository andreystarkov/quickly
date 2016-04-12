var ReservationActions = require('../actions/reservationActions.js');

var ReservationHallsStore = Reflux.createStore({
    listenables: [ReservationActions],
    hallsList: [],
    company: 0,
    init: function() {

    },
    updateHalls: function(id){
        console.log('ReservationHallsStore updateData('+id+')');
        this.company = id;
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
      var url = serverUrl+'/api/v2/reservation/halls/'+this.company;
      console.log('ReservationTablesStore url: ', url);
      $.getJSON( url, function (data) {
        some.hallsList = data.result.halls;
        some.trigger(some.hallsList);
        console.log('ReservationHallsStore fetchList', some.hallsList);
      });
    }
});

module.exports = ReservationHallsStore;
