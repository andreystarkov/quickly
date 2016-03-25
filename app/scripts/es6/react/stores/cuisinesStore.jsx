var CuisinesActions = Reflux.createActions([
    'fetchList'
]);

var CuisinesStore = Reflux.createStore({
    listenables: [CuisinesActions],
    cuisinesData: [],
    sourceUrl: serverUrl+'/api/v2/cuisines/get',
    init: function() {
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
      $.getJSON(this.sourceUrl, function (data) {
        some.cuisinesData = data.result.cuisines;
        some.trigger(some.cuisinesData);
        console.log('REFLUX: CuisinesStore fetchList', some.cuisinesData);
      });
    }
});

module.exports = CuisinesStore;
