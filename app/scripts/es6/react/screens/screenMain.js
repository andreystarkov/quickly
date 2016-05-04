/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 23:24:58
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-05-04 15:24:29
*/

import LoadingOrderAnimation from 'react-loading-order-with-animation';

var CuisinesSelectList = require('../components/cuisinesSelectList.js');
var MainPageHeader = require('../mainPage.react.jsx');

var DownloadApps = React.createClass({
    render: function(){
        return (
            <section className="apps-download">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-lg-8">
                            <h3>Квикли &mdash; Всегда с вами</h3>
                            <p>Специально для вашего удобства мы разработали мобильное приложение, в котором вы, так же как на сайте,
                            в несколько простых действий можете заказать еду на дом или забронировать свободный столик в ресторане.</p>

                            <div className="apps row">
                                <div className="col-md-7 col-lg-6">
                                    <a className="button-app" target="_blank" href="https://play.google.com/store/apps/details?id=ru.quickly.android&hl=ru">
                                        {/*<i className="iapp-android" />*/}
                                        <span>Скачать для Android</span>
                                        <img className="iapp-icon android" src="/images/svg/googleplay.svg" />
                                    </a>
                                </div>
                                <div className="col-md-6 col-lg-6">
                                    <a className="button-app" target="_blank" href="https://itunes.apple.com/us/app/quickly/id1052961254?ls=1&mt=8">
                                       {/*<i className="iapp-apple" />*/}
                                       <span>Скачать для iPhone</span>
                                       <img className="iapp-icon ios" src="/images/svg/apple-ln.svg" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="app-image">
                                <img className="iapp-img" src="/images/elements/app.png" />
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
