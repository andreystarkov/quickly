/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 23:24:58
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-05-04 11:09:39
*/

import LoadingOrderAnimation from 'react-loading-order-with-animation';

var CuisinesSelectList = require('../components/cuisinesSelectList.js');
var MainPageHeader = require('../mainPage.react.jsx');

var DownloadApps = React.createClass({
    render: function(){
        return (
            <section className="download-apps">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 ">
                            <h3>Квикли &mdash; Всегда с вами</h3>
                            <p>Специально для вашего удобства мы разработали мобильное приложение, в котором вы, так же как на сайте,
                            в несколько простых действий можете заказать еду на дом или забронировать свободный столик в ресторане.</p>

                            <div className="apps row">
                                <div className="col-md-6 col-lg-6">
                                    <a className="button-app btn" href="#">
                                        <span>Скачать для Android</span>
                                        <i className="iapp-android" />
                                        {/*<img src="/images/svg/google.svg" />*/}
                                    </a>
                                </div>
                                <div className="col-md-6 col-lg-6">
                                    <a className="button-app btn" href="#">
                                       <span>Скачать для iOS</span>
                                       <i className="iapp-apple" />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        )
    }
});

var ScreenMain = React.createClass({
    render: function(){
        return (
            <section className="the-screen page-wrapper" id="pageMain">
                <MainPageHeader />
                <CuisinesSelectList />

                <DownloadApps />
            </section>
        )
    }
});

module.exports = ScreenMain;
