/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 22:57:33
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-21 13:17:14
*/

import {browserHistory, Link} from "react-router";
import { RouteTransition } from 'react-router-transition';

var CompanyDetails = require('../companyDetails.react.jsx');
var MenuItems = require('../menuItems.react.jsx');
var Reservation = require('../components/reservation.js');
var CuisinesList = require('../cuisinesList.react.jsx');
var MenuItemsActions = require('../actions/menuItemsActions.js');
var CategoriesListActions = require('../actions/categoriesListActions.js');
var CompanyDetailsActions = require('../actions/companyDetailsActions.js');
var ReservationActions = require('../actions/reservationActions.js');
var Comments = require('../components/comments.js');

var routesMap = require('../routes/map.js');

function updateCompany(id){
    ReservationActions.updateHalls(id);
    CompanyDetailsActions.updateData(id);
    MenuItemsActions.updateDataById(id);
    CategoriesListActions.updateData(id);
    currentCompany = id;
}

var ScreenShop = React.createClass({
    componentWillMount: function(){
        var company = this.props.params.company;
        console.log('ScreenShop: props', this.props);
        updateCompany(company);
    },
    componentDidMount: function(){
         $.material.init();
    },
    render: function(){

        return (
            <RouteTransition
              pathname={this.props.location.pathname}
              atEnter={{ opacity:0 }}
              atLeave={{ opacity:0 }}
              atActive={{ opacity:1 }}>
            <div className="the-screen page-wrapper" id="pageCompany">
                <section className="company-about gray" id="companyDetails">
                    <CompanyDetails />
                </section>
                <section className="the-tab tabs-shop tab-comments" id="tab-comments" data-tabs="tabs-shop">
                    <Comments company={this.props.params.company} />
                </section>

                <section className="the-tab tabs-shop tab-reservation" id="tab-reservation">
                    <Reservation />
                </section>

                <section className="the-tab tabs-shop food-category food-grid tab-active" id="tab-food">
                    <div className="container" id="menuItems">
                        <MenuItems />
                    </div>
                </section>
            </div>
        </RouteTransition>
        )
    }
});

module.exports = ScreenShop;
