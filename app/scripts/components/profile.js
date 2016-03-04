  function getUserProfile(token, callback) {
      console.log('getUserProfile: token = ' + token);

      var remote = serverUrl + '/api/v2/user/profile/get';
      var result = {};

      if (token === undefined || token === null){
        console.log('getUserProfile: no token');
      } else {
        $.ajax({
            type: 'POST',
            async: 'false',
            dataType: 'json',
            url: remote,
            data: {
                'userToken': token
            },
            success: function(data) {
                console.log('getUserProfile: success');
                console.log(data.result.profile);
                result = data.result.profile;
                callback(result);
            }
        });
      }
  }

  function editUserProfile(userToken, cityId, birthdate, name, surname, email, avatar) {
      console.log('editUserProfile: start');

      $.ajax({
          type: 'POST',
          url: serverUrl + '/api/v2/user/profile/edit',
          data: {
              'userToken': userToken,
              'cityId': cityId,
              'birthdate': birthdate,
              'name': name,
              'surname': surname,
              'email': email,
              'avatar': avatar
          },
          success: function(data) {
              console.log('editUserProfile: success');
              console.log(data);
          }
      });
  }

  $(function() {

    getUserProfile(userToken, function(data){
        userInfo = data;
        $('#userBadgeTop').append(
          '<div class="user-text">'+
            '<b class="user-name">'+data.userName+' '+data.userSurname+'</b>'+
            '<a class="r-bonus"><b>20</b> <span class="fa fa-rouble"></span>-бонусов</a>'+
          '</div>'+
          '<div class="user-avatar" style="background-image:url('+data.userAvatarUrl+')"></div>'
        );
    });

  });

  function pasteProfileEditor(){
        var output = "";
  }