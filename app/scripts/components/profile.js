  function getUserProfile(token, callback) {

      var remote = serverUrl + '/api/v2/user/profile/get';
      var result = {};

      if (token === undefined || token === null){
        console.log('getUserProfile: no token');
      } else {
        console.log('getUserProfile: token = ' + token);
        $.ajax({
            type: 'POST',
            async: 'false',
            dataType: 'json',
            url: remote,
            data: {
                'userToken': token
            },
            success: function(data) {
                console.log('getUserProfile: ', data.result.profile);
                result = data.result.profile;
                setStorage('profile', data.result.profile);
                callback(result);
            }
        });
      }
  }

  function editUserProfile(userToken, cityId, birthdate, name, surname, email, avatar) {
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
              console.log('editUserProfile: ', data);
                if (data.err === undefined || data.err  === null) {
                    toastr.success('Данные профиля сохранены');
                }
          }
      });
  }

  $(function() {
    $.getJSON(serverUrl+'/api/v2/history/orders/'+userToken, function (data) {
        console.log('ASDSA', data);
    });
  });
