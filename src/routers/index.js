import React from 'react';
import { RouteWithoutLayout } from 'react-admin';
import { Route } from 'react-router-dom';
import Email from '../components/email/Email';
import EmailActivate from '../components/email/EmailActivate';
import Login from '../components/login/Login';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import Setting from '../pages/Setting';

const customRoutes = [
  <Route path="/dashboard" component={Dashboard} />,
  <Route path="/setting" component={Setting} />,
  <RouteWithoutLayout path="/login/callback" component={Login} />,
  <RouteWithoutLayout path="/email" component={Email} />,
  <RouteWithoutLayout path="/error" component={NotFound} />,
  <RouteWithoutLayout path="/activate" component={EmailActivate} />,
];

export default customRoutes;
