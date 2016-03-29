var ButtonMore = require('./components/buttonMore.js');
var CuisinesList = require('./cuisinesList.react.jsx');
var CompanyListStore = require('./stores/companyListStore.js');
var CompanyListSidebar = require('./components/companyListSidebar.js');
var QuicklyLogo = require('./components/quicklyLogo.js');
var CuisinesActions = require('./actions/cuisinesActions.js');
var SingleCompany = require('./components/singleCompany.js');
var CompanyListActions = require('./actions/companyListActions.js');

var CompanyListHeader = React.createClass({
    render: function(){
        var overall;
        var cuisine = this.props.cuisine;

        console.log('CompanyListHeader: cuisine = ', cuisine);

        return (
        <section className="main-header company-list-header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row main-logo">
                            <div className="col-lg-5">
{/*                                <div className="cuisine-thumb">
                                    <img src={cuisine.image} alt={this.props.title} />
                                </div>*/}
                            </div>
                            <div className="col-lg-6 text">
                                <h1>{this.props.title}</h1>
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">

                    </div>
                    <div className="col-lg-3">

                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="back-to-home align-left back-left">
                            <button className="button light screen-toggle" data-screen="pageMain" id="buttonPageMain">
                                <i className="icon icon-arrow-left"></i><span> К списку кухонь</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-4">
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

        var cuisine = _.where(this.state.cuisines,{cuisine_id:cuisineId});

        console.log('CompanyList: this.state.cuisines = ', this.state.cuisines);
        console.log('CompanyList: cuisine = ', cuisine);

        return (
        <div className="company-list-wrap">
            <div className="gray">
                <CompanyListHeader cuisine={cuisine} />
            </div>
            <div className="container">
                <div className="row">
                    <div className="no-padding col-lg-9">
                        <div className="company-list" id="companyList">
                            <div>{totalList}
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


ReactDOM.render(<CompanyList />, document.getElementById('pageCompanyList'));
