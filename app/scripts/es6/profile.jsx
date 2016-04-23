
    function editUserField(fieldId, callback) {
        var theOptions = {};
        var theParameter = $('#'+fieldId).data('id');
        var currentCity = getStorage('city');
        var cityId;
        if(currentCity) {
            cityId = currentCity.city_id;
        } else cityId = 3;
        var setValue = $('#' + fieldId).val();

        theOptions['userToken'] = userToken;
        theOptions['cityId'] = cityId;

        if( fieldId == "userBirthdate" ){
            console.log('Editing: userBirthdate, ', setValue+' = '+moment(setValue).utc().format('X'));
            setValue = moment(setValue).utc().format('X');
            console.log('setValue: ', setValue);
        }

        theOptions[theParameter] = setValue;

        console.log('editUserField: Options: ',theOptions);
        $.ajax({
            url: serverUrl + '/api/v2/user/profile/edit',
            dataType: 'json',
            type: 'POST',
            data: theOptions,
            success: function(data) {
                console.log('editUserField: ', data);
                if (data.err === undefined || data.err === null) {
                    toastr.success('Данные профиля сохранены');
                }
                $('#' + fieldId).parent().addClass('has-success');
                refreshUserProfile();
                if (callback) callback(data);
            }
        });
    }

    function emptyProfile() {
        var token = userToken;
        getUserProfile(token, function(data) {
            var userBonus = getUserBonus(userToken);
            var userInfo = data;
            $('#userBadgeTop').html(`
              <div class="user-text" id="buttonEmptyProfile">
                <b class="user-name">Добро пожаловать!</b>
                <a class="r-bonus">У вас <b>${userBonus}</b> <span class="fa fa-rouble"></span>-бонусов</a>
              </div>
            `);
        });
    }

    export function refreshUserProfile() {
        var token = userToken;
        getUserProfile(token, function(data) {
            var userBonus = getUserBonus(userToken);
            var userInfo = data;
            var userAvatar = data.userAvatarUrl;
            if (data.userAvatarUrl === undefined || data.userAvatarUrl === null) {
                userAvatar = 'images/samples/user.png';
            }
            $('#userBadgeTop').html(`
          <div class="user-text">
            <b class="user-name">${data.userName} ${data.userSurname}</b>
            <a class="r-bonus"><b>${userBonus}</b> <span class="fa fa-rouble"></span>-бонусов</a>
          </div>
          <div class="user-avatar" style="background-image:url(${userAvatar})"></div>
        `);
        });
    }

    function getUserBonus(userToken) {
        var bonus;
        $.ajax({
            url: serverUrl + '/api/v2/user/bonus/' + userToken,
            async: false,
            dataType: 'json',
            success: function(data) {
                bonus = data.result.userBonus;
            }
        });
        return bonus;
    }

    $(function() {

        refreshUserProfile();
        var oldFieldVal;

        $(document).on('focusin', ".profile-autoupdate", function() {
            oldFieldVal = $(this).val();
        });

        $(document).on('focusout', ".profile-autoupdate", function() {
            var fieldId = $(this).attr('id');
            var newFieldVal = $(this).val();
            if( !(oldFieldVal == newFieldVal) ){
                console.log('Editing: #' + fieldId + ', data-id=' + $(this).data('id'), 'Old val = '+oldFieldVal);
                editUserField(fieldId);
            } else console.log('AutoField: Nothing changed');

        });


    });
