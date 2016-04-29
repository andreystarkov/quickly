import { browserHistory } from 'react-router';
import LoadingOrderAnimation from 'react-loading-order-with-animation';

var ButtonMore = require('./components/buttonMore.js');
var CuisinesList = require('./cuisinesList.react.jsx');
var CompanyListStore = require('./stores/companyListStore.js');
var CompanyListSidebar = require('./components/companyListSidebar.js');
var QuicklyLogo = require('./components/quicklyLogo.js');
var CuisinesActions = require('./actions/cuisinesActions.js');
var SingleCompany = require('./components/singleCompany.js');
var CompanyListActions = require('./actions/companyListActions.js');
var CuisinesList = require('./companyList.react.jsx');
var Spinner = require('./ui/spinner.js');

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
                        <div className="col-lg-6">
                            <div className="back-to-home align-left back-left">
                                <button className="button light screen-toggle" onClick={this.toList}>
                                    <i className="icon icon-arrow-left"></i><span> К списку</span>
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-6 align-right">

                        </div>
                    </div>
                </div>
            </section>
            )

    }
});

var MobileControls = React.createClass({
    openProfile: function(){
        browserHistory.push(routesMap.routes.profile.path);
    },
    render: function(){
    return(
        <div className="mobile-controls">
            <div className="row">
                <div className="col-xs-12">
                    <button onClick={this.openProfile} className="btn btn-raised">Редактировать профиль</button>
                </div>
            </div>
        </div>
    )
    }
});

