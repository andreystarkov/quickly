var CuisinesStore = require('./stores/cuisinesStore.js');
var QuicklyLogo = require('./components/quicklyLogo.js');
var ButtonBack = require('./components/buttonBack.js');
var CuisinesSelectList = require('./components/cuisinesSelectList.js');

import {showScreen} from '../screens.jsx';

var ButtonBackTop = React.createClass({
    render: function(){
        <ButtonBack />
    }
});

var MainPageHeader = React.createClass({
    render: function(){
        return (
        <section className="main-header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row main-logo">
                            <div className="col-lg-5">
                                <div className="quickly-logo">
                                    <QuicklyLogo />
                                </div>
                            </div>
                            <div className="col-lg-6 text">
                                <h1>Квикли</h1>
                                <p>Быстрая доставка еды на дом и бронь стола в любимом заведении.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">

                    </div>
                    <div className="col-lg-3">

                    </div>
                </div>
            </div>
        </section>
        )
    }
});

var ButtonBack = React.createClass({
    render: function(){
        return(
            <div className="button-back">
                <i className="icon-arrow-left"></i>
            </div>
        )
    }
});

ReactDOM.render(<MainPageHeader />, document.getElementById('mainPageHeader'));
ReactDOM.render(<CuisinesSelectList />, document.getElementById('cuisinesSelectList'));
