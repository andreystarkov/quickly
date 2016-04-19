/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 23:23:02
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-15 13:00:02
*/

require('velocity-animate');
require('velocity-animate/velocity.ui');

import { slideLeft } from '../animation/routerTransitions.js';
import { RouteTransition } from 'react-router-transition';

var CompanyList = require('../companyList.react.jsx');
var CompanyListActions = require('../actions/companyListActions.js');

var ScreenCompanyList = React.createClass({
    getInitialState: function() {
        return {
           active: false
        };
    },
    componentWillMount: function(){
        CompanyListActions.selectById(this.props.params.cuisine);
    },
    render: function(){
        console.log('Path: ', this.props.location.pathname);
        return(
            <section className="the-screen page-wrapper food-grid" id="pageCompanyList">
                <CompanyList current={this.props.params.cuisine} />
            </section>
        )
    }
});

module.exports = ScreenCompanyList;
