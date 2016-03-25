var ButtonMore = require('./components/buttonMore.js');

var CompanyActions = Reflux.createActions([
    'fetchList', 'updateData'
]);

var CompanyStore = Reflux.createStore({
    listenables: [CompanyActions],
    companyList: [],
    sourceUrl: serverUrl+'/api/v2/restaurants/get?restaurantType=3',
    init: function() {
        this.fetchList();
    },
    updateData: function(){
        console.log('CompanyStore updateData()');
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
      $.getJSON(this.sourceUrl, function (data) {
        some.companyList = data.result.restaurants;
        some.trigger(some.companyList);
        console.log('REFLUX: CompanyStore fetchList', some.companyList);
      });
    }
});

module.exports = CompanyStore;

var SingleCompany = React.createClass({
    render: function(){
        var total = 0;
        var that = this.props.company;
        var imageUrl = imageBaseUrl+that.restaurant_main_image;
        console.log('SingleCompany: data = ', that);
        return(
        <section className="as-u-wish company-toggle" data-company={that.restaurant_id}>
            <div className="row">
                <div className="col-lg-4">
                    <div className="image-thumb">
                        <img src={imageUrl} />
                    </div>
                </div>
                <div className="col-lg-8">
                    <h2>{that.restaurant_name} <a href="#" className="like-me"><i className="fa fa-heart"></i></a></h2>
                    <span className="text-line">
                        <i>Расстояние:</i> <span>4,4 км</span>
                    </span>
                        <span className="text-line">
                        <i>Кухня:</i> <span>Итальянская / Европейская, Японская / Китайская</span>
                    </span>
                   <div className="row bt-line">
                        <div className="col-lg-8">
                            <div className="payment-ccards">
                                <img src="images/samples/cc.png" />
                            </div>
                        </div>
                        <div className="col-lg-4 likes">
                            <a href="#" className="like">
                                <i className="fa fa-thumbs-up"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row btm-line">
               <div className="col-lg-3 kal">
                    <div className="box-info">
                        <b>{that.restaurant_min_order} Р</b>
                        <span>мин.сумма заказа</span>
                    </div>
                </div>
                <div className="col-lg-3 kal">
                    <div className="box-info">
                        <b>{that.restaurant_delivery_cost}</b>
                        <span>стоимость доставки</span>
                    </div>
                </div>

                <div className="col-lg-3 kal">
                    <div className="box-info">
                        <b>{that.restaurant_delivery_time} минут</b>
                        <span>среднее время доставки</span>
                    </div>
                </div>
                <div className="col-lg-3 kal">
                    <div className="box-info">
                        <b>{that.restaurant_average_check} Р</b>
                        <span>средний чек</span>
                    </div>
                </div>
            </div>
        </section>
        );
    }
});

var CompanyListSidebar = React.createClass({
    render: function(){
        return(
        <div className="sidebar-wrap">
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Бесплатная доставка</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" checked name="somename" /> <span className="filter-name">Есть акции</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" checked name="somename" /> <span className="filter-name">Оплата картой курьеру</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Онлайн оплата</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" checked name="somename" /> <span className="filter-name">Еда за баллы</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Работает сейчас</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" checked name="somename" /> <span className="filter-name">Рядом со мной</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Новые</span></label>
            </div>
        </div>
        )
    }
});

var CompanyList = React.createClass({
    mixins: [Reflux.connect(CompanyStore, 'companyData')],
    limit: 5,
    getInitialState: function() {
      return {
        data: [],
        companyData: []
      };
    },
    componentDidMount: function() {
     //   OrdersActions.updateData();
    },
    loadMore: function(){
        this.limit += 5;
        CompanyActions.updateData();
    },
    render: function() {
     //   OrdersActions.updateData();
        var theData = this.state.companyData;
    //    var total = 0;
     //   var sorted = _.first(_.sortBy(theData, 'order_id').reverse(), this.limit);
        var totalList = theData.map(function(the, i) {
            return <SingleCompany company={the} key={i} />
        });
        return (
            <div>{totalList}
                <div className="full-width align-center">
                    <ButtonMore onClick={this.loadMore} />
                </div>
            </div>
        )
    }
});

ReactDOM.render(<CompanyListSidebar />, document.getElementById('companyListSidebar'));
ReactDOM.render(<CompanyList />, document.getElementById('companyList'));
