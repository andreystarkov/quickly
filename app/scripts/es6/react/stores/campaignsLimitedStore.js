/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:33:15
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-29 22:20:25
*/
var CampaignsActions = require('../actions/campaignsActions.js');

var CampaignsLimitedStore = Reflux.createStore({
    listenables: [CampaignsActions],
    campaignsLimitedData: [],
    companyId: 0,
    sourceUrl: serverUrl+'/api/v2/campaigns/limited/get',
    init: function() {
        this.fetchList();
    },
    updateData: function(newId){
        console.log('CampaignsLimitedStore updateData()');
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
      var url = this.sourceUrl;

      console.log('CampaignsLimitedStore: fetchList Url = ', url);
      $.getJSON(url, function (data) {
        some.CampaignsLimitedData = data.result.campaigns;
      //  console.log('CampaignsLimitedStore: result = ', data);
        some.trigger(some.CampaignsLimitedData);
      });
    }
});

module.exports = CampaignsLimitedStore;
