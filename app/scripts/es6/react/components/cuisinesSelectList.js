var CuisinesStore = require('../stores/cuisinesStore.js');
var CompanyListActions = require('../actions/companyListActions.js');

import {showScreen} from '../../screens.jsx';

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