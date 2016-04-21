var ButtonMore = require('./components/buttonMore.js');
var CuisinesList = require('./cuisinesList.react.jsx');
var CompanyListStore = require('./stores/companyListStore.js');
var CompanyListSidebar = require('./components/companyListSidebar.js');
var QuicklyLogo = require('./components/quicklyLogo.js');
var CuisinesActions = require('./actions/cuisinesActions.js');
var SingleCompany = require('./components/singleCompany.js');
var CompanyListActions = require('./actions/companyListActions.js');
var CuisinesList = require('./companyList.react.jsx');
var Loader = require('halogen/PulseLoader');

import { browserHistory } from 'react-router';
var routesMap = require('./routes/map.js');

var CompanyListHeader = React.createClass({
    toList: function(){
        browserHistory.push(routesMap.routes.main.path);
    },
    render: function(){
        var cuisine = this.props.cuisine;
            return (
            <section className="company-list-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="row main-logo">
                                <div className="col-lg-6">
                                    <div className="cuisine-thumb">
                                        <img src={imageBaseUrl+cuisine.cuisine_image} alt={cuisine.cuisine_name} />
                                    </div>
                                </div>
                                <div className="col-lg-6 text">
                                    <h1>{cuisine.cuisine_name}</h1>
                                    <p>Выберите ресторан из списка</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row bottom-line">
                        <div className="col-lg-8">
                            <div className="back-to-home align-left back-left">
                                <button className="button light screen-toggle" onClick={this.toList}>
                                    <i className="icon icon-arrow-left"></i><span> К списку</span>
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-4 align-right">

                        </div>
                    </div>
                </div>
            </section>
            )

    }
});

var CompanyList = React.createClass({
    mixins: [Reflux.connect(CompanyListStore, 'companyData')],
    limit: 5,
    cuisineId: 0,
    getInitialState: function() {
      return {
        data: [],
        originalData: [],
        companyData: [],
        filters: {
            freeDelivery: false,
            hasCampagains: false,
            cardCourier: false,
            cardOnline: false,
            nowAvaible: false
        },
        cuisines: getStorage('cuisines')
      };
    },
    componentDidMount: function() {
        $.material.init();
    },
    freeDelivery: function(e){
        var what = [], that = {};

        what[e.target.name] = e.target.checked;
        console.log('what['+e.target.name+']', what);
        that.push(what);
        console.log('that', that);

        this.setState({
            filters: {
                freeDelivery: e.target.checked
            }
        });
    },
    filterData: function(e){
        var filter = e.target.name;
        var checked = e.target.checked;
        var data = this.state.companyData;
        var filtered;
        console.log('Filter: Original data: ', data);

        if ( filter == 'free-delivery' ){
            if(checked){
                filtered = _.filter(data, function(single){
                    return single.restaurant_delivery_cost == 0;
                });
                console.log('Filter: Free Delivery. Filtered: ', filtered);
                this.setState({
                    originalData: data,
                    companyData: filtered
                });
            } else {
                this.setState({
                    companyData: this.state.originalData
                });
            }
        }

        console.log('filterData', e.target.name);
    },
    render: function() {

        var totalList;
        var cuisineId = this.props.current;
        var _this = this;
        var theData = this.state.companyData;

        if(theData.length > 0){
            totalList = this.state.companyData.map(function(the, i) {
                return <SingleCompany company={the} key={i} />
            });
        } else {
            totalList = <Loader size="25px" margin="20px"/>;
        }

        var overall, single, cuisines = this.state.cuisines, cuisine;

        if (this.props.current > 0) {
            single = _.find(this.state.cuisines, function(item) {
                return item.cuisine_id == cuisineId;
            });
            cuisine = <CompanyListHeader cuisine={single} />;
        }

        return (
        <div className="company-list-wrap">
            <div className="gray header-gray">
                {cuisine}
            </div>
            <div className="container">
                <div className="row">
                    <div className="no-padding col-lg-9">
                        <div className="company-list" id="companyList">
                            <div>
                                <div className="row">
                                    {totalList}
                                </div>
                                <div className="full-width align-center">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 mobile sidebar" id="companyListSidebarWrap">
                        <div className="button-close" id="menu-close"><i className="icn-cancel"></i></div>
                        <div className="button-open" id="menu-open"><i className="icn-menu"></i></div>
                        <div className="sidebar-wrap">
                            <div id="companyListSidebar" className="company-list-sidebar">
                                <div className="sidebar-wrap company-list-sidebar">
                                    <div className="checkbox control-item">
                                      <label><input checked={this.state.freeDelivery} onChange={this.filterData} type="checkbox" name="free-delivery" />
                                        <span className="filter-name">Бесплатная доставка</span>
                                      </label>
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
                                      <label><input type="checkbox" name="somename" /> <span className="filter-name">Работает сейчас</span></label>
                                    </div>
                                    <div className="checkbox control-item">
                                      <label><input type="checkbox" name="somename" /> <span className="filter-name">Рядом со мной</span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
});

module.exports = CompanyList;
