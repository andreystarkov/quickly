import LoadingOrderAnimation from 'react-loading-order-with-animation';
import {addToCart, repeatOrder} from '../engine/addToCart.js';

var ButtonMore = require('./components/buttonMore.js');
var routesMap = require('./routes/map.js');
var OrdersHistoryStore = require('./stores/ordersHistoryStore.js');
var HistoryActions = require('./actions/historyActions.js');
var OrdersHistoryActions = require('./actions/ordersHistoryActions.js');

var SingleOrderItem = React.createClass({
    render: function(){
        var single = this.props.item, thumb = 'http://fakeimg.pl/37x37/ddd/';
        if( single.menu_item_image !== '' ) thumb = imageBaseUrl+single.menu_item_image;
        var idAttr = "singleItem-"+single.menu_item_id;
        return (
        <div className="item" id={idAttr} >
            <div className="row">
                <div className="col-lg-3 no-padding-right align-right">
                    <div className="thumb-tiny">
                        <img src={thumb} />
                    </div>
                </div>
                <div className="col-lg-9 no-padding-left">
                    <div className="text">
                        <b>{single.menu_item_name}</b>
                        <span className="price">{single.menu_item_price*single.count} <i className="rouble">o</i>,  <span className="count">{single.count} шт.</span></span>
                    </div>
                </div>
            </div>
        </div>
        );
    }
});

var SingleOrder = React.createClass({
    repeatThis: function(){
        repeatOrder(this.props.list.order_menu_items);
    },
    render: function(){
        var total = 0;
        var data = this.props.list;
        console.log('DATA signle: ', data);

        var items = data.order_menu_items.map(function(the, i) {
            total += (the.menu_item_price*the.count);
            return (
                <SingleOrderItem item={the} key={i} />
            )
        });

        return(
        <div className="history-item row" key={this.props.key}>
            <div className="date-time">{moment.unix(data.created_at).format("DD MMMM YYYY HH:mm")}</div>
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
                    {items}
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
                <button onClick={this.repeatThis} className="button light round button-history-repeat" id="button-history-repeat">
                    <i className="icon-refresh"></i><span>Повторить заказ</span>
                </button>

            </div>
        </div>
        );
    }
})

var OrdersHistory = React.createClass({
    mixins: [Reflux.connect(OrdersHistoryStore, 'historyData')],
    limit: 15,
    getInitialState: function() {
      return {
        data: [],
        historyData: []
      };
    },
    componentDidMount: function() {
        OrdersHistoryActions.updateData();
    },
    render: function() {
     //   OrdersHistoryActions.updateData();
        var theData = this.state.historyData;
        var total = 0;
        var sorted = _.first(_.sortBy(theData, 'order_id').reverse(), this.limit);
        var messages = sorted.map(function(the, i) {
            return (
            <LoadingOrderAnimation animation="fade-in" move="from-bottom-to-top"
            distance={50} speed={400} wait={250*i}>
                <SingleOrder list={the} key={i} />
            </LoadingOrderAnimation>
            )
        });
        return (
            <div>{messages}</div>
        )
    }
});

module.exports = OrdersHistory;
// ReactDOM.render(<OrdersHistory />, document.getElementById('ordersHistory'));
