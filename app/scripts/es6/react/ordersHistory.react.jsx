var SingleOrderItem = React.createClass({
    render: function(){
        var single = this.props.item;
        return (
        <div className="item" key={this.props.key}>
            <div className="row">
                <div className="col-lg-3 no-padding-right align-right">
                    <div className="thumb-tiny">
                        <img src="images/samples/logo.jpg" />
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="text">
                        <b>{single.menu_item_name} <span className="count">{single.count} шт.</span></b>
                        <span className="price">{single.menu_item_price} <i className="rouble">o</i></span>
                    </div>
                </div>
            </div>
        </div>
        );
    }
});

var SingleOrder = React.createClass({
    render: function(){
        var total = 0;
        var data = this.props.list;
        console.log('DATA signle: ', data);

        var items = data.order_menu_items.map(function(the, i) {
            total += the.menu_item_price
            console.log('key = '+i);
            return(
                <SingleOrderItem item={the} key={i} />
            )
        });

        return(
        <div className="history-item row" key={this.props.key}>
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
                    <span>итого:</span>
                    <b className="sum-total">{total} <i className="rouble">o</i></b>
                </div>

                <div className="bonus">
                    <span><i className="fa fa-rub"></i>-бонусов</span>
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

var OrdersHistory = React.createClass({
    getInitialState: function() {
      return {
        data: []
      };
    },
    componentDidMount: function() {
      console.log('REACT: ordersHistory: componentDidMount');
      this.serverRequest = $.getJSON(serverUrl+'/api/v2/history/orders/'+userToken, function (data) {
        console.log('REACT: ordersHistory: componentDidMount: getJSON', data);
        this.setState({data: data.result.orders});
      }.bind(this));
    },

    render: function() {
        var data = this.state.data;
        var total = 0;
        var messages = this.state.data.map(function(the, i) {
            return <SingleOrder list={the} key={i} />
        });
        return (
            <div>{messages}</div>
        )
    }
});

ReactDOM.render(<OrdersHistory />, document.getElementById('ordersHistory'));
