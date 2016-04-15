/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 22:12:41
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-14 22:30:31
*/

var InlineSvg = require('react-inlinesvg');
var routesMap = require('../routes/map.js');

import {Link, browserHistory} from 'react-router';

var ProfileEditorActions = require('../actions/profileEditorActions.js');
var HistoryActions = require('../actions/historyActions.js');
var CityListActions = require('../actions/cityListActions.js');
var CityList = require('../cityList.react.jsx');

var PageHeader = React.createClass({
    editProfile: function(){
        ProfileEditorActions.fetchList();
        HistoryActions.fetchList();
        browserHistory.push(routesMap.routes.profile.path);
    },
    componentDidMount: function(){
        CityListActions.fetchList;
    },
    render: function(){
        return(
            <div>
            <div className="top-line">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="logo screen-toggle" data-screen="pageMain">
                                <InlineSvg src="svg/logo.svg" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                                <div className="paths"><a href="#">Главная</a> / <a href="#">Доставка еды</a> / <a href="#">Пицца</a></div>
                        </div>
                        <div className="col-lg-2">
                            <div id="selectCityField">
                                <CityList />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="form-auth form-register pop" id="formRegisterPhone">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group label-floating is-empty">
                                            <label htmlFor="inputRegisterPhone" className="control-label">Ваш номер телефона</label>
                                            <input type="text" className="form-control pop" id="inputRegisterPhone" />
                                            <span className="help-block"></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <a href="#" id="buttonRegisterPhone" className="btn btn-padding btn-raised">
                                            Зарегистрироваться
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="form-auth form-code pop" id="formRegisterSMSCode">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <div className="form-group label-floating is-empty">
                                            <label htmlFor="inputRegisterSMSCode" className="control-label pop">Введите код, полученный по смс</label>
                                            <input type="text" className="form-control" id="inputRegisterSMSCode" />
                                            <span className="help-block"></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <a href="#" id="buttonRegisterSMSCode" className="btn btn-clean btn-padding btn-raised">
                                             Отправить
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="auth-box mini-profile" id="userAuthorizedTop">
                                <div className="dropdown-nice">
                                   <div className="user-top" id="userBadgeTop"></div>
                                   <div className="menu-box">
                                        <button className="btn button light" onClick={this.editProfile}>Редактировать профиль</button>
                                   </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = PageHeader;
