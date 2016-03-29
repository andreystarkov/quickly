/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:41:34
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-29 13:50:24
*/
var CompanyListActions = require('../actions/companyListActions.js');

var CompanyListStore = Reflux.createStore({
    listenables: [CompanyListActions],
    companyList: [],
    sourceUrl: serverUrl+'/api/v2/restaurants/get',
    init: function() {
        this.fetchList();
    },
    updateData: function(){
        console.log('CompanyStore updateData()');
        this.fetchList();
    },
    selectByCuisine:function(cuisine){
        console.log('CompanyListStore: selectByCuisine, cuisine = '+cuisine);
        this.fetchList(cuisine);
    },
    filterData: function(cuisine, type){
        var data = this.companyList;
        var filtered;

        console.log('CompanyListStore: filterData: type = '+type);

        if (type == 3) filtered = _.filter(data, function(element){
            return element.restaurant_payment_type == 1;
        });

        if (type == 0) { this.fetchList(); } else {
            this.companyList = filtered;
            this.trigger(this.companyList);
            console.log('CompanyListStore: filterData: ', filtered);
        }
        return filtered;
    },
    fetchList: function(cuisine) {
      var some = this;
      var queryUrl = this.sourceUrl;
      queryUrl += '?restaurantType=3';
      if( cuisine ) {
        queryUrl += '&cuisineId='+cuisine;
      }
      console.log('CompanyListStore: queryUrl = ',queryUrl);

      $.getJSON(queryUrl, function (data) {

        console.log('CompanyListStore fetchList', data);
        some.companyList = data.result.restaurants;
        some.trigger(some.companyList);

      });
    }
});

module.exports = CompanyListStore;
