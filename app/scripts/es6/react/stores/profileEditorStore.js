/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 09:37:12
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-29 09:38:30
*/

var ProfileEditorActions = Reflux.createActions([
    'fetchList', 'updateData'
]);

var ProfileEditorStore = Reflux.createStore({
    listenables: [ProfileEditorActions],
    profileData: [],
    sourceUrl: serverUrl+'/api/v2/user/profile/get',
    init: function() {
        this.fetchList();
    },
    updateData: function(){
        console.log('ProfileEditorStore updateData()');
        this.fetchList();
    },
    fetchList: function() {
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
                some.profileData = data.result.profile;
                some.trigger(some.profileData);
                console.log('ProfileEditorStore some.profileData = ', some.profileData);
                setStorage('profile', data.result.profile);
            }
        });
    }
});

module.exports = ProfileEditorStore;
