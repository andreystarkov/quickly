/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 23:23:02
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-23 05:01:58
*/
import LoadingOrderAnimation from 'react-loading-order-with-animation';

var CompanyList = require('../companyList.react.jsx');
var CompanyListActions = require('../actions/companyListActions.js');

var ScreenCompanyList = React.createClass({
    getInitialState: function() {
        return {
           active: false
        };
    },
    componentWillMount: function(){
        CompanyListActions.selectById(this.props.params.cuisine);
    },
    render: function(){
        console.log('Path: ', this.props.location.pathname);
        return(
            <LoadingOrderAnimation animation="fade-in"
            distance={30} speed={300} wait={0}>
            <section className="the-screen page-wrapper food-grid" id="pageCompanyList">
                <CompanyList current={this.props.params.cuisine} />
            </section>
            </LoadingOrderAnimation>

        )
    }
});

module.exports = ScreenCompanyList;
