import NotFound from 'pages/NotFound';
import React from 'react';
import { Authenticated, RouteWithoutLayout } from 'react-admin';
import { Route } from 'react-router-dom';
import Email from 'components/email';
import EmailActivate from 'components/email/EmailActivate';
import Dashboard from 'pages/Dashboard';
import Login from 'components/login';

const customRoutes = [
  <Route
    exact
    path="/dashboard"
    render={() => (
      <Authenticated>
        <Dashboard />
      </Authenticated>
    )}
  />,
  <RouteWithoutLayout exact path="/login/callback" render={() => <Login />} />,
  <RouteWithoutLayout
    exact
    path="/email"
    render={() => (
      <Authenticated>
        <Email />
      </Authenticated>
    )}
  />,
  <RouteWithoutLayout
    exact
    path="/activate"
    render={() => (
      <Authenticated>
        <EmailActivate />
      </Authenticated>
    )}
  />,
  <RouteWithoutLayout
    exact
    path="/notfound"
    render={() => (
      <Authenticated>
        <NotFound />
      </Authenticated>
    )}
  />,
];

export default customRoutes;
