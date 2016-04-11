/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 22:57:33
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-10 23:06:24
*/

var CompanyDetails = require('../companyDetails.react.jsx');
var MenuItems = require('../menuItems.react.jsx');

var ScreenShop = React.createClass({
    render: function(){
        return (
            <div className="the-screen page-wrapper" id="pageCompany">
                <section className="company-about gray" id="companyDetails">
                    <CompanyDetails />
                </section>
                <section className="the-tab tabs-shop tab-comments" id="tab-comments" data-tabs="tabs-shop">
                    <div className="container">
                        <div className="tab-header">
                            <h2>текущие отзывы</h2>
                        </div>
                        <div className="the-comments">
                            <div className="row">

                                <div className="col-lg-9" id="theComments"></div>

                                <div className="col-lg-3">
                                    <div className="tab-header">
                                        <h2>Ваш комментарий</h2>
                                    </div>
                                    <div className="the-form">
                                        <div className="form-group label-floating is-empty">
                                            <label htmlhtmlFor="comment-name" className="control-label">Ваше имя</label>
                                            <input type="text" className="form-control" id="comment-name" />
                                            <span className="help-block"></span>
                                            <span className="material-input"></span>
                                        </div>
                                        <div className="form-group label-floating is-empty">
                                            <label htmlhtmlFor="comment-text" className="control-label">Текст комментария</label>
                                            <input type="text" className="form-control" id="comment-text" />
                                            <span className="help-block"></span>
                                            <span className="material-input"></span>
                                        </div>
                                        <div className="stars">
                                            <span>Ваша оценка</span>
                                            <select id="choose" className="choose-stars">
                                              <option value="1">1</option>
                                              <option value="2">2</option>
                                              <option value="3">3</option>
                                              <option value="4">4</option>
                                              <option value="5">5</option>
                                            </select>
                                        </div>
                                        <a href="#" className="button main"><i className="icon icn-comment"></i> <span>Отправить комментарий</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="the-tab tabs-shop tab-reservation" id="tab-reservation">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="halls-box" id="hallsBox"></div>
                                <div className="room-box" id="roomBox"></div>
                            </div>
                            <div className="col-lg-3">
                                <h3>Бронирование стола</h3>
                                <div className="form-group">
                                    <label htmlFor="reservationTimePicker" className="control-label">Время бронирования</label>
                                    <input type='text' className="form-control" id='reservationTimePicker' />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="reservationDatePicker" className="control-label">Дата бронирования</label>
                                    <input type='text' className="form-control" id='reservationDatePicker' />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="the-tab tabs-shop food-category food-grid tab-active" id="tab-food">
                    <div className="container" id="menuItems">
                        <MenuItems />
                    </div>
                </section>
            </div>
        )
    }
});

module.exports = ScreenShop;
