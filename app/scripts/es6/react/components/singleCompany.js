/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 20:59:52
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-15 19:21:24
*/

var CuisinesList = require('../cuisinesList.react.jsx');
var MenuItemsActions = require('../actions/menuItemsActions.js');
var CategoriesListActions = require('../actions/categoriesListActions.js');
var CompanyDetailsActions = require('../actions/companyDetailsActions.js');
var ReservationActions = require('../actions/reservationActions.js');

var routesMap = require('../routes/map.js');

import {showScreen} from "../../screens.jsx";
import {browserHistory, Link} from "react-router";

//<span className="desc"><i>наличными</i><i>картой курьеру</i></span>
//<span className="desc">только наличные</span>

var PaymentTypes = React.createClass({
    render: function(){
        console.log('payment: ', this.props.type);
        if (this.props.type == 0) return (
            <div className="payment-type">
                <div className="payment-icons">
                    <span><i className="pay-icon fi-payment-cash"></i></span>
                </div>
                <div className="payment-text">
                     <span>только наличными</span>
                </div>
            </div>
        );
        if (this.props.type == 1) return (
            <div className="payment-type">
                <div className="payment-icons">
                    <span><i className="pay-icon fi-card-detail" /></span>
                    <span><i className="pay-icon fi-payment-cash" /></span>
                </div>
                <div className="payment-text">
                     <span>наличными</span>
                     <span>картой курьеру</span>
                </div>
            </div>
        );
    }
});

var PaymentTypesCards = React.createClass({
    render: function(){
        console.log('payment: ', this.props.type);
        if (this.props.type == 0) return (
            <div className="payment-type">
                <div className="payment-icons">
                    <span><i className="pay-icon fi-payment-cash"></i></span>
                </div>
                <div className="payment-text">
                     <span>только наличными</span>
                </div>
            </div>
        );
        if (this.props.type == 1) return (
            <div className="payment-type">
                <div className="payment-icons">
                    <span><i className="pay-icon fi-card-detail" /></span>
                    <span><i className="pay-icon fi-payment-cash" /></span>
                </div>
                <div className="payment-text">
                     <span>наличными</span>
                     <span>картой курьеру</span>
                </div>
            </div>
        );
    }
});


var RatingStars = React.createClass({
    render: function(){
        var count = this.props.count;
        var stars = '';
        for(var i=0; i<count; i++){
            stars += '<i className="fa yes fa-star"></i>';
        }
        return (
        <div className="rating">
            {stars}
        </div>
        )
    }
});

var SingleCompany = React.createClass({
    toggleCompany: function(el){
        var company = this.props.company.restaurant_id;
        var route = routesMap.routes.shop.cleanPath+company;
        console.log('SingleCompany: route('+company+'): '+route);
        browserHistory.push(route);
    },
    render: function(){
        var total = 0;
        var that = this.props.company;
        var paymentType;

        var imageUrl = imageBaseUrl+that.restaurant_main_image;
        var bgImage = imageBaseUrl+that.restaurant_interior_image;

        var style = { backgroundImage: 'url('+bgImage+')' }

        var cardsPaymentStyle = { display: 'none' }

        var rating = that.restaurant_rating;
        var online;

        if( that.restaurant_online_payment == 1 ){
            online = "онлайн оплата";
        }

        if( that.restaurant_type == 0){
            console.log('Company Type: Delivery Only');
        }

        if( that.restaurant_type == 1){
            console.log('Company Type: Reservation');
        }

        if( that.restaurant_type == 0){
            console.log('Company Type: Delivery Only');
        }

        if( that.restaurant_payment_type == 0 ){
            cardsPaymentStyle = { display: 'inline-block' }
        }

        return(
        <div className="col-lg-6">
        <section style={style} onClick={this.toggleCompany} className="company-item company-toggle" data-company={that.restaurant_id}>
            <div className="the-box row">
                <div className="company-logo col-lg-3 col-xs-4 col-sm-4">
                    <div className="image-thumb">
                        <img src={imageUrl} />
                    </div>
                    <div className="c-payment">
                        <img style={cardsPaymentStyle} src="/images/cards/mastercard.png" alt="..." />
                        <img style={cardsPaymentStyle} src="/images/cards/visa.png" alt="..." />
                        <div className="is-online">
                            {online}
                        </div>
                    </div>
                </div>
                <div className="company-description col-lg-9 col-xs-8 col-sm-8">
                    <h2>
                        {that.restaurant_name}
                        <div className="rating">
                            {rating}
                        </div>
                    </h2>
                    <div className="address">
                        <span>{that.restaurant_address}</span>
                    </div>
                    <div className="text-line cuisines-list">
                        <span className="text-line">
                            <CuisinesList cuisines={that.restaurant_cuisines} />
                        </span>
                    </div>
                    <div className="row btm-line">
                       <div className="col-lg-3 col-xs-3 kal">
                            <div className="box-info">
                                <b className="value">{that.restaurant_min_order} <i className="fa fa-rouble"></i></b>
                                <span className="description">заказ от</span>
                            </div>
                        </div>
                         <div className="col-lg-3 col-xs-3 kal">
                            <div className="box-info">
                                <b className="value">{that.restaurant_delivery_cost} <i className="fa fa-rouble"></i></b>
                                <span className="description">доставка</span>
                            </div>
                        </div>

                        <div className="col-lg-3 col-xs-3 kal">
                            <div className="box-info">
                                <b className="value">{that.restaurant_delivery_time} <i className="icon icon-clock"></i></b>
                                <span className="description">время</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-xs-3 kal">
                            <div className="box-info">
                                <b className="value">{that.restaurant_average_check} <i className="fa fa-rouble"></i></b>
                                <span className="description">средний чек</span>
                            </div>
                        </div>
                    </div>

                    <div className="c-payment mobile">
                        <img style={cardsPaymentStyle} src="/images/cards/mastercard.png" alt="..." />
                        <img style={cardsPaymentStyle} src="/images/cards/visa.png" alt="..." />
                        <div className="is-online">
                            {online}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row btm-line mobile">
               <div className="col-lg-3 col-xs-3 kal">
                    <div className="box-info">
                        <b className="value">{that.restaurant_min_order} <i className="fa fa-rouble"></i></b>
                        <span className="description">заказ от</span>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-3 kal">
                    <div className="box-info">
                        <b className="value">{that.restaurant_delivery_cost} <i className="fa fa-rouble"></i></b>
                        <span className="description">доставка</span>
                    </div>
                </div>

                <div className="col-lg-3 col-xs-3 kal">
                    <div className="box-info">
                        <b className="value">{that.restaurant_delivery_time} <i className="icon icon-clock"></i></b>
                        <span className="description">время</span>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-3 kal">
                    <div className="box-info">
                        <b className="value">{that.restaurant_average_check} <i className="fa fa-rouble"></i></b>
                        <span className="description">средний чек</span>
                    </div>
                </div>
            </div>
            <div className="the-footer">
                <div className="row">
                    <div className="align-left col-xs-6 col-lg-6">
                        <div className="comments-count">
                            <i className="icon fi-comment"></i>
                            <span className="count">{that.restaurant_comments_count}</span>
                        </div>
                    </div>
                    <div className="align-right col-xs-6 col-lg-6">
                        <div className="right-icons">
                            <button className="bt-round delivery">
                                <i className="icon fi-dish"></i>
                            </button>
                            <button className="bt-round reservation">
                                <i className="icon fi-table"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
        );
    }
});

module.exports = SingleCompany;
