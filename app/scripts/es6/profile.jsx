    function createProfileEditor(profile, callback) {

        var birthDate = moment(profile.userBirthdate, "MM-DD-YYYY");
        var userAvatar = imageBaseUrl + profile.userAvatarUrl;
        if (profile.userAvatarUrl === undefined || profile.userAvatarUrl === null) {
            userAvatar = 'images/samples/user.png';
        }

        var htmlTemplate =
            `<div class="user-editor container">
           <div class="row">
              <div class="col-lg-2 text-center">
                 <div class="avatar round">
                    <img src="${userAvatar}" alt="...">
                 </div>
                 <div class="btn-group">
                    <a class="button light small">Изменить аватар</a>
                 </div>
              </div>
              <div class="col-lg-10 the-info">
                 <div class="row delivery">
                    <div class="col-lg-4">
                     <div class="title user-name-edit">
                        <div class="form-group" style="width:48%; display: inline-block">
                          <label class="control-label" for="userName">Имя</label>
                          <input type="text" class="form-control focus-out autoupdate" data-id="name" id="userName" value="${profile.userName}">
                        </div>
                        <div class="form-group" style="width:48%; display: inline-block">
                          <label class="control-label" for="userSurname">Фамилия</label>
                          <input type="text" class="form-control focus-out autoupdate" data-id="surname" id="userSurname" value="${profile.userSurname}">
                        </div>
                     </div>
                    </div>
                    <div class="col-lg-3">
                       <div class="form-group">
                          <label class="control-label" for="userEmail">Электронная почта</label>
                          <input type="email" class="form-control focus-out autoupdate" data-id="email" id="userEmail" value="${profile.userEmail}">
                       </div>
                    </div>
                    <div class="col-lg-3" style="display:none">
                       <div class="form-group">
                          <label class="control-label" for="userPhone">Номер телефона</label>
                          <input type="tel" class="form-control focus-out" id="userPhone" value="${profile.userPhone}">
                       </div>
                    </div>
                    <div class="col-lg-3">
                       <div class="form-group">
                          <label class="control-label" for="userBirth">Дата рождения</label>
                          <input type="date" class="form-control focus-out" data-id="birthdate" id="userBirth" value="${profile.userPhone}">
                       </div>
                    </div>
                    <div class="col-lg-3" style="display:none">
                       <div class="form-group">
                          <label class="control-label" for="userCity">Город</label>
                          <input type="text" class="form-control" id="userCity" value="Оренбург">
                       </div>
                    </div>
                 </div>
                 <div class="line delivery" style="padding-top:20px">
                    <div id="profile-addresses" data-id="1" class="inline-block float-left">
                       <i class="icon icon-location-pin"></i>
                       <div class="box">
                          <div class="form-group label-placeholder is-empty" title="Введите адреса для доставки">
                             <input type="text" class="form-control" id="profile-address-1">
                          </div>
                       </div>
                    </div>
                    <div class="box">
                       <a href="#" class="button button-plus tip" id="profile-address-add">
                       <i class="icon fa fa-plus-square-o"></i>
                       <span>Добавить адрес</span>
                       </a>
                    </div>
                 </div>
              </div>
           </div>
           <div class="row buttons-line">
              <div class="col-lg-2">
              </div>
              <div class="col-lg-10 buttons-tabs">
                 <div class="btn-group btn-group-justified" data-tabs="tabs-profile">
                    <a href="#tab-order-history" class="tab-toggle btn button light" id="tabOrderHistory">
                    <span>История заказов</span>
                    </a>
                    <a href="#tab-reservation-history" class="tab-toggle btn button light">
                    <span>История бронирования</span>
                    </a>
                    <a href="#tab-comments-history" class="tab-toggle btn button light">
                    <span>Оставленные отзывы</span>
                    </a>
                    <a id="buttonReturnShop" href="#" class="btn button main">
                    <span>Вернуться к ресторану</span>
                    </a>
                 </div>
              </div>
           </div>
        </div>`;
        $('#editUserProfile').prepend(htmlTemplate);
        if (callback) callback();
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

    function refreshUserProfile() {
        var token = userToken;
        getUserProfile(token, function(data) {
            var userBonus = getUserBonus(userToken);
            var userInfo = data;
            var userAvatar = imageBaseUrl + data.userAvatarUrl;
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

/*        getUserProfile(userToken, function(data) {
            console.log('getUserProfile:', data);
            createProfileEditor(data, function() {
                $('.user-editor .control-label').each(function() {
                    $(this).append('<i class="status-icon its-ok icon-check"></i>');
                });
            });
        });*/

        $(document).on('click', '#buttonReturnShop', function(event) {
            easyVelocity('.page-wrapper', 'transition.flipXOut', function() {
                easyVelocity('#pageCompany', 'transition.flipXIn');
            });
        });

        refreshUserProfile();

/*        $(document).on('focusout', ".user-editor .autoupdate", function() {
            var fieldId = $(this).attr('id');
            console.log('Editing: #' + fieldId + ', data-id=' + $(this).data('id'));
            editUserField(fieldId);
        });
*/
    });
