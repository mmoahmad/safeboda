import React, { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';
import { Redirect, useLocation } from 'react-router-dom';
import { isLoggedIn } from '../../utils/user';

interface IProtectedRoute {
  path: string;
  component: any;
  isProtected: boolean;
}

const ProtectedRoute: FunctionComponent<IProtectedRoute> = ({ path, component, isProtected }) => {
  if (isProtected) {
    if (!isLoggedIn()) {
      return <Route path={path} component={component} />;
    } else {
      return <Redirect to={{ pathname: '/login' }} />;
    }
  } else {
    if (!isLoggedIn()) {
      return <Redirect to={{ pathname: '/' }} />;
    } else {
      return <Route path={path} component={component} />;
    }
  }
};

export default ProtectedRoute;
