/*
* @Author: Andrey Starkov
* @Date:   2016-04-15 11:31:20
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-15 12:03:48
*/
var CommentsActions = require('../actions/commentsActions.js');

var CommentsStore = Reflux.createStore({
    listenables: [CommentsActions],
    comments: [],
    companyId: 0,
    sourceUrl: serverUrl+'/api/v2/comments/get/',
    init: function() {
     //   this.companyId = currentCompany;
    //    this.fetchList();
    },
    updateData: function(id){
        console.log('CommentsStore updateData('+id+')');
        if(id){
            this.companyId = id;
            this.fetchList();
        }
    },
    fetchList: function() {
        var some = this;

        var url = this.sourceUrl+this.companyId+'/'+userToken;
        console.log('CommentsStore: fetchList Url = ', url);
        $.getJSON(url, function (data) {
            some.comments = data.result.comments;
            console.log('CommentsStore: result = ', data.result.comments);
            some.trigger(some.comments);
        });
    }
});

module.exports = CommentsStore;
