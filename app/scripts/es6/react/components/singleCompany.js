/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 20:59:52
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-03-30 02:26:15
*/
var CuisinesList = require('../cuisinesList.react.jsx');

var PaymentTypes = React.createClass({
    render: function(){
        console.log('payment: ', this.props.type);
        if (this.props.type == 0) return (
            <div className="payment-type">
            <span><i className="pay-icon fa fa-money"></i></span>
            <span className="desc">только наличные</span>
            </div>
        );
        if (this.props.type == 1) return (
            <div className="payment-type">
            <span><i className="pay-icon fa fa-cc-visa" /></span>
            <span className="desc"><i>наличными</i><i>картой курьеру</i></span>
            </div>
        );
    }
});

var SingleCompany = React.createClass({
    render: function(){
        var total = 0;
        var that = this.props.company;
        var paymentType;

        var imageUrl = imageBaseUrl+that.restaurant_main_image;
        console.log('SingleCompany: ', this.props.company);
        return(
        <section className="company-item company-toggle" data-company={that.restaurant_id}>
            <div className="row">
                <div className="col-lg-4 col-xs-12 col-sm-12">
                    <div className="image-thumb">
                        <img src={imageUrl} />
                    </div>
                </div>
                <div className="col-lg-8 col-xs-12 col-sm-12">
                    <h2>{that.restaurant_name} <i className="icon-go icon-arrow-right"></i></h2>

                    <div className="text-line cuisines-list">
                        <span className="text-line">
                            <CuisinesList cuisines={that.restaurant_cuisines} />
                        </span>
                    </div>
                   <div className="row bt-line">
                        <div className="col-lg-8">
                            <div className="payment-ccards">
                                <PaymentTypes type={that.restaurant_payment_type} />
                            </div>
                        </div>
                        <div className="col-lg-4 likes">

                        </div>
                    </div>
                </div>
            </div>
            <div className="row btm-line">
               <div className="col-lg-3 col-xs-3 kal">
                    <div className="box-info">
                        <b className="value">{that.restaurant_min_order} <i className="fa fa-rouble"></i></b>
                        <span className="description">мин.сумма</span>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-3 kal">
                    <div className="box-info">
                        <b className="value">{that.restaurant_delivery_cost} <i className="fa fa-rouble"></i></b>
                        <span className="description">за доставку</span>
                    </div>
                </div>

                <div className="col-lg-3 col-xs-3 kal">
                    <div className="box-info">
                        <b className="value">{that.restaurant_delivery_time} <i className="icon icon-clock"></i></b>
                        <span className="description">среднее время</span>
                    </div>
                </div>
                <div className="col-lg-3 col-xs-3 kal">
                    <div className="box-info">
                        <b className="value">{that.restaurant_average_check}<i className="fa fa-rouble"></i></b>
                        <span className="description">средний чек</span>
                    </div>
                </div>
            </div>
        </section>
        );
    }
});

module.exports = SingleCompany;