var CompanyList = React.createClass({
    mixins: [Reflux.connect(CompanyListStore, 'companyData')],
    limit: 5,
    cuisineId: 0,
    perPage: 8,
    getInitialState: function() {
      return {
        data: [],
        originalData: [],
        companyData: [],
        filteredData: [],
        loadCount: this.perPage,
        isFilters: false,
        searchFilter: '',
        filters: {
            freeDelivery: false,
            hasCampagains: false,
            cardCourier: false,
            cardOnline: false,
            nowOnline: false
        },
        cuisines: getStorage('cuisines')
      };
    },
    componentWillUnmount: function(){
        if(isMobile){
            $('#companyListSidebarWrap').remove();
        }
    },
    componentDidMount: function(){
        $.material.init();

        if(isMobile){
            $('#companyListSidebarWrap').appendTo(document.body);
            $('#menu-list-open').click(function(){
              $('#companyListSidebarWrap').removeClass('mobile');
              $('#companyListSidebarWrap').addClass('active')
            });
            $('#menu-list-open').click( function() {
              $('#companyListSidebarWrap').removeClass('active');
              $('#companyListSidebarWrap').addClass('mobile');
            });
        }

    },
    loadMore: function(){
        var was = this.state.loadCount;
        this.setState({
            loadCount: was+8
        });
    },
    searchChange: function(e){
      //  console.log('Search: ', e.target.value);
        this.setState({
            searchFilter: e.target.value
        });
    },
    onChecked: function(e){
        var filter = e.target.name;
        var filters = this.state.filters;
        var checked = e.target.checked;

        var isFilters = false;
        var data = this.state.companyData;
        var filtered = data;

        filters[filter] = checked;

        console.log('Filters: ', filters);

        $.each(filters, function(the, value){
            if(value) isFilters = true;
        });

        console.log('Filters? ', isFilters);

        if( isFilters ){

            if( filters['freeDelivery'] ){
                filtered = _.filter(filtered, function(single){
                    return single.restaurant_delivery_cost == 0;
                });
                console.log('Filter: freeDelivery: ', filtered);
            }

            if( filters['hasCampagains'] ){
                filtered = _.filter(filtered, function(single){
                    return single.restaurant_has_campaigns == 1;
                });
                console.log('Filter: hasCampagains: ', filtered);
            }

            if( filters['cardCourier'] ){
                filtered = _.filter(filtered, function(single){
                    return single.restaurant_payment_type == 1;
                });
                console.log('Filter: cardCourier: ', filtered);
            }

            if( filters['cardOnline'] ){
                filtered = _.filter(filtered, function(single){
                    return single.restaurant_online_payment == 1;
                });
                console.log('Filter: cardOnline: ', filtered);
            }

            if( filtered.length > 0 ){
                console.log('Summary filtered: ', filtered);
                this.setState({
                    isFilters: isFilters,
                    filters: filters,
                    filtersData: filtered
                });
            } else {
                toastr.info('Нет ресторанов, удволетворяющих вашей фильтрации.');
                filters[filter] = false;
                this.setState({
                    isFilters: false,
                    filters: {
                        freeDelivery: false,
                        hasCampagains: false,
                        cardCourier: false,
                        cardOnline: false,
                        nowOnline: false
                    },
                    filtersData: []
                });
            }

        } else {

            console.log('No filters enabled');

            this.setState({
                isFilters: isFilters,
                filters: filters,
                filtersData: []
            });
        }

    },
    render: function() {

        var that = this;
        var totalList;
        var cuisineId = this.props.current;
        var _this = this;
        var theData = this.state.companyData;
        var filtered = this.state.filtersData;

        if(theData.length > 0){
            console.log('CompanyList: ', theData);
            if( this.state.isFilters ){
                totalList = filtered.map(function(the, i, nc, wait) {
                    if( i < that.state.loadCount){
                        nc = 2;
                        if( that.state.loadCount >= that.perPage && i >= (parseInt(that.state.loadCount)-parseInt(that.perPage)) ){

                            wait = 150*(i-(parseInt(that.state.loadCount)-parseInt(that.perPage))); // omg wtf??

                        } else wait = i*150;

                        return (
                            <LoadingOrderAnimation animation="fade-in" move="from-bottom-to-top"
                               distance={30} speed={400} wait={wait}>
                                <SingleCompany company={the} key={i} />
                            </LoadingOrderAnimation>
                        )
                    }
                });
            } else {
                totalList = this.state.companyData.map(function(the, i, nc, wait) {
                    if(i < that.state.loadCount){
                        nc = 2;
                        if( that.state.loadCount >= that.perPage && i >= (parseInt(that.state.loadCount)-parseInt(that.perPage)) ){
                            wait = 150*(i-(parseInt(that.state.loadCount)-parseInt(that.perPage))); // wtf!!
                        } else wait = i*150;

                        return (
                            <LoadingOrderAnimation animation="fade-in"  key={i} move="from-bottom-to-top"
                               distance={30} speed={400} wait={wait}>
                                <SingleCompany company={the} key={i} />
                            </LoadingOrderAnimation>
                        )
                    }
                });
            }
        } else {
            totalList = <Spinner />;
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

                                <ButtonMore onClick={this.loadMore} />

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 mobile sidebar sidebar-wrapper" id="companyListSidebarWrap">
                        <div className="button-close" id="menu-list-close"><i className="icn-cancel"></i></div>
                        <div className="button-open" id="menu-list-open"><i className="icn-menu"></i></div>
                        <div className="side-wrap">
                            <div id="companyListSidebar" className="company-list-sidebar">
                                <div className="sidebar-wrap">
                                    {/*<MobileControls />*/}
                                    <div className="form-group label-floating">
                                      <label className="control-label" htmlFor="company-search">Поиск по названию ресторана</label>
                                      <input value={this.state.searchFilter} onChange={this.searchChange} className="form-control" id="company-search" type="text" />
                                      <p className="help-block"></p>
                                    </div>
                                    <div className="checkbox control-item">
                                      <label>
                                        <input checked={this.state.filters.freeDelivery}
                                            onChange={this.onChecked} type="checkbox" name="freeDelivery" />
                                            <span className="filter-name">Бесплатная доставка</span>
                                      </label>
                                    </div>
                                    <div className="checkbox control-item">
                                        <label>
                                            <input type="checkbox" checked={this.state.filters.hasCampagains}
                                            onChange={this.onChecked} name="hasCampagains" />
                                            <span className="filter-name">Есть акции</span>
                                        </label>
                                    </div>
                                    <div className="checkbox control-item">
                                        <label>
                                            <input type="checkbox" checked={this.state.filters.cardCourier}
                                            onChange={this.onChecked} name="cardCourier" />
                                            <span className="filter-name">Оплата картой курьеру</span>
                                        </label>
                                    </div>
                                    <div className="checkbox control-item">
                                        <label>
                                            <input type="checkbox" checked={this.state.filters.cardOnline}
                                            onChange={this.onChecked} name="cardOnline" />
                                            <span className="filter-name">Онлайн оплата</span>
                                        </label>
                                    </div>
                                    <div className="checkbox control-item">
                                        <label>
                                            <input type="checkbox" checked={this.state.filters.nowOnline}
                                            onChange={this.onChecked} name="nowOnline" />
                                            <span className="filter-name">Работает сейчас</span>
                                        </label>
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
