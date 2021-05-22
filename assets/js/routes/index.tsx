import React, { lazy, Suspense, FunctionComponent } from 'react';
import map from 'lodash/map';
import { Switch, Redirect } from 'react-router-dom';
import siteLayout from '../layouts/Site';
import dashboardLayout from '../layouts/Dashboard';
import Login from '../pages/Auth/Login';
import Logout from '../pages/Auth/Logout';
import ProtectedRoute from '../components/ProtectedRoute';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Drivers = lazy(() => import('../pages/Driver'));
const Passengers = lazy(() => import('../pages/Passenger'));

export const RoutesHOC = (routes: any, defaultPath: any) => {
  const Routes: FunctionComponent<any> = (props: any) => (
    <Suspense fallback={<></>}>
      <Switch>
        {map(routes, (route) => {
          return (
            <ProtectedRoute
              key={route.name}
              path={route.path}
              component={route.component}
              isProtected={route.isProtected || false}
            />
          );
        })}
        <Redirect to={defaultPath} />
      </Switch>
    </Suspense>
  );
  return Routes;
};

export const DashboardRoutes = {
  DRIVER: {
    path: '/drivers',
    name: 'Drivers',
    component: Drivers,
    isProtected: true,
    showInMenu: 'Drivers'
  },
  PASSENGER: {
    path: '/passengers',
    name: 'Passengers',
    component: Passengers,
    isProtected: true,
    showInMenu: 'Passengers'
  },
  MAIN: {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    isProtected: true
  },
};

export const AppRoutes = {
  LOGIN: {
    path: '/login',
    name: 'Login',
    component: siteLayout(Login)
  },
  LOGOUT: {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    isProtected: true
  },
  DASHBOARD: {
    path: '/',
    name: 'Dashboard',
    isProtected: true,
    component: dashboardLayout(RoutesHOC(DashboardRoutes, '/'))
  }
};

export const AppRouter = RoutesHOC(AppRoutes, '/login');
