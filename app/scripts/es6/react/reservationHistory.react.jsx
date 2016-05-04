var ButtonMore = require('./components/buttonMore.js');
var ReservationHistoryStore = require('./stores/reservationHistoryStore.js');

var SingleReservation = React.createClass({
    render: function(){
        var total = 0;
        var data = this.props.list;

        return(
        <div className="history-item row">
             <div className="date-time">{moment.unix(data.reservation_date).format("DD MMMM YYYY HH:mm")}</div>
            <div className="col-lg-2">
                <div className="box-company medium">
                    <div className="thumb-round">
                        <img src={imageBaseUrl+data.restaurant_main_image} alt="..." />
                    </div>
                    <span className="title">{data.restaurant_name}</span>
                </div>
            </div>
            <div className="col-lg-5">
                <div className="history-items">
                    <div className="item item-table">
                        <div className="row">
                            <div className="col-lg-3 no-padding-right align-right">
                                <div className="icon-reservation">
                                    <i className="icon-anchor"></i>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="text">
                                    <div className="table-num">Столик №<b>{data.table_number}</b></div>
                                    <div className="hall">Зал: <span className="hall-name">{data.hall_name}</span></div>
                                    <div className="reservation-date">{moment.unix(data.reservation_date).format("DD MMMM YYYY HH:mm")}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-2 summary">
                <div className="total">
                    <span className="total-title">итого:</span>
                    <b className="sum-total">{total} <i className="rouble">o</i></b>
                </div>

                <div className="bonus">
                    <span className="total-title"><i className="r fa fa-rub"></i>-бонусов</span>
                    <b className="sum-bonus">+ {data.bonus}</b>
                </div>
            </div>
            <div className="col-lg-3 actions">
                <span className="title">поделится:</span>
                <div className="social-share">
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-vk"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-odnoklassniki"></i></a>
                </div>
                <a href="#" className="button light round button-history-repeat" id="button-history-repeat">
                    <span>Повторить заказ</span>
                </a>

            </div>
        </div>
        );
    }
})

var ReservationHistory = React.createClass({
    mixins: [Reflux.connect(ReservationHistoryStore, 'historyData')],
    limit: 15,
    getInitialState: function() {
      return {
        data: [],
        historyData: []
      };
    },
    render: function() {
     //   OrdersHistoryActions.updateData();
        var theData = this.state.historyData;
        var total = 0;
        var sorted = _.first(_.sortBy(theData, 'order_id').reverse(), this.limit);
        var messages = sorted.map(function(the, i) {
            return <SingleReservation list={the} key={i} />
        });
        return (
            <div>{messages}</div>
        )
    }
});

module.exports = ReservationHistory;
