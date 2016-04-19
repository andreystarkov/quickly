var CuisinesActions = require('../actions/cuisinesActions.js');

var CuisinesStore = Reflux.createStore({
    listenables: [CuisinesActions],
    cuisinesData: [],
    sourceUrl: serverUrl+'/api/v2/cuisines/get',
    init: function() {
        this.fetchList();
    },
    getCuisineById: function(id){
        var cuisine = _.where(this.cuisinesData,{cuisine_id:id});
    //    console.log('CuisinesStore: getCuisineById('+id+'): ',cuisine);
        return cuisine;
    },
    fetchList: function() {
      var some = this;
      $.getJSON(this.sourceUrl, function (data) {
        setStorage('cuisines', data.result.cuisines);
        some.cuisinesData = data.result.cuisines;
        some.trigger(some.cuisinesData);
   //    console.log('CuisinesStore fetchList', some.cuisinesData);
      });
    }
});

module.exports = CuisinesStore;
