import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  <Route
    {...rest}
    render={props => 
     	authed==="true"
        ? (<Component {...props} />)
        : (<Redirect to={{pathname:"/", state: {from:props.location}}} />
    )}
  />
);

export default withRouter(PrivateRoute);