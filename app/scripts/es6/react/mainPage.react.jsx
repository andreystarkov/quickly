var CuisinesStore = require('./stores/cuisinesStore.js');
var QuicklyLogo = require('./components/quicklyLogo.js');
var ButtonBack = require('./components/buttonBack.js');
var CuisinesSelectList = require('./components/cuisinesSelectList.js');
var CityList = require('./cityList.react.jsx');
var CampaignsSlider = require('./components/campaignsSlider.js');

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
            <CampaignsSlider />
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
