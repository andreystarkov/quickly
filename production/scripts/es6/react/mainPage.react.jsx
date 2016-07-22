var CuisinesStore = require('./stores/cuisinesStore.js');
var QuicklyLogo = require('./components/quicklyLogo.js');
var ButtonBack = require('./components/buttonBack.js');
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


module.exports = MainPageHeader;

