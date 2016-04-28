import {refreshUserProfile} from '../profile.jsx';

function editProfileField(theParameter, theValue, callback){
    var currentCity = getStorage('city');
    var cityId;
    if(currentCity){
       cityId = currentCity.city_id;
    } else cityId = 3;
    var theOptions = {};
    theOptions['userToken'] = Cookies.get('token');
    theOptions['cityId'] = cityId;
    theOptions[theParameter] = theValue;

    console.log('editProfileField: ', theOptions);
    $.ajax({
        url: serverUrl + '/api/v2/user/profile/edit',
        dataType: 'json',
        type: 'POST',
        data: theOptions,
        success: function(data) {
            console.log('editProfileField: ajax result', data);
            if (data.err === undefined || data.err === null) {
                toastr.success('Данные профиля сохранены');
            }
            if(callback) callback(data);
            refreshUserProfile();
        }
    });
}

module.exports = editProfileField;
