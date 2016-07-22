/*
* @Author: Andrey Starkov
* @Date:   2016-04-02 14:02:06
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-21 22:17:05
*/

var CardsActions = require('../actions/cardsActions.js');

var CardsStore = Reflux.createStore({
    listenables: [CardsActions],
    cardsData: [],
    sourceUrl: serverUrl+'/api/v2/cards/get/'+userToken,
    bindUrl: serverUrl+'/api/v3/payments/cards/bind/'+userToken,
    init: function() {
        this.fetchList();
    },
    updateData: function(){
     //   console.log('CardsStore updateData()');
        this.fetchList();
    },
    bindCard: function() {
      $.getJSON(this.bindUrl, function(data){
    //    console.log('CardsStore bindCard', data);
      });
    },
    fetchList: function() {
      var some = this;
      $.getJSON(this.sourceUrl, function(data){
        var result = data.result;
        if( result !== undefined ){
     //       console.log('CardsStore fetchList', data);
            some.cardsData = data.result.cards;
            some.trigger(some.cardsData);
        } // else console.log('CardsStore: No Data: ',data);
      });
    }
});

module.exports = CardsStore;
