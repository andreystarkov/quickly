import {getReservationPointsList, getHallsList} from '../reservation.jsx';
import {browserHistory, Link} from 'react-router';
import LoadingOrderAnimation from 'react-loading-order-with-animation';

var CompanyDetailsStore = require('./stores/companyDetailsStore.js');
var CompanyListActions = require('./actions/companyListActions.js');
var CuisinesList = require('./cuisinesList.react.jsx');
var ButtonTabToggle = require('./components/buttonTabToggle.js');
var routesMap = require('./routes/map.js');
var Spinner = require('./ui/spinner.js');

// restaurant_type:
// 1 - только бронь
// 2 - только доставка
// 3 - и то и другое

var PaymentTypes = React.createClass({
    render: function(){
        var type = this.props.type;
        var text;
        var visible = { display: 'block' }
        if (type == 0) {
            text = 'только наличными';
            visible = { display: 'none' }
        }
        if (type == 1) text = 'картой курьеру';
        return(
            <div>
                <div className="cards" style={visible}>
                    <div className="card-icon mastercard"><img src="/images/cards/mastercard.png" /></div>
                    <div className="card-icon visa"><img src="/images/cards/visa.png" /></div>
                </div>
                <div className="payment-text">
                    <span>{text}</span>
                </div>
            </div>
        )
    }
});

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
        var paymentTypes;
        var data = this.state.companyData;

        if (data){
            console.log('companyDetails: ',data);
            var type = data.restaurant_type;
            if ( (type == 1) || (type == 3) ){
               console.log('companyDetails: Reservation Enabled ('+type+')');
                this.isReservation = true;
            } else {
                console.log('CompanyDetails: Reservation Disabled ('+type+')');
                this.isReservation = false;
            }
        } else console.log('CompanyDetails: data is undefined');

        var company = this.state.companyData;
        var cuisinesSelect;
        var cities = getStorage('cityList');

      //  console.log('cities', cities);

        var companyCity = cities.map(function(the,i){
            if( company.restaurant_city_id == the.city_id ) return the.city_name;
        });

        if( (company.restaurant_main_image) ) {
            var image = imageBaseUrl+company.restaurant_main_image;
            console.log('CompanyDetails: Is image exists? ', isImageExists(image));
        }

        if( company.restaurant_cuisines )
            cuisinesSelect = <CuisinesList cuisines={company.restaurant_cuisines} />

        var buttonReservation = (this.isReservation) ?
            <ButtonTabToggle id="btn-reservation" name="Бронирование" tab="tab-reservation" /> :
                <ButtonTabToggle id="btn-reservation" name="Бронирование" tab="tab-reservation" disabled="true" />

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
                    <LoadingOrderAnimation animation="fade-in"
                       distance={30} speed={800} wait={100}>
                       <div className="logo round">
                        <img src={image} />
                        </div>
                     </LoadingOrderAnimation>
                    <LoadingOrderAnimation animation="fade-in"
                       distance={30} speed={800} wait={300}>
                    <div className="title"><h2>{company.restaurant_name}</h2></div>
                     </LoadingOrderAnimation>
                </div>
                <div className="col-lg-10 the-info">
                    <LoadingOrderAnimation animation="fade-in"
                    distance={30} speed={400} wait={600}>
                    <div className="line types">
                        <i className="fi-dishes icon"></i> {cuisinesSelect}
                        <div className="rating">
                            <span>{rating}.0</span>
                        </div>
                    </div>
                    </LoadingOrderAnimation>
                    <LoadingOrderAnimation animation="fade-in"
                       speed={500} wait={850}>
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
                           <PaymentTypes type={company.restaurant_payment_type} />
                        </div>
                        <div className="online-payment">
                            <span>онлайн оплата</span>
                            <span className="pimp"></span>
                        </div>
                        <div className="location map-link button light button-cuisine"  data-lat={company.restaurant_lat} data-long={company.restaurant_long}>
                            <span className="address">{companyCity}, {company.restaurant_address}</span><i className="icn-location" />
                        </div>
                    </div>
                    </LoadingOrderAnimation>
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
                    <button onClick={this.routeBack} className="button light screen-toggle" id="buttonBackToList">
                        <i className="icon icon-arrow-left"></i>
                        <span class="hint--bottom" data-hint="На главную страницу">К категориям</span>
                    </button>
                </div>
            </div>
        </div>
        );
      }
});

module.exports = CompanyDetails;
