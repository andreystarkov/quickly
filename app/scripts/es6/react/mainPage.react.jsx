var CuisinesStore = require('./stores/cuisinesStore.js');
var CompanyListStore = require('./stores/companyListStore.js');
var CompanyListActions = require('./actions/companyListActions.js');
var QuicklyLogo = require('./components/quicklyLogo.js');
var ButtonBack = require('./components/buttonBack.js');

import {showScreen} from '../screens.jsx';

var ButtonBackTop = React.createClass({
    render: function(){
        <ButtonBack />
    }
});

var MainPageHeader = React.createClass({
    render: function(){
        return (
        <section className="main-header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row main-logo">
                            <div className="col-lg-5">
                                <div className="quickly-logo">
                                    <QuicklyLogo />
                                </div>
                            </div>
                            <div className="col-lg-6 text">
                                <h1>Квикли</h1>
                                <p>Быстрая доставка еды на дом и бронь стола в любимом заведении.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">

                    </div>
                    <div className="col-lg-3">

                    </div>
                </div>
            </div>
        </section>
        )
    }
});

var SingleCuisine = React.createClass({
    toggleCategory: function(cuisine){
        CompanyListActions.selectByCuisine(this.props.cuisine);
        showScreen('pageCompanyList');
    },
    render: function(){
        return(
        <div onClick={this.toggleCategory} className="cuisine-select-item col-lg-4 col-xs-6 category-item" data-id={this.props.cuisine.cuisine_id}>
            <a href="#">
                <div className="image">
                    <img src={imageBaseUrl+this.props.cuisine.cuisine_image} alt="..." />
                    <div className="overlay"></div>
                </div>
                <div className="food-type">
                    <b>{this.props.cuisine.cuisine_name}</b>
                    <div className="information">
                        <span className="total total-delivery">
                            <span>Доставка:</span>
                            <span className="sum"> {this.props.cuisine.delivery_count}</span>
                        </span>
                        <span className="total total-delivery">
                            <span>Бронь:</span>
                            <span className="sum"> {this.props.cuisine.reservations_count}</span>
                        </span>
                    </div>
                </div>
            </a>
        </div>
        )
    }
});

var CuisinesSelectList = React.createClass({
    mixins: [Reflux.connect(CuisinesStore, 'cuisinesData')],
    limit: 5,
    getInitialState: function() {
      return {
        data: [],
        cuisinesData: []
      };
    },
    componentDidMount: function() {

    },
    render: function() {
        var allCuisines = this.state.cuisinesData;
        var list = allCuisines.map(function(the, key) {
            if (key < 6) return (
                <SingleCuisine cuisine={the} key={key} />
            )
        });
        return (
        <section className="the-tab tab-active main-categories types-grid">
            <div className="container">
                <div className="row" id="cuisinesList">
                    {list}
                </div>
            </div>
        </section>
        )
    }
});

module.exports = CuisinesSelectList;

var ButtonBack = React.createClass({
    render: function(){
        return(
            <div className="button-back">
                <i className="icon-arrow-left"></i>
            </div>
        )
    }
});

ReactDOM.render(<MainPageHeader />, document.getElementById('mainPageHeader'));
ReactDOM.render(<CuisinesSelectList />, document.getElementById('cuisinesSelectList'));
