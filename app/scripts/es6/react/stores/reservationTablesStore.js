var ReservationActions = require('../actions/reservationActions.js');

var ReservationStore = Reflux.createStore({
    listenables: [ReservationActions],
    tablesData: [],
    hallsData: 0,
    hallId: 0,
    companyId: 0,
    theDate: 0,
    init: function() {
       // this.fetchList();
    },
    updateData: function(hall, date){
        console.log('ReservationTablesStore: updateData(): hall='+hall+', date=',date);
        this.hallId = hall;
        this.theDate = date;
        this.fetchList();
    },
    fetchHalls: function(companyId){
      this.companyId = companyId;
      var sourceUrl = serverUrl+'/api/v2/reservation/halls/'+this.companyId;
      console.log('ReservationTablesStore: halls url = '+sourceUrl);
      $.getJSON(sourceUrl, function(data){
        some.hallsData = data;
        some.trigger(some.hallsData);
        console.log('ReservationTablesStore: halls result = ', some.hallsData);
      });
    },
    fetchList: function() {
      var sourceUrl = serverUrl+'/api/v2/reservation/tables/'+this.hallId+'/'+this.theDate;
      var some = this;
      console.log('ReservationTablesStore: tables url = '+sourceUrl);
      $.getJSON(sourceUrl, function(data){
        some.tablesData = data;
        some.trigger(some.tablesData);
        console.log('ReservationTablesStore: tables result = ', some.tablesData);
      });
    }
});

module.exports = ReservationStore;
