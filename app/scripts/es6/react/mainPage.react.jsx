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

var MainSlider = React.createClass({
    render: function(){
        return (

            <section className="hero">
            <ul className="quickly-slider autoplay">
                <li className="selected">
                    <div className="half-width">
                        <h2>Сытые выходные с Квикли</h2>
                        <p>Вторая мировая с ее сверхжестким регулированием массовыми разрушениями нанесла группировке серьезный удар. </p>
                        <a href="#0" className="button main">Подробнее об акции</a>
                    </div>

                    <div className="half-width img-container">
                        <img src="images/samples/app-1.png" alt="..." />
                    </div>
                </li>
                <li>
                    <div className="half-width img-container">
                        <img src="images/samples/pizza.png" alt="..." />
                    </div>
                    <div className="half-width">
                        <h2>Супер-пицца в подарок</h2>
                        <p>После смерти Таоки для клана Кенити Ямамото отбывал срок в тюрьме, где скоропостижно скончался полгода спустя</p>
                        <a href="#0" className="button">Что-то там</a>
                        <a href="#0" className="button main">Подробнее</a>
                    </div>
                </li>
                <li className="bg-video">
                    <div className="full-width">
                        <h2>Ещё что-то интересное</h2>
                        <p>Следующий, пятый оябун не просто восстановил влияние группировки, но и привел ее к невиданному процветанию. </p>
                        <a href="#0" className="button main">Узнать больше</a>
                    </div>

                    <div className="bg-video-wrapper" data-video="assets/video/video">

                    </div>
                </li>

                <li>
                    <div className="full-width">
                        <h2>Вваываывавы</h2>
                        <p>Не просто восстановил влияние группировки смерти Таоки для клана Кенити Ямамото отбывал срок в тюрьме, где скоропостижно </p>
                        <a href="#0" className="button">Узнать больше</a>
                        <a href="#0" className="button main">Или ещё что-то</a>
                    </div>
                </li>
            </ul>

            <div className="slider-nav">
                <nav>
                    <span className="marker item-1"></span>
                    <ul>
                        <li className="selected">
                            <a href="#0"><i className="icon fi-dish"></i></a>
                        </li>
                        <li>
                            <a href="#0"><i className="icon fi-table"></i></a>
                        </li>
                        <li><a href="#0"><i className="icon fi-dish"></i></a></li>
                        <li><a href="#0"><i className="icon fi-table"></i></a></li>
                    </ul>
                </nav>
            </div>
        </section>

        )
    }
});

var MainPageHeader = React.createClass({
    render: function(){
        return (
        <section className="main-header">
            <MainSlider />
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
