import { hashHistory, Router, Route, IndexRoute, RouteHandler, Link, browserHistory } from 'react-router';
import { renderTransitionContext, withTransition } from 'react-router-transitions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

var TransitionGroup = React.addons.CSSTransitionGroup;

var Routes = React.createClass({
  render: function() {
    return <Router>
        <Route path="/" component={MainLayout}>
          <IndexRoute component={Home} />
          <Route component={SearchLayout}>
            <Route path="users" component={UserList} />
            <Route path="widgets" component={WidgetList} />
          </Route>
        </Route>
      </Router>;
  }
})

module.exports = Routes;
