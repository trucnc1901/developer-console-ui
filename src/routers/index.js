import React from 'react';
import { RouteWithoutLayout } from 'react-admin';
import { Route } from 'react-router-dom';
import Email from '../components/email/Email';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import Setting from '../pages/Setting';
import EmailCompleted from '../pages/EmailCompleted';
import Login from '../components/login/Login';
import EmailActive from '../components/email/EmailActive';

const customRoutes = [
  <Route path="/dashboard" component={Dashboard} />,
  <Route path="/setting" component={Setting} />,
  <RouteWithoutLayout path="/login/callback" component={Login} />,
  <RouteWithoutLayout path="/email" component={Email} />,
  <RouteWithoutLayout path="/404" component={NotFound} />,
  <RouteWithoutLayout path="/confirm" component={EmailCompleted} />,
  <RouteWithoutLayout path="/active" component={EmailActive} />,
];

export default customRoutes;
