var CompanyDetailsStore = require('./stores/companyDetailsStore.js');
var CompanyListActions = require('./actions/companyListActions.js');
var CuisinesList = require('./cuisinesList.react.jsx');
var ButtonTabToggle = require('./components/buttonTabToggle.js');

import {getReservationPointsList, getHallsList} from '../reservation.jsx';
import {browserHistory, Link} from 'react-router';

var routesMap = require('./routes/map.js');

// restaurant_type:
// 1 - только бронь
// 2 - только доставка
// 3 - и то и другое

var CompanyDetails = React.createClass({
    mixins: [Reflux.connect(CompanyDetailsStore, 'companyData')],
    limit: 12,
    isReservation: false,
    getInitialState: function() {
      return {
        data: [],
        companyData: []
      };
    },
    componentDidUpdate: function() {

    },
    routeBack: function(){
        browserHistory.push(routesMap.routes.main.path);
    },
    render: function() {
        var data = this.state.companyData;
        if (data){
            var type = data.restaurant_type;
            if ( (type == 1) || (type == 3) ){
                console.log('companyDetails: Reservation Enabled ('+type+')');
                this.isReservation = true;
                getHallsList(data.restaurant_id, function(data){
                    console.log('getHallsList: callback, data = ',data);
                });
            } else {
                console.log('CompanyDetails: Reservation Disabled ('+type+')');
                this.isReservation = false;
            }
        } else console.log('CompanyDetails: data is undefined');

        var company = this.state.companyData;
        var cuisinesSelect;

        if( (company.restaurant_main_image) ) {
            var image = imageBaseUrl+company.restaurant_main_image;
            console.log('CompanyDetails: Is image exists? ', isImageExists(image));
        }

        if( company.restaurant_cuisines )
            cuisinesSelect = <CuisinesList cuisines={company.restaurant_cuisines} />

        var buttonReservation = (this.isReservation) ?
            <ButtonTabToggle name="Бронирование" tab="tab-reservation" /> :
                <ButtonTabToggle name="Бронирование" tab="tab-reservation" disabled="true" />

        if( company.restaurant_comments_count ) {
            console.log('CompanyDetails: Has comments ('+company.comments_count+')');
        } else {
            console.log('CompanyDetails: No comments ('+company.comments_count+')');
        }

        var rating = company.restaurant_rating;
        return (
        <div className="container">
            <div className="row">
                <div className="col-lg-2 col-xs-12 text-center">
                    <div className="logo round">
                        <img src={image} />
                    </div>
                    <div className="title"><h2>{company.restaurant_name}</h2>

                </div>
                </div>
                <div className="col-lg-10 the-info">
                    <div className="line types">
                        <i className="fi-dishes icon"></i> {cuisinesSelect}
                        <div className="rating">
                            <span>{rating}.0</span>
                        </div>
                    </div>
                    <div className="line delivery">
                        <i className="icon fi-delivery"></i>
                        <div className="box cost">
                            <span className="detail-title">доставка</span>
                            <b>{company.restaurant_delivery_cost} <i className="rouble">o</i></b>
                        </div>
                        <div className="box time">
                            <span className="detail-title">время</span>
                            <b>{company.restaurant_delivery_time} мин.</b>
                        </div>
                        <div className="box min">
                            <span className="detail-title">минимум</span>
                            <b>{company.restaurant_min_order} <i className="rouble">o</i></b>
                        </div>
                        <div className="box min">
                            <span className="detail-title">средний чек</span>
                            <b>{company.restaurant_average_check} <i className="rouble">o</i></b>
                        </div>
                        <div className="box pay">
                            <div className="cards">
                                <div className="card-icon mastercard"><img src="images/cards/mastercard.png" /></div>
                                <div className="card-icon visa"><img src="images/cards/visa.png" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row buttons-line">
                <div className="col-lg-2">
                </div>
                <div className="col-lg-6 buttons-tabs" data-tabs="tabs-shop">
                    <ButtonTabToggle name="Отзывы" tab="tab-comments" />
                    <ButtonTabToggle name="Доставка" active="true" tab="tab-food" />
                    {buttonReservation}
                </div>
                <div className="col-lg-4 buttons-reserv">
                    <a className="button light" href="#">
                        <i className="icon icon-eye"></i>
                        <span>3D тур</span>
                    </a>
                    <button onClick={this.routeBack} className="button main screen-toggle" id="buttonBackToList">
                        <i className="icon icon-list"></i>
                        <span>К списку кухонь</span>
                    </button>
                </div>
            </div>
        </div>
        );
      }
});

module.exports = CompanyDetails;
