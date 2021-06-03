import * as React from 'react';
import { Route } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import LoginForm from '../components/auth/LoginForm';
import Dashboard from '../pages/Dashboard';

const routers = [
  <Route exact path="/login/callback" component={LoginForm} />,
  <Route exact path="/dashboard" component={Dashboard} />,
  <Route exact path="/auth" component={AuthForm} />,
];

export default routers;
