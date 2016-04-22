/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:33:15
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-21 22:16:47
*/
var CampaignsActions = require('../actions/campaignsActions.js');

var CampaignsStore = Reflux.createStore({
    listenables: [CampaignsActions],
    campaignsData: [],
    companyId: 0,
    sourceUrl: serverUrl+'/api/v2/campaigns/permanent/get',
    init: function() {
    //   this.companyId = currentCompany;
        this.fetchList();
    },
    updateData: function(newId){
    //   console.log('CampaignsStore updateData() newId = ', newId);
        this.companyId = newId;
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
      var url = this.sourceUrl;

   //   console.log('CampaignsStore: fetchList Url = ', url);
      $.getJSON(url, function (data) {
        some.campaignsData = data.result.campaigns;
   //     console.log('CampaignsStore: result = ', data);
        some.trigger(some.campaignsData);
      });
    }
});

module.exports = CampaignsStore;
