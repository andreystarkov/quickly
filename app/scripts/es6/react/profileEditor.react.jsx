var ButtonMore = require('./components/buttonMore.js');
var ProfileEditorStore = require('./stores/profileEditorStore.js');
var ProfileEditorActions = require('./actions/profileEditorActions.js');

function editUserField(obj, callback) {
    var theOptions = {};
    var theParameter = $('#' + fieldId).data('id');

    theOptions['userToken'] = userToken;
    theOptions['cityId'] = cityId;
    theOptions[theParameter] = $('#' + fieldId).val();

    console.log('editUserField: AJAX: ' + theParameter + ' = ' + fieldId);
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


var Field = React.createClass({
  render: function () {
      return (
        <div className="form-group">
          <label className="control-label" htmlFor={this.props.id}>{this.props.name}</label>
          <input type={this.props.type } ref={this.props.id} data-id={this.props.id} type="text" className="form-control" value={this.props.value} defaultValue={this.props.default} onChange={this.props.onChange} id={this.props.id} defaultValue={this.props.value} />
        </div>
      );
  }
});

var AddressAddForm = React.createClass({
    render: function () {
        return (
          <div>
           test
          </div>
        )
    }
});

var ProfileEditorForm = React.createClass({
    getInitalState: function(){
        console.log('ProfileEditorForm getInitalState profile = ', this.props.profile);
        return {
          profile: {
            userAvatarUrl: '',
            userBirthdate: null,
            userEmail: '',
            userGender: 0,
            userName: '',
            userSurname: '',
            userPhone: ''
          }
        }
    },
    onFieldChange: function(value){
        console.log('ProfileEditorForm onFieldChange: value = ', value.target);
    },
    addCardForm: function(){
      swal({
        title: 'Введите номер карты',
        html: '<input id="inputCardNumber" type="text" class="form-control">',
        showCancelButton: true,
        closeOnConfirm: false,
        allowOutsideClick: false
      },
      function() {
        swal({
          html:
            'Номер карты: <strong>' +
            $('#inputCardNumber').val() +
            '</strong>'
        });
      })
    },
    render: function(){
        var total = 0;
        var profile = this.props.profile;
        var userAvatar;
        if (profile.userAvatarUrl === undefined || profile.userAvatarUrl === null) {
            userAvatar = 'images/samples/user.png';
        } else userAvatar = profile.userAvatarUrl;

        console.log('ProfileEditorForm: profile = ', this.state);
        return (
        <div className="user-editor container">
           <div className="row">
              <div className="col-lg-2 text-center">
                 <div className="avatar round">
                    <img src={userAvatar} alt="..." />
                 </div>
                 <div className="btn-group">
                    <a className="button light small">Изменить аватар</a>
                 </div>
              </div>
              <div className="col-lg-10 the-info">
                 <div className="row delivery">
                    <div className="col-lg-2">
                      <Field type="text" name="Имя" id="userName" default={profile.userName} />
                    </div>
                    <div className="col-lg-2">
                      <Field type="text" name="Фамилия" id="userSurname" default={profile.userName} />
                    </div>
                    <div className="col-lg-2">
                      <Field type="datetime" name="Дата рождения" id="userBirthdate" default={profile.userName} />
                    </div>
                    <div className="col-lg-3">

                    </div>
                 </div>
                  <div className="line row">
                    <div className="col-lg-6">
                      <b className="el-title">Привязка карты</b>
                      <button className="button main" onClick={this.addCardForm}>Добавить карту</button>
                    </div>
                  </div>
              </div>
           </div>
           <div className="row buttons-line">
              <div className="col-lg-2">
              </div>
              <div className="col-lg-10 buttons-tabs">
                 <div className="btn-group btn-group-justified" data-tabs="tabs-profile">
                    <a href="#tab-order-history" className="tab-toggle btn button light" id="tabOrderHistory">
                    <span>История заказов</span>
                    </a>
                    <a href="#tab-reservation-history" className="tab-toggle btn button light">
                    <span>История бронирования</span>
                    </a>
                    <a href="#tab-comments-history" className="tab-toggle btn button light">
                    <span>Оставленные отзывы</span>
                    </a>
                    <a id="buttonReturnShop" href="#" className="btn button main">
                    <span>Вернуться к ресторану</span>
                    </a>
                 </div>
              </div>
           </div>
        </div>
        )
    }
});

var ProfileEditor = React.createClass({
    mixins: [Reflux.connect(ProfileEditorStore, 'profileData')],
    limit: 5,
    getInitialState: function() {
      return {
        data: [],
        profileData: {
          userAvatarUrl: '',
          userBirthdate: null,
          userEmail: '',
          userGender: 0,
          userName: '',
          userSurname: '',
          userPhone: ''
        }
      };
    },
    componentDidMount: function() {
        ProfileEditorActions.updateData();
    },
    render: function() {
     //   profileEditorActions.updateData();
        var theData = this.state.profileData;
        console.log('ProfileEditor: theData = ',theData);
        return (
            <ProfileEditorForm profile={theData} />
        )
    }
});

ReactDOM.render(<ProfileEditor />, document.getElementById('profileEditor'));

