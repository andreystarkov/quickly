/*
* @Author: Andrey Starkov
* @Date:   2016-04-14 23:09:58
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-14 23:16:23
*/

var RRouter = require('rrouter');
var Routes = RRouter.Routes;
var Route = RRouter.Route;

var PageHeader = require('../components/pageHeader.js');
var ScreenShop = require('../screens/screenShop.js');
var ScreenProfile = require('../screens/screenProfile.js');
var ScreenCompanyList = require('../screens/screenCompanyList.js');
var ScreenMain = require('../screens/screenMain.js');
var BottomPanel = require('../components/bottomPanel.js');
var NotFoundPage = require('../components/notFoundPage.js');

var routesMap = require('./map.js');

var routes = (
  <Routes>
    <Route path={routes.main.path} name={routes.main.name} view={ScreenMain} >
        <Route name={routes.main.name} path={routes.home.path} />
    </Route>
    <Route name={routes.list.name} path={routes.list.path} view={ScreenCompanyList} />
    <Route name={routes.profile.name} path={routes.profile.path} view={ScreenProfile} />
    <Route name={routes.shop.name} path={routes.shop.path} view={ScreenShop} />
  </Routes>
)

RRouter.start(routes, function(view) {
  React.renderComponent(view, document.getElementById('App'))
})

module.exports = Routes;
