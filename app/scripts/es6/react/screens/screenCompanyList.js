/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 23:23:02
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-11 20:54:11
*/

require('velocity-animate');
require('velocity-animate/velocity.ui');

import { slideLeft } from '../animation/routerTransitions.js';
import { RouteTransition } from 'react-router-transition';

var CompanyList = require('../companyList.react.jsx');

var ScreenCompanyList = React.createClass({
    getInitialState: function() {
        return {
           active: false
        };
    },
    render: function(){
        console.log('Path: ', this.props.location.pathname);
        return(
          <RouteTransition
            pathname={this.props.location.pathname}
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}>
            <section className="the-screen page-wrapper food-grid" id="pageCompanyList">
                <CompanyList />
            </section>
          </RouteTransition>
        )
    }
});

module.exports = ScreenCompanyList;
