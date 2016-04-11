/*
* @Author: Andrey Starkov
* @Date:   2016-04-11 15:38:51
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-11 17:30:30
*/


import {hashHistory, Router, Route, IndexRoute, RouteHandler, Link, browserHistory} from 'react-router';

var PageHeader = require('../components/pageHeader.js');
var ScreenShop = require('../screens/screenShop.js');
var ScreenProfile = require('../screens/screenProfile.js');
var ScreenCompanyList = require('../screens/screenCompanyList.js');
var ScreenMain = require('../screens/screenMain.js');
var BottomPanel = require('../components/bottomPanel.js');
var NotFoundPage = require('../components/notFoundPage.js');

var routesMap = require('./map.js');

var Routes = React.createClass({
  refreshHome: function(e){
    console.log('Refreshing Home! ', e);
  },
  render: function() {
    var routes = routesMap.routes;
    return (
      <div>
          <PageHeader />
          <Router history={browserHistory}>
            <Route path={routes.main.path} name={routes.main.name} handle={this.refreshHome} component={ScreenMain} >
                <Route name={routes.main.name} path={routes.home.path} component={ScreenMain} />
            </Route>
            <Route name={routes.list.name} path={routes.list.path} handle={this.refreshHome} component={ScreenCompanyList} />
            <Route name={routes.profile.name} path={routes.profile.path} handle={this.refreshHome} component={ScreenProfile} />
            <Route name={routes.shop.name} path={routes.shop.path} handle={this.refreshHome} component={ScreenShop} />
          </Router>
      </div>
      );
  }
});

module.exports = Routes;
