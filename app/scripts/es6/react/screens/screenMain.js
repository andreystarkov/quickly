/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 23:24:58
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-15 00:49:50
*/

import { RouteTransition } from 'react-router-transition';

var CuisinesSelectList = require('../components/cuisinesSelectList.js');
var MainPageHeader = require('../mainPage.react.jsx');

var ScreenMain = React.createClass({
    render: function(){
    		console.log('ScreenMain: pathname = ', this.props.location.pathname);
        return (
            <section className="the-screen page-wrapper" id="pageMain">
                <MainPageHeader />
                <CuisinesSelectList />
            </section>
        )
    }
});

module.exports = ScreenMain;
