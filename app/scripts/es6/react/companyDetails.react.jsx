var CompanyDetailsStore = require('./stores/companyDetailsStore.js');

var CompanyDetails = React.createClass({
    mixins: [Reflux.connect(CompanyDetailsStore, 'companyData')],
    limit: 12,
    getInitialState: function() {
      return {
        data: [],
        companyData: []
      };
    },

    componentDidMount: function() {

    },

  render: function() {
    var company = this.state.companyData;
    if(company.restaurant_main_image) var image = imageBaseUrl+company.restaurant_main_image;

    return (
    <div className="container">
        <div className="row">
            <div className="col-lg-2 text-center">
                <div className="logo round">
                    <img src={image} />
                </div>
                <div className="title"><h2>{company.restaurant_name}</h2><span>{company.restaurant_info}</span></div>
            </div>
            <div className="col-lg-10 the-info">
                <div className="line types">
                    <i className="icon icn-restaurant"></i>
                    <a className="food" href="#">Европейская</a>
                    <a className="food" href="#">Японская</a>
                    <a className="food" href="#">Китайская</a>
                </div>
                <div className="line delivery">
                    <i className="icon icn-cab"></i>
                    <div className="box cost">
                        <span className="detail-title">стоимость</span>
                        <b>{company.restaurant_delivery_cost}</b>
                    </div>
                    <div className="box time">
                        <span className="detail-title">среднее время</span>
                        <b>{company.restaurant_delivery_time} минут</b>
                    </div>
                    <div className="box min">
                        <span className="detail-title">мин. сумма</span>
                        <b>{company.restaurant_min_order} <i className="rouble">e</i></b>
                    </div>
                    <div className="box min">
                        <span className="detail-title">средний чек</span>
                        <b>{company.restaurant_average_check} <i className="rouble">e</i></b>
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
                    <a className="button tab-toggle light" data-tab="tab-comments" href="#tab-comments">
                        <span>Отзывы</span>
                    </a>
                    <a className="button tab-toggle light active" data-tab="tab-food" href="#tab-food">
                        <span>Доставка</span>
                    </a>
                    <a className="button tab-toggle light" data-tab="tab-reservation" href="#tab-reservation">
                        <span>Бронирование</span>
                    </a>
                </div>
                <div className="col-lg-4 buttons-reserv">
                    <a className="button light" href="#">
                        <i className="icon icon-eye"></i>
                        <span>3D тур</span>
                    </a>
                    <button className="button main screen-toggle" data-screen="screen-company-list" id="buttonRestaurantList">
                        <i className="icon icon-list"></i>
                        <span>К списку ресторанов</span>
                    </button>
                </div>
            </div>
        </div>
    );
  }
});

ReactDOM.render(
  <CompanyDetails companyId="1"/>,
  document.getElementById('companyDetails')
);
