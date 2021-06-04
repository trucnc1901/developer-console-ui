import { ThemeProvider } from '@material-ui/core';
import AccountCircleRounded from '@material-ui/icons/AccountCircleRounded';
import { createBrowserHistory as createHistory } from 'history';
import React from 'react';
import { Admin, Resource } from 'react-admin';
import theme from './common/theme';
import GlobalStyles from './common/theme/GlobalStyle';
import LoginForm from './components/auth/LoginForm';
import MyLayout from './components/layouts/MyLayout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import authProvider from './providers/authProvider';
import dataProvider from './providers/dataProvider';
import routers from './routers';

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
      >
        <Resource name="users/me" options={{ label: 'Profile' }} list={Profile} icon={AccountCircleRounded} />
      </Admin>
    </ThemeProvider>
  );
};

export default App;
