/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 23:24:58
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-11 17:30:20
*/

import { RouteTransition } from 'react-router-transition';

var CuisinesSelectList = require('../components/cuisinesSelectList.js');
var MainPageHeader = require('../mainPage.react.jsx');

var ScreenMain = React.createClass({
    render: function(){
    		console.log('ScreenMain: pathname = ', this.props.location.pathname);
        return (
			  <RouteTransition
			    pathname={this.props.location.pathname}
			    atEnter={{ opacity: 0 }}
			    atLeave={{ opacity: 0 }}
			    atActive={{ opacity: 1 }}>
            <section className="the-screen page-wrapper" id="pageMain">
                <MainPageHeader />
                <CuisinesSelectList />
            </section>
         </RouteTransition>
        )
    }
});

module.exports = ScreenMain;
