/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 22:12:41
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-27 06:59:05
*/
import {Link, browserHistory} from 'react-router';
import {notAuthorized} from '../../auth.jsx';

var routesMap = require('../routes/map.js');
var CityListActions = require('../actions/cityListActions.js');
var CityList = require('../cityList.react.jsx');

var PageHeader = React.createClass({
    editProfile: function(){
        browserHistory.push(routesMap.routes.profile.path);
    },
    componentDidMount: function(){
        CityListActions.fetchList;
    },
    logOut: function(){
        notAuthorized();
    },
    returnHome: function(){
        browserHistory.push(routesMap.routes.main.path);
    },
    render: function(){
        var isCityList, hide = {
            display: 'none'
        }
        if(isMobile) isCityList = hide;
        return(
            <div>
            <div className="top-line">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-xs-4">
                            <div className="logo screen-toggle" onClick={this.returnHome} data-screen="pageMain">
                                <img className="quickly-top-logo" src="/images/logo.png" alt="Quickly Russia" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-xs-3" style={isCityList}>
                            <div id="selectCityField">
                                <CityList />
                            </div>
                        </div>
                        <div className="col-lg-5 col-xs-1">
                        </div>
                        <div className="col-lg-3 col-xs-8">
                            <div className="form-auth form-register pop" id="formRegisterPhone">
                                <div className="row">
                                    <div className="col-lg-9 col-xs-8">
                                        <div className="form-group label-floating is-empty">
                                        <form>
                                            <label htmlFor="inputRegisterPhone" className="control-label">Ваш номер телефона</label>
                                            <input type="text" className="form-control pop bfh-phone" data-format="+7 (ddd) ddd-dddd" id="inputRegisterPhone" />
                                            <span className="help-block">В формате +7 (xxx) xxx-xxxx</span>
                                        </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-xs-3">
                                        <a href="#" id="buttonRegisterPhone" className="btn btn-padding btn-raised">
                                            <i className="icon-arrow-right" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="form-auth form-code pop" id="formRegisterSMSCode">
                                <div className="row">
                                    <div className="col-lg-7 col-xs-6">
                                        <div className="form-group label-floating is-empty">
                                            <label htmlFor="inputRegisterSMSCode" className="control-label pop">Введите код из СМС</label>
                                            <input type="text" className="form-control" id="inputRegisterSMSCode" />
                                            <span className="help-block"></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-xs-4">
                                        <a href="#" id="buttonRegisterSMSCode" className="btn btn-clean btn-padding btn-raised">
                                             <i className="icon-arrow-right" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="auth-box mini-profile" id="userAuthorizedTop">
                                <div className="dropdown-nice">
                                   <div className="user-top" id="userBadgeTop"></div>
                                   <div className="menu-box">
                                        <button className="btn button light" onClick={this.editProfile}>Редактировать профиль</button>
                                        <button className="btn button light" onClick={this.logOut}>Выйти</button>
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
