var ButtonMore = require('./components/buttonMore.js');

var ReservationHistoryActions = Reflux.createActions([
    'fetchList', 'updateData'
]);

var ReservationHistoryStore = Reflux.createStore({
    listenables: [ReservationHistoryActions],
    historyList: [],
    sourceUrl: serverUrl+'/api/v3/history/reservations/'+userToken,
    init: function() {
        this.fetchList();
    },
    updateData: function(){
        console.log('ReservationHistoryStore updateData()');
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
      $.getJSON(this.sourceUrl, function (data) {
        some.historyList = data.result.reservations;
        some.trigger(some.historyList);
        console.log('REFLUX: ReservationHistoryStore fetchList', some.historyList);
      });
    }
});

module.exports = ReservationHistoryStore;


var SingleReservation = React.createClass({
    render: function(){
        var total = 0;
        var data = this.props.list;
        // console.log('SingleReservation: data = ', data);

        return(
        <div className="history-item row" key={this.props.key}>
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

var OrdersReservation = React.createClass({
    mixins: [Reflux.connect(ReservationHistoryStore, 'historyData')],
    limit: 5,
    getInitialState: function() {
      return {
        data: [],
        historyData: []
      };
    },
    componentDidMount: function() {
     //   OrdersHistoryActions.updateData();
    },
    loadMore: function(){
        this.limit += 5;
        ReservationHistoryActions.updateData();
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
            <div>{messages}
                <div className="full-width align-center">
                    <ButtonMore onClick={this.loadMore} />
                </div>
            </div>
        )
    }
});

ReactDOM.render(<OrdersReservation />, document.getElementById('reservationHistory'));
