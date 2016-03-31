/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:41:34
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-29 22:49:28
*/

var CompanyListActions = require('../actions/companyListActions.js');
var CuisinesActions = require('../actions/cuisinesActions.js');
var CuisinesStore = require('./cuisinesStore.js');

var CompanyListStore = Reflux.createStore({
    listenables: [CompanyListActions],
    cuisine: [],
    currentCuisine:0,
    companyList: [],
    sourceUrl: serverUrl+'/api/v2/restaurants/get',
    init: function() {
        this.fetchList();
    },
    updateData: function(){
        console.log('CompanyStore updateData()');
        this.fetchList();
    },
    showAll: function(){
        this.cuisine = 0;
    },
    selectByCuisine: function(cuisine){
        console.log('CompanyListStore: selectByCuisine, cuisine = ', cuisine);
        this.cuisine = cuisine;
        currentCuisine = cuisine;
        this.currentCuisine = cuisine.cuisine_id;
        this.fetchList(cuisine.cuisine_id);
    },
    getCurrentCuisine: function(){
         console.log('CompanyListStore: getCurrentCuisine, CurrentCuisine = ', this.currentCuisine);
         return this.currentCuisine;
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
    fetchList: function(cuisineId) {
      var some = this;
      var queryUrl = this.sourceUrl;

      this.cuisine = CuisinesActions.getCuisineById(cuisineId);

      console.log('CompanyListStore: fetchList: this.cuisine = '+this.cuisine);

      queryUrl += '?restaurantType=3';

      if( cuisineId ) {
        queryUrl += '&cuisineId='+cuisineId;
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
