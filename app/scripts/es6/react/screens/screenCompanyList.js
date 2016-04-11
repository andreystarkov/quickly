/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 23:23:02
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-11 20:54:11
*/


import {VelocityComponent, VelocityTransitionGroup} from 'velocity-animate';

var CompanyList = require('../companyList.react.jsx');

var ScreenCompanyList = React.createClass({
    getInitialState: function() {
        return {
           active: false
        };
    },
    render: function(){
        return(
            <section className="the-screen page-wrapper food-grid" id="pageCompanyList">
                <CompanyList />
            </section>
        )
    }
});

module.exports = ScreenCompanyList;
