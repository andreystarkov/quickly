/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 23:24:58
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-11 17:30:20
*/
require('velocity-animate');
require('velocity-animate/velocity.ui');

var CuisinesSelectList = require('../components/cuisinesSelectList.js');
var MainPageHeader = require('../mainPage.react.jsx');

var ScreenMain = React.createClass({
    render: function(){
        return (

            <section className="the-screen page-wrapper" id="pageMain">
                <MainPageHeader />
                <CuisinesSelectList />
            </section>

        )
    }
});

module.exports = ScreenMain;
