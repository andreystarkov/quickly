import LoadingOrderAnimation from 'react-loading-order-with-animation';

var ButtonMore = require('./components/buttonMore.js');
var ProfileEditorStore = require('./stores/profileEditorStore.js');
var ProfileEditorActions = require('./actions/profileEditorActions.js');
var ReservationHistoryActions = require('./actions/reservationHistoryActions.js');
var OrdersHistoryActions = require('./actions/reservationHistoryActions.js');
var HistoryActions = require('./actions/historyActions.js');
var CardsActions = require('./actions/cardsActions.js');
var CardsStore = require('./stores/cardsStore.js');
var ButtonTabToggle = require('./components/buttonTabToggle.js');

import {refreshUserProfile} from '../profile.jsx';

var routesMap = require('./routes/map.js');
import {Link, browserHistory} from 'react-router';

var FieldDefault = React.createClass({
    render: function() {
      return (
        <div className="form-group">
          <label className="control-label" htmlFor={this.props.id}>{this.props.name}</label>
          <input
              type={this.props.type || "text"}
              className="form-control profile-autoupdate"
              data-id={this.props.field}
              onChange={this.props.onChange}
              id={this.props.id} />
        </div>
        )
    }
});

var FieldControlled = React.createClass({
    getInitialState: function() {
    //  console.log('FieldControlled: default = ', this.props.defaultValue);
      return {
        value: this.props.defaultValue
      }
    },
    componentWillUpdate: function(){
     //   console.log('FieldControlled: willUpdate');
    },
    componentDidUpdate: function(){
     //   console.log('FieldControlled: didUpdate');
    },
    handleChange: function(event) {
      this.setState({
        value: event.target.value
      });
    },
    render: function() {
      return (
        <div className="form-group">
          <label className="control-label" htmlFor={this.props.id}>{this.props.name}</label>
          <input type={this.props.type || "text"} className="form-control profile-autoupdate"
          value={this.state.value}
          data-id={this.props.field}
          onChange={this.handleChange}
          id={this.props.id} />
        </div>
        )
    }
});

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
    //    console.log('CardsEditor bindCard', data.result);
        openNewTab(data.result);
      });
    },
    render: function () {
     //   console.log('CardsEditor: ',this.state.cardsData);
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
      //  console.log('ProfileEditorForm getInitalState');
    },
    componentWillUpdate: function(){
     //   console.log('ProfileEditorForm willUpdate');
    },
    componentDidMount: function(){
        $.material.init();
        OrdersHistoryActions.fetchList();
        HistoryActions.fetchList();
        ReservationHistoryActions.fetchList()
    },
    componentDidUpdate: function(){
      //  console.log('ProfileEditorForm didUpdate');
        $('#userSurname').val(this.props.profile.userSurname);
        $('#userName').val(this.props.profile.userName);
        $('#userEmail').val(this.props.profile.userEmail);

        var birthDate = moment.unix(this.props.profile.userBirthdate).format("YYYY-MM-DD");
        $('#userBirthdate').val(birthDate);
    },
    onFieldChange: function(value){
      //  console.log('ProfileEditorForm onFieldChange: value = ', value.target);
    },
    onBirthChange: function(e){
      //  console.log('onBirthChange: ', e.target.value);
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
    setGender: function(e){
       // console.log('setGender: ', e.target.value);
        this.editUserField('gender', e.target.value);
    },
    editUserField: function(theParameter, theValue){
        var currentCity = getStorage('city');
        var cityId = currentCity.city_id || 3;

        var theOptions = {};
        theOptions['userToken'] = userToken;
        theOptions['cityId'] = cityId;
        theOptions[theParameter] = theValue;

      //  console.log('ProfileEditorForm: editUserField: Options: ', theOptions);

        $.ajax({
            url: serverUrl + '/api/v2/user/profile/edit',
            dataType: 'json',
            type: 'POST',
            data: theOptions,
            success: function(data) {
          //      console.log('ProfileEditorForm: editUserField: ', data);
                if (data.err === undefined || data.err === null) {
                    toastr.success('Данные профиля сохранены');
                }
                refreshUserProfile();
            }
        });
    },
    returnShop: function(){
        browserHistory.push(routesMap.routes.main.path);
    },
    render: function(){
        var total = 0;
        var profile = this.props.profile;
        var userAvatar, maleChecked, femaleChecked;

       // console.log('ProfileEditorForm: profile = ', profile);

        if (profile.userAvatarUrl === undefined || profile.userAvatarUrl === null) {
            userAvatar = 'images/samples/user.png';
        } else userAvatar = profile.userAvatarUrl;

        if( profile.userGender == 1 ) {
            maleChecked = "checked";
            $('#profileMaleRadio').prop('checked', true);
        }

        if( profile.userGender == 2 ) {
            femaleChecked = "checked";
            $('#profileFemaleRadio').prop('checked', true);
        }

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
                        <input onChange={this.setGender} type="radio" id="profileMaleRadio" name="profileGender" data-id="gender" value="1" />
                        <span className="radio-label-text">Мужской</span>
                      </label>
                    </div>
                    <div className="radio radio-primary">
                      <label>
                        <input onChange={this.setGender} type="radio" id="profileFemaleRadio" name="profileGender" data-id="gender" value="2" />
                        <span className="radio-label-text">Женский</span>
                      </label>
                    </div>
                 </div>
              </div>
              <div className="col-lg-5 the-info">
                 <div className="row delivery">
                    <div className="profile-field col-lg-6">
                      <FieldControlled type="text" field="name" defaultValue={profile.userName} name="Имя" id="userName" />
                    </div>
                    <div className="profile-field col-lg-6">
                      <FieldControlled type="text" field="surname" defaultValue={profile.userSurname} name="Фамилия" id="userSurname" />
                    </div>
                    <div className="profile-field col-lg-6">
                      <FieldControlled type="date" field="birthdate" defaultValue={profile.userBirthdate} name="Дата рождения" id="userBirthdate" />
                    </div>
                    <div className="profile-field col-lg-6">
                      <FieldControlled type="text" field="email" defaultValue={profile.userEmail} name="Электронная почта" id="userEmail" />
                    </div>
                 </div>
              </div>
              <div className="col-lg-5">
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
                    <ButtonTabToggle name="История заказов" active="true" tab="tab-order-history" id="tabOrdersHistory" />
                    <ButtonTabToggle name="История бронирования" tab="tab-reservation-history" />

                    <button onClick={this.returnShop} className="btn button main float-right">
                        <span>Вернуться к покупкам</span>
                    </button>
                 </div>
              </div>
           </div>
        </div>
        )
    }
});

// <ButtonTabToggle name="Оставленные отзывы" tab="tab-comments-history" />

var ProfileEditor = React.createClass({
    mixins: [Reflux.connect(ProfileEditorStore, 'profileData')],
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
        var theData = this.state.profileData;
        return (
            <ProfileEditorForm profile={theData} />
        )
    }
});

module.exports = ProfileEditor;
