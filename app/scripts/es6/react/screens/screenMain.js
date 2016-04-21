/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 23:24:58
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-21 18:27:50
*/
import LoadingOrderAnimation from 'react-loading-order-with-animation';

var CuisinesSelectList = require('../components/cuisinesSelectList.js');
var MainPageHeader = require('../mainPage.react.jsx');

var ScreenMain = React.createClass({
    render: function(){
        return (

            <section className="the-screen page-wrapper" id="pageMain">
                <LoadingOrderAnimation animation="fade-in" move="from-bottom-to-top"
                distance={30} speed={600} wait={350}>
                    <MainPageHeader />
                </LoadingOrderAnimation>
                <CuisinesSelectList />
            </section>

        )
    }
});

module.exports = ScreenMain;
