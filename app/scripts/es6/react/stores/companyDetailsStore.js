/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:33:15
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-29 22:20:25
*/

var CompanyDetailsActions = Reflux.createActions([
    'fetchList', 'updateData'
]);

var CompanyDetailsStore = Reflux.createStore({
    listenables: [CompanyDetailsActions],
    companyData: [],
    companyId: currentCompany,
    sourceUrl: serverUrl+'/api/v2/restaurants/get/'+currentCompany,
    init: function() {
        this.companyId = currentCompany;
        this.fetchList();
    },
    updateData: function(newId){
        console.log('CompanyDetailsStore updateData()');
        this.companyId = newId;
        this.sourceUrl = serverUrl+'/api/v2/restaurants/get/'+newId;
        console.log('CompanyDetailsStore:', this.sourceUrl);
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
      $.getJSON(this.sourceUrl, function (data) {
        some.companyData = data.result.restaurant;
        console.log('REFLUX: CompanyDetailsStore fetchList', some.companyData);
        some.trigger(some.companyData);
      });
    }
});

module.exports = CompanyDetailsStore;
