
/*
var ordersHistory = React.createClass({
    getInitialState: function() {
        console.log('bdsbsd');
      return {
        data: []
      };
    },

  componentDidMount: function() {
      console.log('Aaaaasadsadsa');
      this.serverRequest = $.getJSON(serverUrl+'/api/v2/history/reservations/'+userToken, function (data) {
      console.log('Aaaaa', data);
    }.bind(this));
  },

  render: function() {
    return (
        <div className="history-item row">
            <div className="col-lg-2">
                <div className="box-company medium">
                    <div className="thumb-round">
                        <img src="images/logos/delmaro.png" alt="..." />
                    </div>
                    <span className="title">Зеленая горчица</span>
                </div>
            </div>
            <div className="col-lg-5">
                    <div className="history-items">

                    </div>
                </div>

                <div className="col-lg-2 summary">
                    <div className="total">
                        <span>итого:</span>
                        <b>4500 <i className="rouble">o</i></b>
                    </div>

                    <div className="bonus">
                        <span><i className="fa fa-rub"></i>-бонусов</span>
                        <b>+ 400</b>
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
});


var HistoryCartItem = React.createClass({
    getInitialState: function() {
      return {
        items: []
      };
    },
    componentDidMount: function() {
          this.serverRequest = $.getJSON(serverUrl+'/api/v2/history/orders/'+userToken, function (data) {
          this.setState({
            items:data.result.orders
          });
        }.bind(this));
    },
    render: function() {
        var s = this.state.items;
        console.log('SSS', s);
        return(
            {
            s.map(function(theItem){
                console.log('REACT: map = ', theItem);
                var theImage = imageBaseUrl+theItem.restaurant_main_image;

                return (
                <div className="history-item row">
                    <div className="col-lg-2">
                        <div className="box-company medium">
                            <div className="thumb-round">
                                <img src="{theImage}" alt="..." />
                            </div>
                            <span className="title">{theItem.restaurant_name}</span>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="history-items">
                        {
                            var v = theItem.order_menu_items;
                            v.map(function(single){
                                return(
                                    <div className="item">
                                        <div className="row">
                                            <div className="col-lg-3 no-padding-right align-right">
                                                <div className="thumb-tiny">
                                                    <img src="images/samples/logo.jpg" />
                                                </div>
                                            </div>
                                            <div className="col-lg-9">
                                                <div className="text">
                                                    <b>{single.menu_item_name}</b>
                                                    <span className="price">{single.menu_item_price} <i className="rouble">o</i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            });
                        }
                        </div>
                    </div>
                    <div className="col-lg-2 summary">
                        <div className="total">
                            <span>итого:</span>
                            <b>4500 <i className="rouble">o</i></b>
                        </div>
                        <div className="bonus">
                            <span><i className="fa fa-rub"></i>-бонусов</span>
                            <b>+ {theItem.bonus}</b>
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
            });
        }
        );
    }
});
*/
// ReactDOM.render(<HistoryCartItem name="World" price="10" />, document.getElementById('test'));
