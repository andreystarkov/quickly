/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:33:15
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-29 22:20:25
*/
var CompanyDetailsActions = require('../actions/companyDetailsActions.js');

var CompanyDetailsStore = Reflux.createStore({
    listenables: [CompanyDetailsActions],
    companyData: [],
    companyId: 0,
    sourceUrl: serverUrl+'/api/v2/restaurants/get/',
    init: function() {
        this.companyId = currentCompany;
        this.fetchList();
    },
    updateData: function(newId){
        console.log('CompanyDetailsStore updateData() newId = ', newId);
        this.companyId = newId;
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
      var url = this.sourceUrl + this.companyId;

      console.log('CompanyDetailsStore: fetchList Url = ', url);
      $.getJSON(url, function (data) {
        some.companyData = data.result.restaurant;
        console.log('CompanyDetailsStore: result = ', some.companyData);
        some.trigger(some.companyData);
      });
    }
});

module.exports = CompanyDetailsStore;
