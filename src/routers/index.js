import React from 'react';
import { RouteWithoutLayout } from 'react-admin';
import { Route } from 'react-router-dom';
import Email from '../components/email/Email';
import EmailActive from '../components/email/EmailActive';
import Login from '../components/login/Login';
import Confirm from '../pages/Confirm';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import Setting from '../pages/Setting';

const customRoutes = [
  <Route path="/dashboard" component={Dashboard} />,
  <Route path="/setting" component={Setting} />,
  <RouteWithoutLayout path="/login/callback" component={Login} />,
  <RouteWithoutLayout path="/email" component={Email} />,
  <RouteWithoutLayout path="/error" component={NotFound} />,
  <RouteWithoutLayout path="/confirm" component={Confirm} />,
  <RouteWithoutLayout path="/active" component={EmailActive} />,
];

export default customRoutes;
