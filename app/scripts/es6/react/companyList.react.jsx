var ButtonMore = require('./components/buttonMore.js');
var CuisinesList = require('./cuisinesList.react.jsx');
var CompanyListStore = require('./stores/companyListStore.js');
var CompanyListSidebar = require('./components/companyListSidebar.js');
var QuicklyLogo = require('./components/quicklyLogo.js');
var CuisinesActions = require('./actions/cuisinesActions.js');
var SingleCompany = require('./components/singleCompany.js');
var CompanyListActions = require('./actions/companyListActions.js');
var CuisinesList = require('./companyList.react.jsx');

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
        companyData: [],
        cuisines: []
      };
    },
    componentDidMount: function() {;
        this.state.cuisines = getStorage('cuisines');
    },
    loadMore: function(){
        this.limit += 5;
        CompanyStore.updateData();
    },
    render: function() {
        var cuisineId = CompanyListStore.getCurrentCuisine();

        var theData = this.state.companyData;
        console.log('CompanyList: companyData = ', this.state.companyData);
        var totalList = this.state.companyData.map(function(the, i) {
            return <SingleCompany company={the} key={i} />
        });

        console.log('CompanyList: this.state.cuisines = ', this.state.cuisines);

        var overall, single, cuisines, cuisine;

        console.log('CompanyListHeader: cuisineId = ', cuisineId);
        if (cuisineId > 0) {
            cuisines = getStorage('cuisines');
            single = _.where(cuisines,{cuisine_id:cuisineId});

            single.forEach(function (val, index) {
                cuisine = <CompanyListHeader cuisine={val} />;
            });
        }
        console.log('CompanyListHeader: cuisine = ', cuisine);

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
                                    <ButtonMore onClick={this.loadMore} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 mobile sidebar" id="companyListSidebarWrap">
                        <div className="button-close" id="menu-close"><i className="icn-cancel"></i></div>
                        <div className="button-open" id="menu-open"><i className="icn-menu"></i></div>
                        <div className="sidebar-wrap">
                            <div id="companyListSidebar" className="company-list-sidebar">
                                <CompanyListSidebar />
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
