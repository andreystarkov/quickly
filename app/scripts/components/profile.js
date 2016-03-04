
  function getUserProfile(token) {
      console.log('getUserProfile: token = ' + token);
      var result = $.ajax({
          type: 'POST',
          async: 'false',
          dataType: 'json',
          url: serverUrl + '/api/v2/user/profile/get',
          data: {
              'userToken': token
          },
          success: function(data) {
              console.log('getUserProfile: success');
              console.log(data);
          }
      });
      return result;
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