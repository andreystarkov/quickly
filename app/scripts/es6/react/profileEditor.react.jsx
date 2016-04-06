var ButtonMore = require('./components/buttonMore.js');
var ProfileEditorStore = require('./stores/profileEditorStore.js');
var ProfileEditorActions = require('./actions/profileEditorActions.js');
var CardsActions = require('./actions/cardsActions.js');
var CardsStore = require('./stores/cardsStore.js');

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

var ProfileField = React.createClass({
  getInitialState: function() {
      var value = this.props.value;
      return {
        value: 'Что-то'
      }
  },

  handleChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  render: function() {
    return ( <input type="text" value={this.state.value} onChange={this.handleChange} /> )
  }
});

var Field = React.createClass({
  getInitialState: function() {
    return {
      field: this.props.initVal
    };
  },
  onChange: function(e) {
     console.log('wtf ',e.target.value);
     this.setState({
        field: e.target.value
     });
  },
  render: function () {
      console.log('Field: state = ', this.state.field);
      console.log('Field: props val = ', this.props.initVal);
      return (
        <div className="form-group">
          <label className="control-label" htmlFor={this.props.id}>{this.props.name}</label>
          <input type={this.props.type}
          ref={this.props.id}
          data-id={this.props.id}
          type={this.props.type}
          className="form-control"
          value={this.state.field}
          onChange={this.onChange}
          id={this.props.id} />
        </div>
      );
  }
});

function openNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

var CardsEditor = React.createClass({
    mixins: [Reflux.connect(CardsStore, 'cardsData')],
    bindUrl: serverUrl+'/api/v3/payments/cards/bind/'+userToken,
    getInitalState: function(){
        return {
            cardsData: []
        }
    },
    bindCard: function() {
      $.getJSON(this.bindUrl, function(data){
        console.log('CardsEditor bindCard', data.result);
        openNewTab(data.result);
      });
    },
    render: function () {
        console.log('CardsEditor: ',this.state.cardsData);
        return (
          <div className="cards-editor">
            <b className="group-title">Банковские карты</b>
            <div className="profile-cards">
              <div className="card-item">
                <i className="fi-card-detail"></i>
                <span className="number">
                  **** **** **** 1125
                </span>
              </div>
            </div>
            <button onClick={this.bindCard} className="button main">Добавить карту</button>
          </div>
        )
    }
});

var ProfileEditorForm = React.createClass({
    getInitalState: function(){
        console.log('ProfileEditorForm getInitalState profile = ', this.props.profile);
        return {
            userAvatarUrl: '',
            userBirthdate: null,
            userEmail: '',
            userGender: 0,
            userName: this.props.profile.userName,
            userSurname: '',
            userPhone: ''
        }
    },
    onFieldChange: function(value){
        console.log('ProfileEditorForm onFieldChange: value = ', value.target);
    },
    onNameChange: function(e){
      this.setState({
        userName: e.target.value
      });
    },
    addCardForm: function(){
      swal({
        title: 'Введите номер карты',
        html: '<input id="inputCardNumber" type="text" className="form-control">',
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
                 <div className="form-group gender-select">
                    <div className="radio radio-primary">
                      <label>
                        <input type="radio" name="optionsRadios" id="optionsRadios1" value="0" />
                        <span className="radio-label-text">Мужской</span>
                      </label>
                    </div>
                    <div className="radio radio-primary">
                      <label>
                        <input type="radio" name="optionsRadios" id="optionsRadios2" value="1" />
                        <span className="radio-label-text">Женский</span>
                      </label>
                    </div>
                 </div>
              </div>
              <div className="col-lg-4 the-info">
                 <div className="row delivery">
                    <div className="profile-field col-lg-6">
                      <Field type="text" initVal={profile.userName} name="Имя" id="userName" />
                    </div>
                    <div className="profile-field col-lg-6">
                      <Field type="text" type="text" name="Фамилия" id="userSurname" initVal={profile.userSurname} />
                    </div>
                    <div className="profile-field col-lg-6">
                      <Field type="datetime" name="Дата рождения" id="userBirthdate" initVal={profile.userBirthdate} />
                    </div>
                    <div className="profile-field col-lg-6">
                      <Field type="email" name="Электронная почта" id="userEmail" initVal={profile.userEmail} />
                    </div>
                 </div>
              </div>
              <div className="col-lg-4">
                <div className="row">
                  <div className="col-lg-6">
                    <CardsEditor />
                  </div>
                  <div className="col-lg-6">
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

