import { Link } from 'react-router';
import { RouteTransition } from 'react-router-transition';

const AniRouter = (props) => (
  <div>
    <RouteTransition
      component={false}
      className="transition-wrapper"
      pathname={props.location.pathname}
      {...props.preset}>
      {props.children}
    </RouteTransition>
  </div>
);

export default AniRouter;
