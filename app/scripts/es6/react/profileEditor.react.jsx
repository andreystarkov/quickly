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
          <label className="control-label" htmlFor="userName">{this.props.name}</label>
          <input data-id={this.props.id} type="text" className="form-control" value={this.props.value} onChange={this.props.onChange} defaultValue={this.props.value} />
        </div>
      );
  }
});
/*
var AddressAddForm = React.createClass({
    render: function () {
        return (
            <div id="profile-addresses" data-id="1" className="inline-block float-left">
               <i className="icon icon-location-pin"></i>
               <div className="box">
                  <div className="form-group label-placeholder is-empty" title="Введите адреса для доставки">
                     <input type="text" className="form-control" id="profile-address-1" />
                  </div>
               </div>
            </div>
            <div className="box">
               <a href="#" className="button button-plus tip" id="profile-address-add">
               <i className="icon fa fa-plus-square-o"></i>
               <span>Добавить адрес</span>
               </a>
            </div>
        )
    }
});*/

var ProfileEditorForm = React.createClass({
    getInitalState: function(){
        return {
            userAvatar: this.props.userAvatar,
            userSurname: this.props.userSurname,
            userBirth: this.props.userBirth,
            userEmail: this.props.userEmail

        }
    },
    onFieldChange: function(value){
        console.log('ProfileEditorForm onFieldChange: value = ', event.target);
    },
    render: function(){
        var total = 0;
        var profile = this.props.profile;
        var userAvatar;
        if (profile.userAvatarUrl === undefined || profile.userAvatarUrl === null) {
            userAvatar = 'images/samples/user.png';
        } else userAvatar = profile.userAvatarUrl;

        console.log('ProfileEditorForm: profile = ', profile);
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
                    <div className="col-lg-3">
                        <Field name="Имя" id="userName" value={profile.userName} onChange={this.onFieldChange} />
                    </div>
                    <div className="col-lg-3">
                        <Field name="Фамилия" id="userSurname" value={profile.userSurname} onChange={this.onFieldChange} />
                    </div>
                    <div className="col-lg-3">
                        <Field name="Дата рождения" id="userBirth" value={profile.userBirth} onChange={this.onFieldChange} />
                    </div>
                    <div className="col-lg-3">
                        <Field name="E-Mail" id="userEmail" value={profile.userEmail} onChange={this.onFieldChange} />
                    </div>
                 </div>
                 <div className="line delivery">

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
        profileData: []
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
