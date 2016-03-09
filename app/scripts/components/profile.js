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
                console.log(data);
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


  });
