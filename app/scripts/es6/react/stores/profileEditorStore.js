/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:37:12
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-07 14:59:48
*/
var ProfileEditorActions = require('../actions/profileEditorActions.js');
import cookie from 'react-cookie';

var ProfileEditorStore = Reflux.createStore({
    listenables: [ProfileEditorActions],
    profileData: [],
    userToken: cookie.load('token'),
    sourceUrl: serverUrl+'/api/v2/user/profile/get',
    init: function() {
        this.fetchList();
    },
    updateData: function(){
       // console.log('ProfileEditorStore updateData()');
        this.fetchList();
    },
    fetchList: function() {
        if(this.userToken){
       //     console.log('ProfileEditorStore: Token = ', this.userToken);
            var some = this;
            $.ajax({
                type: 'POST',
                async: 'false',
                dataType: 'json',
                url: this.sourceUrl,
                data: {
                    'userToken': userToken
                },
                success: function(data) {
                    var result = data.result;
                    if( result !== undefined ){
                    some.profileData = data.result.profile;
                 //   console.log('profileEditorStore: AJAX result: ',data);
                    some.trigger(some.profileData);
                 //   console.log('ProfileEditorStore some.profileData = ', some.profileData);
                    setStorage('profile', data.result.profile);
                    }
                }
            });
        }
    }
});

module.exports = ProfileEditorStore;
