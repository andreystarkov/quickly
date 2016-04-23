/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 23:24:58
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-23 05:01:14
*/
import LoadingOrderAnimation from 'react-loading-order-with-animation';

var CuisinesSelectList = require('../components/cuisinesSelectList.js');
var MainPageHeader = require('../mainPage.react.jsx');

var ScreenMain = React.createClass({
    render: function(){
        return (
            <section className="the-screen page-wrapper" id="pageMain">
                <LoadingOrderAnimation animation="fade-in"
                distance={30} speed={300} wait={0}>
                    <MainPageHeader />
                </LoadingOrderAnimation>
                <CuisinesSelectList />
            </section>

        )
    }
});

module.exports = ScreenMain;
