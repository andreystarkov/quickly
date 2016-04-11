/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 22:12:41
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-10 22:34:08
*/

var InlineSvg = require('react-inlinesvg');

var PageHeader = React.createClass({
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
                            <div id="selectCityField"></div>
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
                                        <a href="#" id="buttonSMSCodeRefresh" className="btn btn-clean" ><i className="icon-refresh"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="auth-box mini-profile" id="userAuthorizedTop">
                                <div className="dropdown-nice">
                                   <div className="user-top" id="userBadgeTop"></div>
                                   <div className="menu-box">
                                        <a href="#" className="buttonEditProfile" id="buttonEditProfile">Редактировать профиль</a>
                                        <a href="#">История заказов</a>
                                        <a href="#" className="control-logout" id="buttonLogOutTop">Выйти</a>
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
