/*
* @Author: Andrey Starkov
* @Date:   2016-04-02 14:02:06
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-02 14:24:21
*/

var CardsActions = require('../actions/cardsActions.js');

var CardsStore = Reflux.createStore({
    listenables: [CardsActions],
    cardsData: [],
    sourceUrl: serverUrl+'/api/v2/cards/get/'+userToken,
    init: function() {
        this.fetchList();
    },
    updateData: function(){
        console.log('CardsStore updateData()');
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
      $.getJSON(this.sourceUrl, function(data){
        some.cardsData = data.result.cards;
        some.trigger(some.cardsData);
        console.log('CardsStore fetchList', some.historyList);
      });
    }
});

module.exports = CardsStore;
