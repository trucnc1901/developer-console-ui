import { ThemeProvider } from '@material-ui/core';
import { createBrowserHistory as createHistory } from 'history';
import React from 'react';
import { Admin, Resource } from 'react-admin';
import theme from './common/theme';
import GlobalStyles from './common/theme/GlobalStyle';
import AuthForm from './components/auth/AuthForm';
import LoginForm from './components/auth/LoginForm';
import MyLayout from './components/layouts/MyLayout';
import Dashboard from './pages/Dashboard';
import authProvider from './providers/authProvider';
import dataProvider from './providers/dataProvider';
import routers from './routers';
import users from './components/users';

const App = () => {
  const history = createHistory();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        customRoutes={routers}
        history={history}
        layout={MyLayout}
        loginPage={LoginForm}
        dashboard={Dashboard}
        ready={AuthForm}
      >
        <Resource name="users" {...users} />
      </Admin>
    </ThemeProvider>
  );
};

export default App;
