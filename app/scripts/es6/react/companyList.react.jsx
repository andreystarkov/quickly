var ButtonMore = require('./components/buttonMore.js');
var CuisinesList = require('./cuisinesList.react.jsx');
var CompanyListStore = require('./stores/companyListStore.js');

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
                <div className="col-lg-4">
                    <div className="image-thumb">
                        <img src={imageUrl} />
                    </div>
                </div>
                <div className="col-lg-8">
                    <h2>{that.restaurant_name}</h2>

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
    filterCardCourier: function(e){
        console.log(e.target.value);
        if ( e.target.value == 'on' ){
            CompanyListActions.filterData(3);
        }
    },
    render: function(){
        return(
        <div className="sidebar-wrap">

            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Бесплатная доставка</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Есть акции</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" onChange={this.filterCardCourier} name="somename" /> <span className="filter-name">Оплата картой курьеру</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Онлайн оплата</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Еда за баллы</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Работает сейчас</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Рядом со мной</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Новые</span></label>
            </div>
        </div>
        )
    }
});

var CompanyList = React.createClass({
    mixins: [Reflux.connect(CompanyListStore, 'companyData')],
    limit: 5,
    getInitialState: function() {
      return {
        data: [],
        companyData: []
      };
    },
    componentDidMount: function() {;
     //   OrdersActions.updateData();
    },
    loadMore: function(){
        this.limit += 5;
        CompanyStore.updateData();
    },
    render: function() {
        var theData = this.state.companyData;
       console.log('ReactCompanyList: ', this.state.companyData);
        var totalList = this.state.companyData.map(function(the, i) {
            console.log('ReactCompanyList: = ',the);
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
