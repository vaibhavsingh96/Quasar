import React from 'react';
import {Route, Redirect} from 'react-router-dom';

var ProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render = {props => {
        if(localStorage.getItem("authorization")) {
          return <Component {...props} />
        } else {
          return <Redirect to= {
            {
              pathname: '/join/signin',
              state: {
                from: props.location
              }
            }
          }/>
        }
      }}
    />
  );
};

export default ProtectedRoute;
