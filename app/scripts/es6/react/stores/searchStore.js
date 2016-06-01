/*
* @Author: Andrey Starkov
* @Date:   2016-05-15 11:28:57
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-05-26 07:42:23
*/

var SearchActions = require('../actions/searchActions.js');

function searchQuery(params, callback){
	var queryUrl = serverUrl + '/api/v2/search';
	  $.ajax({ type: 'POST', url: queryUrl, data: params,
	     success: function(data) {
          console.log('searchQuery: ', data);
          if(callback) callback(data);
	     }
		});
}

var SearchStore = Reflux.createStore({
    listenables: [SearchActions],
    searchData: [],
    init: function() {
       // nothing happens
    },
    fetchList: function(params, callback) {
      var this_ = this;
      console.log('SearchStore: fetchList', params);
      if(params){
      	searchQuery(params, function(data){
      		console.log('SearchStore: results', data);
            if(data.result) {
            	this_.searchData = data.result;
            	this_.trigger(this_.searchData);
            	if(callback) callback(data.result);
            } else console.log('SearchStore: wtf');
      	});
      }
    }
});

module.exports = SearchStore;