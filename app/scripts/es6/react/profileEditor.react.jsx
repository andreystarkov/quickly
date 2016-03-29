var ButtonMore = require('./components/buttonMore.js');
var ProfileEditorStore = require('./stores/profileEditorStore.js');

var ProfileEditorForm = React.createClass({
    render: function(){
        var total = 0;
        var profile = this.props.profile;

        var userAvatar =  imageBaseUrl+profile.userAvatarUrl;
        if (profile.userAvatarUrl === undefined || profile.userAvatarUrl === null) { userAvatar = 'images/samples/user.png'; }

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
                    <div className="col-lg-4">
                     <div className="title user-name-edit">
                        <div className="form-group">
                          <label className="control-label" for="userName">Имя</label>
                          <input type="text" className="form-control focus-out autoupdate" data-id="name" id="userName" value={profile.userName} />
                        </div>
                        <div className="form-group">
                          <label className="control-label" for="userSurname">Фамилия</label>
                          <input type="text" className="form-control focus-out autoupdate" data-id="surname" id="userSurname" value={profile.userSurname} />
                        </div>
                     </div>
                    </div>
                    <div className="col-lg-3">
                       <div className="form-group">
                          <label className="control-label" for="userEmail">Электронная почта</label>
                          <input type="email" className="form-control focus-out autoupdate" data-id="email" id="userEmail" value={profile.userEmail} />
                       </div>
                    </div>
                    <div className="col-lg-3">
                       <div className="form-group">
                          <label className="control-label" for="userPhone">Номер телефона</label>
                          <input type="tel" className="form-control focus-out" id="userPhone" value={profile.userPhone} />
                       </div>
                    </div>
                    <div className="col-lg-3">
                       <div className="form-group">
                          <label className="control-label" for="userBirth">Дата рождения</label>
                          <input type="date" className="form-control focus-out" data-id="birthdate" id="userBirth" value={profile.userBirthdate} />
                       </div>
                    </div>
                    <div className="col-lg-3">
                       <div className="form-group">
                          <label className="control-label" for="userCity">Город</label>
                          <input type="text" className="form-control" id="userCity" value="Оренбург" />
                       </div>
                    </div>
                 </div>
                 <div className="line delivery">
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
        return (
            <ProfileEditorForm profile={theData} />
        )
    }
});

// ReactDOM.render(<ProfileEditor />, document.getElementById('profileEditor'));
